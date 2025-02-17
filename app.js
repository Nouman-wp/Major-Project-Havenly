if(process.env.NODE_ENV != "production"){require('dotenv').config();}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');

// Authentication and user password things 
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
  
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/havenly";
const dbURL = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbURL);
}


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

// HOsting it
const store = MongoStore.create({mongoUrl:dbURL,crypto:{secret: process.env.SECRET},touchAfter: 24*3600,});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  },
};

store.on("error",()=>{
  console.log("ERROR IN MONGO STORE",err);
});


app.use(session(sessionOptions));
app.use(flash());

//password stuff

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser = req.user; 
  next();
});

app.get("/", (req, res) => {
  res.render("home", { currUser: req.user });  
});


// important line for /routes/listing.js & review.js
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/", userRouter);




app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
});

app.use((err, req, res, next) => {
  let {statusCode=500 , message="Something Went Wrong"} = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {message});
});


const listingsRoutes = require("./routes/listing.js");
app.use("/listings", listingsRoutes);






app.listen(8080, () => {
  console.log("server is running on port 8080");
});
