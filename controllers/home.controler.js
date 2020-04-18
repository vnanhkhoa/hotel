var Category = require("../models/category.model.js");
var User = require("../models/user.model.js");
var Room = require('../models/room.model.js')

module.exports = {
	index: async(req, res) => {
		var categories = await Category.find();
		var sess = req.session;
		res.render("page/home", {
			title: "Home",
			categories: categories,
			user: res.locals.user,
			success: req.session.success
		})
	},

	login: async(req, res) => {
		var username = req.body.username;
		var password = req.body.password;

		var user = await User.findOne({
			username: username,
			password: password
		});

		res.cookie('user_id', user.id, {
			signed: true
		});
		res.redirect(req.route.path);
	},

	logout: (req, res) => {
		res.clearCookie('user_id');
		res.redirect("/")
	},

	checkss: async(req, res, next) => {
		if (req.signedCookies.user_id) {
			var user = await User.findOne({
				_id: req.signedCookies.user_id
			});
			res.locals.user = user.fullname;
		}
		next()
	},

	roomAll: (req, res) => {
		Category.find()
			.then((categories) => {
				res.render("page/roomAll", {
					title: "Room",
					categories: categories,
					user: res.locals.user
				})
			})
			.catch(err => res.send(err));


	},

	room_id: (req, res) => {
		var id = req.params.id;
		Category.findOne({
				_id: id
			})
			.then((categories) => {
				res.render("page/viewRoom", {
					title: "Room",
					categories: categories,
					user: res.locals.user
				})
			})
			.catch(err => res.send(err));


	},

	bookingView: (req, res) => {
		var id = req.params.id;

		res.render("page/booking", {
			title: "Booking",
			id: id,
			user: res.locals.user
		})
	},

	creatUser: async(req, res) => {
		var user = {
			fullname: req.body.fullname,
			username: req.body.username,
			password: req.body.password,
		}

		var checkuser = await User.findOne({username:user.username});
		console.log(checkuser);
		if (checkuser == null) {
			var us = await new User(user).save()
			res.cookie('user_id', us.id, {
				signed: true
			});
			res.redirect("/");
		} else {
			res.redirect("/");
		}



	}


};