const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
  
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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


async function main() {
  await mongoose.connect(MONGO_URL);
}

// important line for /routes/listing.js & review.js
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);



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
