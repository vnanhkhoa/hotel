var express = require('express');

var apiControler = require("../controllers/api.controler");

var router = express.Router();

router.post("/login", apiControler.login)
router.get("/room", apiControler.room)
router.post("/create", apiControler.creatUser)


module.exports = router;