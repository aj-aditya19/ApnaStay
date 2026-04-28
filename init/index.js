const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

<<<<<<< HEAD
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/ApnaStay";

=======
>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e
main()
  .then((res) => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Some error occured in the database");
<<<<<<< HEAD
    console.error(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
=======
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ApnaStay");
>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e
}

const initDB = async () => {
  await Listing.deleteMany({});
<<<<<<< HEAD
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "698b313ef0e74bb54c49604a",
  }));
=======
  initData.data = initData.data.map((obj)=>({...obj, owner: "698b313ef0e74bb54c49604a"}));
>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};
initDB();
