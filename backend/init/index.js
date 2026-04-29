import mongoose from "mongoose";
import sampleListings from "./data.js";
import Listing from "../models/listing.js";

main()
  .then((res) => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Some error occured in the database");
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ApnaStay");
}

const initDB = async () => {
  await Listing.deleteMany({});
  const listings = sampleListings.map((obj) => ({
    ...obj,
    owner: "698b313ef0e74bb54c49604a",
  }));
  await Listing.insertMany(listings);
  console.log("Data was initialized");
};
initDB();
