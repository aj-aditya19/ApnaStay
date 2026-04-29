import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, isOwner } from "../middleware.js";
import {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
} from "../controllers/listings.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });

router.route("/").get(isLoggedIn, wrapAsync(index)).post(
  isLoggedIn,
  // validateListing,
  upload.single("listing[image]"),
  wrapAsync(createListing),
);

//New Route
router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(isLoggedIn, wrapAsync(showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(updateListing),
  )
  .delete(isLoggedIn, wrapAsync(deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, renderEditForm);

export default router;
