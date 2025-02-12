const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://www.cvvillas.com/dynamic-images/5000-5999/5301/5301_c=(0,239,3746,2106)_w=1366_h=768.webp?v=202405071552",
    set: (v) =>
      v === ""
        ? "https://www.cvvillas.com/dynamic-images/5000-5999/5301/5301_c=(0,239,3746,2106)_w=1366_h=768.webp?v=202405071552"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref:"Review",
    },
  ], 
});


listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
  }
});




const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;