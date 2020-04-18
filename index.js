const express = require('express')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var HomeRouter = require('./routers/home.route')
var ApiRouter = require('./routers/api.router')
var hControle = require("./controllers/home.controler");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
var http = require('http').createServer(app);
var io = require('./socket.io/socket.io.js')(http);

app.use(cookieParser("anhkhoa"))

var port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(hControle.checkss)

app.use(morgan("dev"))
app.use("/assets", express.static(__dirname + "/public"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use("/home", HomeRouter);
app.use("/api", ApiRouter);

app.use(bodyParser.json())

app.use(session({
	secret: 'mySecretKey',
}));


http.listen(port, () => console.log(`App listening at http://localhost:${port}`));



mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("Connect DB Success"))
	.catch((err) => console.error(err));

app.get("/", hControle.index);
