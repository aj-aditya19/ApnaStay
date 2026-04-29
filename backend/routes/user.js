const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const wrapAsync = require("../utils/wrapAsync.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
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

        return userController.login(req, res, next);
      });
    })(req, res, next);
  });

router.get("/logout", userController.logout);

module.exports = router;
