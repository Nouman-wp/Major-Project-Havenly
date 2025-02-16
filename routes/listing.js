const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const {storage} = require("../cloudConfig.js");

const upload = multer({storage});

// index and create route controlled
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));

//New Route controlled
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Search Route - MUST BE ABOVE `/:id` ROUTE
router.get("/search", wrapAsync(async (req, res) => {
    const query = req.query.query;
    
    if (!query) {
        return res.redirect("/listings"); // Redirect if no query is entered
    }

    const results = await Listing.find({
        title: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.render("index.ejs", { allListings: results });
}));



// update , delete and show route controlled
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//edit.ejs route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));





module.exports = router;
