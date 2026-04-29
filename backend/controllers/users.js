import User from "../models/user.js";

export const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

export const signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to ApnaStay!");
      res.redirect("/listings");
    });
  } catch (err) {
    if (err?.name === "UserExistsError") {
      req.flash("error", "Email already exists. Please login instead.");
      return res.redirect("/login");
    }
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

export const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

export const login = async (req, res) => {
  req.flash("success", "Welcome back to ApnaStay!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You're logged out!");
    res.redirect("/listings");
  });
};
