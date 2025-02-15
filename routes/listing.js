const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// index and create route controlled
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing, wrapAsync(listingController.createListing));

//New Route controlled
router.get("/new", isLoggedIn, listingController.renderNewForm);


// update , delete and show route controlled
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//edit.ejs route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;
