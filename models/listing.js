const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const listingSchema= new Schema({
    title :{ 
       type: String,
       required :true,
    },

    description : String,
    image : { 
      url:String,
      filename:String,
     },
     price : Number,
    location : String,
    country : String,
    reviews : [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});
//review  delete hotil jeva listing delete hoil
listingSchema.post("findOneAndDelete",async(req,res)=>{
    if(Listing){
        await Review.deleteMany({_id:{$in: Listing.reviews}})

    }
})

const Listing= mongoose.model("Listing",listingSchema);
module.exports = Listing;