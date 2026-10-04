const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudConfig.js");

const upload = multer({ storage: multer.memoryStorage() });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn,isOwner}=require("../middleware.js");

//const Listing = require("../models/listing.js");
//const Review = require("../models/review.js");
//const mongoose = require("mongoose");
const listingController=require("../controllers/listingsController.js");
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
     next();
};
//index route
router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);

//new route
router.get("/new",isLoggedIn,listingController.renderNewnew);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

//update route and delete route 
router.route("/:id")
//show route
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,isOwner,
wrapAsync(listingController.destroyListing));

module.exports = router;
