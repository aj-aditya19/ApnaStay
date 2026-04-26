const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post Route
router.post(
  "/", isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Route
router.delete(
  "/:reviewId", isLoggedIn, isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
