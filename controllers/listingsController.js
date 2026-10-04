const Listing=require("../models/listing.js");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
const cloudinary = require("../cloudConfig.js");
//map related
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index
module.exports.index = async (req, res) => {

    const { location } = req.query;

    let allListings;

    if (location && location.trim() !== "") {
        allListings = await Listing.find({
            location: {
                $regex: location.trim(),
                $options: "i"
            }
        });
    } else {
        allListings = await Listing.find({});
    }

    const locations = await Listing.distinct("location");

    res.render("listings/index.ejs", {
        allListings,
        locations,
        searchLocation: location || ""
    });
};
//new route
module.exports.renderNewnew=(req, res) => {
    res.render("listings/new.ejs");
};
//show route
module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(404, "Page Not Found");
    }
    const listing = await Listing.findById(id)
    .populate({path: "reviews",populate: {path: "author"}
    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}
//create route
module.exports.createListing = async (req, res, next) => {
    try {
        const location = req.body.listing.location;

        console.log("LOCATION:", location);
        console.log("MAP TOKEN EXISTS:", !!process.env.MAP_TOKEN);

        // Convert location into coordinates
        const response = await geocodingClient
            .forwardGeocode({
                query: location,
                limit: 1
            })
            .send();

        console.log(
            "MAPBOX RESULT:",
            response.body.features[0]
        );

        // Location not found
        if (!response.body.features.length) {
            throw new ExpressError(
                400,
                "Location could not be found"
            );
        }

        // Get geometry
        const geometry =
            response.body.features[0].geometry;

        console.log("GEOMETRY:", geometry);

        // Create listing
        const newListing =
            new Listing(req.body.listing);

        newListing.owner = req.user._id;

        // Save coordinates
        newListing.geometry = geometry;

        // Upload image
        if (req.file) {
            const result = await new Promise((resolve, reject) => {

                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: "TravelNest"
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                uploadStream.end(req.file.buffer);
            });

            newListing.image = result.secure_url;
        }

        // Save to MongoDB
        await newListing.save();

        console.log(
            "SAVED GEOMETRY:",
            newListing.geometry
        );

        req.flash(
            "success",
            "New Listing Created!"
        );

        res.redirect("/listings");

    } catch (error) {
        console.log("GEOCODING ERROR:", error);
        next(error);
    }
};
//edit route
module.exports.editListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you want to Edit does not exists!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

//update route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Update normal fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.country = req.body.listing.country;
    listing.location = req.body.listing.location;

    // If new image is selected
    if (req.file) {
        const result = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "TravelNest"
                },
                (error, result) => {

                    if (error) {
                        console.log("CLOUDINARY ERROR:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );

            uploadStream.end(req.file.buffer);
        });

        listing.image = result.secure_url;
    }

    await listing.save();

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
};

//delete Route
module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};