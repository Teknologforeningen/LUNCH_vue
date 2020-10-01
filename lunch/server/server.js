// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate } = require('ldap-authentication');
//const ldap = require('ldapjs');
const ldap = require('ldapjs-client');
const assert = require('assert');
var Promise = require('promise');

// Models
const User = require('../models/User');

// Get configuration from file
const config = require('./config');
console.log("Read config from file:");
console.log(config);

mongoose.connect('mongodb://localhost/lunch');

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ldapConfig = {
	ldapOpts: { 
		url: config.ldap.url, 
		tlsOptions: { rejectUnauthorized: false },
		//Milliseconds client should let operations live for before timing out
		timeout: 5000,
		//Milliseconds client should wait before timing out on TCP connections
		connectTimeout: 5000
	},
	adminDn: config.ldap.adminDn, 
	adminPassword: config.ldap.adminPassword, 
	userSearchBase: `${config.ldap.userOU},${config.ldap.baseDn}`,
	baseDn: config.ldap.baseDn,
	adminGroups: config.ldap.adminGroups,
	groupSearchBase: `${config.ldap.groupOU},${config.ldap.baseDn}`,
	userSearchBase: `${config.ldap.userOU},${config.ldap.baseDn}`
};

async function ldapAuth(username, password) {
	console.log(ldapConfig);
	console.log(`Trying to authenticate LDAP user '${username}'.`);

	try {
		let authenticated_user = await authenticate({
			ldapOpts: {
				url: config.ldap.url,
				tlsOptions: { rejectUnauthorized: false }
			},
			userPassword: password,
			userSearchBase: ldapConfig.userSearchBase,
			usernameAttribute: 'uid',
			userDn: `uid=${username}${ldapConfig.userSearchBase}`
		});
		console.log(`User '${authenticated_user.cn}' authenticated successfully!`);
		return authenticated_user;
	} catch (e) {
		console.log(e);
		return e;
	}
}

async function isMemberOf(groups, user) {
	//Creates a new LDAP client
	var client = new ldap(ldapConfig.ldapOpts);
	try {
		//Binds to the LDAP server (i.e. "logs in") using bind DN and password
		await client.bind(ldapConfig.adminDn, ldapConfig.adminPassword);
	} catch (e) {
		console.log(e);
		return e;
	}
	//Creates the string '(|(cn=group1)(cn=group2)(cn=group3))'.
	//This string is used as a filter to get the members of all
	//groups (cn=group1 OR cn=group2 OR cn=group3).
	const groupFilter = `(|(cn=${groups.join(')(cn=')}))`;
	const searchOpts = {
		filter: groupFilter,
		scope: 'sub',
		//Only return memberUids, we are not interested in other data.
		attributes: ['memberUid']
	};

	//Default value.
	var isInAllowedGroup = false;
	try {
		//Searches the LDAP for groups using the searchOpts defined above.
		const groupEntries = await client.search(ldapConfig.groupsSearchBase, searchOpts);
		
		//Loop through the found groups.
		groupEntries.forEach(function (item, index) {
			//Checks if the users uid is in the group.
			if(item.memberUid.includes(user)) {
				isInAllowedGroup = true;
				console.log(`User '${user}' is a member of '${item.dn}'`);
			}
			else {
				console.log(`User '${user}' is NOT a member of '${item.dn}'`);
			}
		});
	} catch(e) {
		console.log(e);
	}
	console.log(`User '${user}' is in one of the allowed groups: ${isInAllowedGroup}`)
	return isInAllowedGroup;
}

app.post('/login', async (req, res) => {

	let authenticated_user = await ldapAuth(req.body.username, req.body.password);
	let isMemberOfGroup = await isMemberOf(ldapConfig.adminGroups, req.body.username);
	
	//Check if LDAP auth has returned an error.
	if(authenticated_user instanceof Error) {
		console.log("LDAP auth error: ".concat(authenticated_user.message));
		
		//TODO: Make returning errors do something.
		return res.status(401).json({
			title: 'authentication failed',
			error: authenticated_user.message
		});
	//Check if group lookup has returned an error.
	} else if(isMemberOfGroup instanceof Error) {
		return res.status(401).json({
			title: 'group lookup failed',
			error: isMemberOfGroup.message
		});
	//Check if user is member of at least one group listed in the config.
	} else if(isMemberOfGroup == true) {
		let token = jwt.sign({ userId: authenticated_user._id }, 'secretkey');
		return res.status(200).json({
			title: 'login success',
			token: token
		});
	//If user is not member of any of the groups, return error.
	} else {
		return res.status(401).json({
			title: 'authentication failed',
			error: 'user not in correct group' 
		});
	}
});

const posts = require('./routes/api/posts');
const hours = require('./routes/api/hours');
const prices = require('./routes/api/prices');
const messages = require('./routes/api/messages');
const menu = require('./routes/api/menu');

app.use('/api/posts', posts);
app.use('/api/hours', hours);
app.use('/api/prices', prices);
app.use('/api/messages', messages);
app.use('/api/menu', menu);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server running on port ' +  port);
});
