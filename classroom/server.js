const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));

// Connect-flash middleware
app.use(flash());

// Make flash messages available to all EJS files
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

// Register route
app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;

    // Store name in session
    req.session.name = name;

    if (name === "anonymous") {
        req.flash("error", "User not registered");
    } else {
        req.flash("success", "User registered successfully!");
    }

    // Redirect to hello page
    res.redirect("/hello");
});

// Hello route
app.get("/hello", (req, res) => {
    res.render("page.ejs", {
        name: req.session.name
    });
});

// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am root!");
});

// Users routes
app.get("/users", (req, res) => {
    res.send("GET for users");
});

app.get("/users/:id", (req, res) => {
    res.send("GET for user id");
});

app.post("/users", (req, res) => {
    res.send("POST for users");
});

app.delete("/users/:id", (req, res) => {
    res.send("DELETE for user id");
});

// Posts routes
app.get("/posts", (req, res) => {
    res.send("GET for posts");
});

app.get("/posts/:id", (req, res) => {
    res.send("GET for post id");
});

app.post("/posts", (req, res) => {
    res.send("POST for posts");
});

app.delete("/posts/:id", (req, res) => {
    res.send("DELETE for post id");
});

// Start server
app.listen(3000, () => {
    console.log("server is listening to 3000");
});

