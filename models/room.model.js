var db = require('mongoose');

var Room = db.model('room', {
	tenphong: String, 
	id_category: String
});

module.exports = Room;