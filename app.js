const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/havenly";

main().then(()=>{
    console.log("connected to the Database");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the beach",
    price: 1200,
    location: "Calangute, Goa",
    country: "India",
  });

  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});

app.get("/",(req,res)=>{
    res.send("Root Website");
});

app.listen(8080,()=>{
    console.log("server is running on port 8080");
});