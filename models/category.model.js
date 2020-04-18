var db = require('mongoose');

var Category = db.model('category', {
	tendm: String, 
	hinhanh: String, 
	gia: String,
	noidung:String,
	ndbeg:String,
	room:Array
});

module.exports = Category;