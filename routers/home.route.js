var express = require('express');

var hControle = require("../controllers/home.controler");

var router = express.Router();

router.get("/", hControle.index)
router.post("/", hControle.login)

router.get("/logout", hControle.logout)
router.get("/rooms" , hControle.roomAll)
router.get("/rooms/:id" , hControle.room_id)
router.get("/book/:id" , hControle.bookingView)
router.post("/create", hControle.creatUser)


module.exports = router;