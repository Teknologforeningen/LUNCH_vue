// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate } = require('ldap-authentication')
const ldap = require('ldapjs');
const assert = require('assert');

// Models
const User = require('../models/User');

// Get configuration from file
const config = require('./config');
console.log("Read config from file:")
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

const ldapConfig = {
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
	usernameAttribute: 'uid',
	baseDn: config.ldap.baseDn,
	adminGroups: config.ldap.adminGroups,
	groupsSearchBase: config.ldap.groupOU.concat(',', config.ldap.baseDn),
}

async function ldapAuth(username, password) {

	const ldapConfig = {
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
		userDn: 'uid='.concat(username, config.ldap.userOU, ',', config.ldap.baseDn),
		userPassword: password,
		userSearchBase: config.ldap.userOU.concat(',', config.ldap.baseDn),
		usernameAttribute: 'uid',
		username: username,
		groupsSearchBase: config.ldap.groupOU.concat(',', config.ldap.baseDn),
		adminGroups: config.ldap.adminGroups,
		groupClass: 'posixGroup',
		baseDn: config.ldap.baseDn
	}
	console.log("Trying to authenticate LDAP user '".concat(username, "'"));

	try {
		//TODO: Issues with async, this function is not synced so user logs in
		//before groups are checked.
		var allowed = await getLdapGroups(ldapConfig.adminGroups, username);
		authenticated_user = await authenticate(ldapConfig);

		console.log(`User '${authenticated_user.cn}' authenticated successfully!`);
		console.log("Checking user group membership.")


		if(allowed) {
			console.log("User is in allowed group.");
			return authenticated_user;
		} else {
			console.log("User not in allowed group!");
			return "ERROR";
		}

	} catch (e) {
		console.log(e);
		return e;
	}
}

async function getLdapGroups(groups, user) {
	return new Promise(function(resolve, reject) {
		var client = ldap.createClient(ldapConfig.ldapOpts);

		client.bind(ldapConfig.adminDn, ldapConfig.adminPassword, function(err) {
			assert.ifError(err);
		});
		//Creates the string '(|(cn=group1)(cn=group2)(cn=group3))'.
		//This string is used as a filter to get the members of all
		//groups given.
		var groupFilter = `(|(cn=${groups.join(')(cn=')}))`
		var searchOpts = {
			filter: groupFilter,
			scope: 'sub',
			attributes: ['memberUid']
		};

		var isInAllowedGroup = false;
		try {
			client.search(`${ldapConfig.groupsSearchBase}`, searchOpts, function(err, res) {
				assert.ifError(err);

				res.on('searchEntry', function(entry) {
					if(entry.object.memberUid.includes(user)) {
						isInAllowedGroup = true;
						console.log(`${user} found in group ${entry.object.dn}`);
					} else {
						console.log(`${user} not found in group ${entry.object.dn}`);
					}
				});
				res.on('searchReference', function(referral) {
					console.log('referral: ' + referral.uris.join());
				});
				res.on('error', function(err) {
					console.error('error: ' + err.message);
				});
				res.on('end', function(result) {
					console.log('status: ' + result.status);
					console.log('Unbinding from LDAP server.')
					client.unbind(function(err) {
						assert.ifError(err);
					});
				});	
			});
		} catch(e) {
			console.log(e);
			return e;
		}
		resolve(isInAllowedGroup);
	})
}

app.post('/login', async (req, res) => {

	let authenticated_user = await ldapAuth(req.body.username, req.body.password);

	//TODO: Fix async issue
	if(authenticated_user == "ERROR") {
		console.log("?????")
	} else if(authenticated_user instanceof Error) {
		console.log("LDAP auth error: ".concat(authenticated_user.message));
		
		//TODO: Make this actually do something
		return res.status(401).json({
			title: 'authentication failed',
			error: authenticated_user.message
		});
	} else {
		let token = jwt.sign({ userId: authenticated_user._id }, 'secretkey');
		return res.status(200).json({
			title: 'login success',
			token: token
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
