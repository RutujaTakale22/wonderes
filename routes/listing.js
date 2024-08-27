const express = require ("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner ,validateListing}=require("../middleware.js");
const listingControllers= require("../controllers/listings.js");
const multer = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingControllers.index))//1.index route
.post( 
   isLoggedIn,
   upload.single("listing[image]"),//4.create route
   validateListing,
   wrapAsync(listingControllers.createListing));

//3)new rout which can add new data
router.get("/new",isLoggedIn,listingControllers.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingControllers.showListing))//show route
.put(
   isLoggedIn,
   isOwner,
   upload.single("listing[image]"),
   validateListing,
   wrapAsync(listingControllers.updateListing))//update route
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.distroyListing))//delete route

 //5) Edit route
 router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(listingControllers.renderEditForm));
 
  module.exports=router;
  