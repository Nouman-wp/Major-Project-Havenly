const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//index.ejs route controlled
router.get("/", wrapAsync(listingController.index));

//New Route controlled
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show.ejs route controlled
router.get("/:id", wrapAsync(listingController.showListing));

//edit.ejs route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//Create Route controlled
router.post("/", isLoggedIn,validateListing, wrapAsync(listingController.createListing));

//Delete Route cpmtrolled
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Update Route controlled
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

module.exports = router;
