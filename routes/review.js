const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");
const ReviewsController=require("../controllers/reviewsController.js");
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};
//post route review
router.post("/", isLoggedIn, validateReview, wrapAsync(ReviewsController.postReview));
//review delete
router.delete("/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(ReviewsController.destroyReview));

module.exports = router;
