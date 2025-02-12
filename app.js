const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

const listings = require("./routes/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/havenly";

main()
  .then(() => {
    console.log("connected to the Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);




const validateReview = (req,res,next) => {
  let {error} = reviewSchema.validate(req.body);
  if (error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
  };



async function main() {
  await mongoose.connect(MONGO_URL);
}

// important line for /routes/listing.js
app.use("/listings",listings);



//Review Route
// Post
app.post("/listings/:id/reviews",validateReview,wrapAsync( async (req,res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`); 
}))

// Review Deleting Route

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); 
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);




app.get("/", (req, res) => {
  res.send("Root Website");
}); 

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
});

app.use((err, req, res, next) => {
  let {statusCode=500 , message="Something Went Wrong"} = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {message});
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
