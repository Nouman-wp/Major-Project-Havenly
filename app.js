const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
  
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

const sessionOptions = {
  secret: "myrandomsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  },
};


async function main() {
  await mongoose.connect(MONGO_URL);
}


app.get("/", (req, res) => {
  res.send("Root Website");
}); 

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  next();
});

// important line for /routes/listing.js & review.js
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);




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
