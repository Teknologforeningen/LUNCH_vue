var config = {};

config.ldap = {};

config.ldap.url = 'ldaps://asdf.asdf';
config.ldap.adminDn = 'cn=user,dc=test,dc=fi'
config.ldap.adminPassword = 'hunter2';
config.ldap.baseDn = 'dc=test,dc=fi';
config.ldap.userOU = 'ou=People'
config.ldap.groupOU = 'ou=Group'
config.ldap.adminGroups = ['group1', 'group2']

module.exports = config;
