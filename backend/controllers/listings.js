const Listing = require("../models/listing");
const axios = require("axios");

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
    res.render("listings/show.ejs", { 
      listing, 
      mapToken: process.env.MAP_TOKEN 
    });
  }
};

module.exports.createListing = async (req, res) => {
  try {
    const { location, country } = req.body.listing;

    // Geocode the location using MapTiler API
    const geoRes = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(location + ", " + country)}.json?key=${process.env.MAP_TOKEN}`
    );

    // Safety Check - make sure we got results
    if (!geoRes.data.features || geoRes.data.features.length === 0) {
      req.flash("error", "Invalid Location! Please check the location and country.");
      return res.redirect("/listings/new");
    }

    const coords = geoRes.data.features[0].geometry.coordinates; // [lng, lat]

    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);

    const newListing = new Listing({
      ...req.body.listing,
      owner: req.user._id,
      image: { url, filename },
      geometry: {
        type: "Point",
        coordinates: coords, // [lng, lat] from MapTiler
      },
    });

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error creating listing:", error);
    req.flash("error", "Error creating listing. Please try again.");
    res.redirect("/listings/new");
  }
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

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };

      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "Error updating listing. Please try again.");
    res.redirect("/listings");
  }
};

module.exports.deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listings`);
  } catch (error) {
    console.error("Error deleting listing:", error);
    req.flash("error", "Error deleting listing. Please try again.");
    res.redirect("/listings");
  }
};