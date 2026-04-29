import "dotenv/config";
import mongoose from "mongoose";
import { cloudinary } from "../cloudConfig.js";
import Listing from "../models/listing.js";
import User from "../models/user.js";
import sampleListings from "../init/data.js";

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/ApnaStay";

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB for seeding");

  // Clear existing data (optional)
  await Listing.deleteMany({});
  await User.deleteMany({});

  // Create some fake users
  const names = [
    "Aarav Sharma",
    "Mira Patel",
    "Rohan Gupta",
    "Sara Khan",
    "Liam Smith",
  ];

  const users = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const email = `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
    try {
      const registered = await User.register(
        { username: name, email },
        "Password123",
      );
      users.push(registered);
      console.log(`Created user ${email}`);
    } catch (e) {
      console.error("Error creating user", e);
    }
  }

  // Seed listings and upload images to Cloudinary (by URL)
  for (let i = 0; i < sampleListings.length; i++) {
    const item = sampleListings[i];
    try {
      // Upload image from remote URL to Cloudinary
      const uploadRes = await cloudinary.uploader.upload(item.image.url, {
        folder: `ApnaStay_DEV/listings`,
        public_id: `listing_${i}`,
        overwrite: false,
      });

      const owner = users[Math.floor(Math.random() * users.length)];

      const newListing = new Listing({
        title: item.title,
        description: item.description,
        image: { filename: uploadRes.public_id, url: uploadRes.secure_url },
        price: item.price || 1000,
        location: item.location || "Unknown",
        country: item.country || "",
        owner: owner._id,
        geometry: item.geometry || undefined,
      });

      await newListing.save();
      console.log(`Saved listing: ${item.title}`);
    } catch (err) {
      console.error(
        `Failed to upload/save listing ${item.title}:`,
        err.message || err,
      );
    }
  }

  console.log("Seeding complete");
  mongoose.connection.close();
}

main().catch((e) => {
  console.error(e);
  mongoose.connection.close();
});
