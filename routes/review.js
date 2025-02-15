const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");



//Review Posting Route 
router.post("/",isLoggedIn, validateReview,wrapAsync( reviewController.createReview))

// Review Deleting Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
  
  
  
  