const Listing = require("../models/listing");

const fetch = require("node-fetch").default;
const { config } = require('@maptiler/client');
const maptilerClient = require("@maptiler/client");
config.fetch = globalThis.fetch;
const mapToken = process.env.MAP_TOKEN;
maptilerClient.config.apiKey = mapToken;

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing doesn't exists!");
    res.redirect("/listings");
  } else {
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }
};

module.exports.createListing = async (req, res) => {
  // const response = await maptilerClient.geocoding.forward(req.body.listing.location);
  // console.log(response.features[0].geometry.coordinates);

  const location = req.body.listing.location;
  const resGeo = await fetch(`https://api.maptiler.com/geocoding/${location}.json?key=${process.env.MAP_TOKEN}`);

  const data = await resGeo.json();

  //Safety Check for resGeo
  if(!data.features.length){
    throw new Error("Invalid Location");
  }

  const coordinates = data.features[0].geometry.coordinates;

  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  newListing.geometry= { 
    type: "Point",
    coordinates: coordinates,
  };

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing doesn't exists!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};

    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect(`/listings`);
};
