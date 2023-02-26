require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		name: "session",
		secret: "secret",
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 2592000 },
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
);

app.use(flash());
// Global variables
app.use(function (req, res, next) {
	res.locals.info = req.flash("info");
	res.locals.type = req.flash("type");
	res.locals.isLogged = false;
	res.locals.title = "listing | default title";
	if (req.session.user) {
		res.locals.isLogged = true;
		res.locals.user_id = req.session.user._id;
		res.locals.username = req.session.user.username;
		res.locals.email = req.session.user.email;
	}
	next();
});

// db mongodb
const db = require("./db/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const listingRouter = require("./routes/listings");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

console.log(__dirname);
// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// bootstrap
app.use(
	"/css",
	express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
	"/js",
	express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/listings", listingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// db monogdb connaction
const coonnect = async () => {
	try {
		await db(process.env.MONGO_URI);
		console.log(`-------------------------------`);
		console.log(`--app--`);
		console.log("monogdb connaction established...");
		console.log(`-------------------------------`);
	} catch (error) {
		console.log(error);
	}
};

coonnect();
module.exports = app;
