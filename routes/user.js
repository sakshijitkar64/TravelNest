const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const usersController=require("../controllers/usersController.js");
router.route("/signup")
.get((req, res) => { res.render("users/signup.ejs")})
//post user
.post(wrapAsync(usersController.signupUser));

router.route("/login")
//login user
.get(usersController.loginUser)
//loginPost
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),usersController.loginUserPost
);



//logout
router.get("/logout",usersController.logoutUser);


module.exports=router;
