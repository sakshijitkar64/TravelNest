const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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


router.get("/forgot-password", (req, res) => {
    res.render("users/forgot-password.ejs");
});
//forgot-password
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            req.flash("error", "No account found with that email.");
            return res.redirect("/forgot-password");
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetLink =
            `http://localhost:8080/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "TravelNest Password Reset",
            html: `
                <h2>Reset Your TravelNest Password</h2>

                <p>
                    You requested to reset your TravelNest password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <a href="${resetLink}"
                   style="
                   display:inline-block;
                   padding:12px 20px;
                   background:#ff385c;
                   color:white;
                   text-decoration:none;
                   border-radius:8px;
                   ">
                    Reset Password
                </a>

                <p>
                    This link will expire in 15 minutes.
                </p>
            `
        });

        req.flash("success", "Password reset link sent to your email.");
        res.redirect("/login");

    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong.");
        res.redirect("/forgot-password");
    }
});
router.get("/reset-password/:token", async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        req.flash("error", "Password reset link is invalid or expired.");
        return res.redirect("/login");
    }

    res.render("users/reset-password.ejs", { token });
});
module.exports=router;
