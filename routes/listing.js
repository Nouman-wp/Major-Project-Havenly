const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");



//index.ejs route

router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  }));
  
  //New Route
  router.get("/new", isLoggedIn,(req, res) => {
    res.render("new.ejs");
  });
  
  //Show.ejs route
  router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path :"reviews",populate:{path:"author",},}).
    populate("owner");
    if(!listing){
      req.flash("error","Error: Listing Not Found");
      res.redirect("/listings");
    }
    res.render("show.ejs", { listing });
  }));

  //edit.ejs route
  router.get("/:id/edit",isLoggedIn,isOwner , wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Error: Listing Not Found");
      res.redirect("/listings");
    }
    res.render("edit.ejs", { listing });
    
  }));
  
  //Create Route
  router.post(
    "/",isLoggedIn,
    wrapAsync(async (req, res, next) => {
      const newListing = new Listing(req.body.listing);
      newListing.owner =req.user._id; 
      await newListing.save();
      req.flash("success", "Notification : New Listing Created !");
      res.redirect("/listings");
    })
  );
  
  //Delete Route
    "/",
  router.delete("/:id",isLoggedIn,isOwner , async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Notification : Listing Deleted !");
    res.redirect("/listings");
  });
  
  //Update Route
  router.put("/:id",isLoggedIn,isOwner ,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You do not have permission to do this");
      res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Notification : Listing Updated !");
    res.redirect(`/listings/${id}`);
  })
  );


  module.exports = router;