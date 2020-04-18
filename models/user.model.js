var db = require('mongoose');
var User = db.model('user', {
	fullname: String, 
	username: String, 
	password: String 
});

module.exports = User;