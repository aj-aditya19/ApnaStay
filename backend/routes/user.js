import express from "express";
const router = express.Router();
import passport from "passport";
import { saveRedirectUrl } from "../middleware.js";
import {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout,
} from "../controllers/users.js";
import wrapAsync from "../utils/wrapAsync.js";

router.route("/signup").get(renderSignupForm).post(wrapAsync(signup));

router
  .route("/login")
  .get(renderLoginForm)
  .post(saveRedirectUrl, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const message = info?.message || "Invalid email or password.";
        req.flash("error", message);
        return res.redirect("/login");
      }

      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        return login(req, res, next);
      });
    })(req, res, next);
  });

router.get("/logout", logout);

export default router;
