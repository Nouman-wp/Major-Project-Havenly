const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/havenly";

main().then(()=>{
    console.log("connected to the Database");
}).catch((err)=>{
    console.log(err);
});

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));

app.engine('ejs',ejsMate);

async function main(){
    await mongoose.connect(MONGO_URL);
}

//index.ejs route 

app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("index.ejs",{allListings});
});

//New Route
app.get("/listings/new", (req, res) => {
    res.render("new.ejs");
  });

//Show.ejs route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", { listing });
  });

//edit.ejs route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("edit.ejs", { listing });
  });

  //Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });

  //Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });

  //Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });



app.get("/",(req,res)=>{
    res.send("Root Website");
});

app.listen(8080,()=>{
    console.log("server is running on port 8080");
});