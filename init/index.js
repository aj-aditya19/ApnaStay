const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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
  initData.data = initData.data.map((obj)=>({...obj, owner: "698b313ef0e74bb54c49604a"}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};
initDB();
