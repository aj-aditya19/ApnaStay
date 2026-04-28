if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
<<<<<<< HEAD
const { default: MongoStore } = require("connect-mongo");

=======
>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
const dbUrl = process.env.ATLASDB_URL;

=======
>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e
main()
  .then((res) => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Some error occured in the database");
<<<<<<< HEAD
    console.log(err);
  });
  
async function main() {
  await mongoose.connect(dbUrl);
}

//Mongo Sessions
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 *3600, //seconds - 24hours
});

store.on("error", ()=>{
    console.log("Error in Mongo Session Store");
});

//Session Configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
=======
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ApnaStay");
}

//Session Configuration
const sessionOptions = {
  secret: "mysupersecretcode",
>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

<<<<<<< HEAD
=======
//Root Path
app.get("/", (req, res) => {
  res.send("Hi, Im root");
});

>>>>>>> 4bc6556bda247dfbd060e622f5e78fccb93b502e


//Listings Router
app.use("/listings", listingsRouter);

//Reviews Router
app.use("/listings/:id/reviews", reviewsRouter);

//User Router
app.use("/", userRouter);

//All Path route
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
