if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const MONGO_URI = process.env.MONGO_URI;

// Debug Environment Variables
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("API_KEY:", process.env.CLOUD_API_KEY ? "LOADED" : "NOT LOADED");
console.log("API_SECRET:", process.env.CLOUD_API_SECRET ? "LOADED" : "NOT LOADED");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");
const UserRouter = require("./routes/user.js");

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// General Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// MongoDB Session Store Configuration
const store = MongoStore.create({
    mongoUrl: MONGO_URI,
    crypto: {
        secret: "process.env.travelwithme",
    },
    touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// Express Session Configuration
const sessionOptions = {
    store: store,
    secret: "process.env.travelwithme",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
app.use(session(sessionOptions));

// Flash Messages
app.use(flash());

// Passport Authentication Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// Global Context Middleware (Flash & User data)
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// API & Application Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", UserRouter);

// Resource Not Found (404) Handler
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (res.headersSent) {
        return next(err);
    }
    res.status(statusCode).render("error.ejs", { err });
});

// Database Connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected!");
    })
    .catch((err) => {
        console.log("MongoDB Connection Failed:");
        console.log(err);
    });
    app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Start Server
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
