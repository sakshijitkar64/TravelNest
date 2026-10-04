const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
//signupUser
module.exports.signupUser=async(req, res) => {
  try{
     let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
         }
    req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
});
  }catch(e){
     req.flash("error","User already registered!")
    res.redirect("/signup"); 
  }
};
//login user

module.exports.loginUser=(req, res) => {
    res.render("users/login.ejs");
};
//login post
module.exports.loginUserPost=(req, res) => {
        req.flash("success", "Welcome back to TravelNest!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };

module.exports.logoutUser=(req, res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect("/listings");
    });
};