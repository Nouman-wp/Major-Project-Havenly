const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
  };

  module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs");
  }


  module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path :"reviews",populate:{path:"author",},}).
    populate("owner");
    if(!listing){
      req.flash("error","Error: Listing Not Found");
      res.redirect("/listings");
    }
    res.render("show.ejs", { listing });
  }

  module.exports.createListing = async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        newListing.owner =req.user._id; 
        await newListing.save();
        req.flash("success", "Notification : New Listing Created !");
        res.redirect("/listings");
      }

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Error: Listing Not Found");
      res.redirect("/listings");
    }
    res.render("edit.ejs", { listing });
  }

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You do not have permission to do this");
      res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Notification : Listing Updated !");
    res.redirect(`/listings/${id}`);
  }  

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Notification : Listing Deleted !");
    res.redirect("/listings");
  }  