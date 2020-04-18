var db = require('mongoose');
var Booking = db.model('books', {
	fullname: String, 
	gender: String, 
	email: String,
	idcard: String,
	country: String,
	datein: Date,
	dateout: Date,
	room: String,
	id_category: String,
});

module.exports = Booking;