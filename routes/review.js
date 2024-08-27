const express = require ("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//8) review post rout
router.post("/",isLoggedIn,validateReview,wrapAsync (reviewController.createReview));


 //delete rout for reviews
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.distroyReview));

 module.exports=router;