require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		name: "session",
		secret: "keyboard cat",
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 2592000 },
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
);

// db sql
/**
 *const db = require("./db/db");
 *const sql = require("./db/query");
 */
// db mongodb
const db = require("./db/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const booksRouter = require("./routes/booksAPI");
const booksWebRouter = require("./routes/booksWeb");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/books", booksRouter);
app.use("/books", booksWebRouter);

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

// db sql connaction
// db.run(sql.sql_create, (err) => err && console.error(err.message));

// db monogdb connaction
const coonnect = async () => {
	try {
		await db(process.env.MONGO_URI);
		console.log("fffffff");
	} catch (error) {
		console.log(error);
	}
};

coonnect();
module.exports = app;
