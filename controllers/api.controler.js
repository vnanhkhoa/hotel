var Category = require("../models/category.model.js");
var User = require("../models/user.model.js");
var Room = require('../models/room.model.js')

module.exports = {
    login: (req, res) => {
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({
            username: username,
            password: password
        }, (err, user) => {
            if (err) {
                res.send({
                    error: err
                });
                return
            } else {
                if (user == null) {
                    res.send({
                        error: "Account Don't Exit"
                    })
                } else {
                    res.json(user)
                }
            }
        });
    },

    room: (req, res) => {
        Category.find({}, (err, category) => {
            if (err) {
                res.send({
                    error: err
                });
                return
            } else {
                res.json(category)
            }
        });
    },

    creatUser: async(req, res) => {
		var user = {
			fullname: req.body.fullname,
			username: req.body.username,
			password: req.body.password,
		}

		var checkuser = await User.findOne({username:user.username});
		if (checkuser == null) {
			var us = await new User(user).save()
			res.json(us);
		} else {
			res.send({error: "Username Exit"})
		}
	}

    
}