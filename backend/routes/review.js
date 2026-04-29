import express from "express";
const router = express.Router({ mergeParams: true });
import wrapAsync from "../utils/wrapAsync.js";
import { validateReview, isLoggedIn, isReviewAuthor } from "../middleware.js";
import { createReview, deleteReview } from "../controllers/reviews.js";

//Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

//Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(deleteReview),
);

export default router;
