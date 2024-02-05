require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const homeRoutes = require("./server/routes/home-routes");
const connectDB = require("./server/Config/db");
const port = process.env.PORT || 3022;
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true })); //required from get value from form
app.use(express.json()); //required from get value from form

app.use(expressLayouts);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // Set userLoggedIn in res.locals
  res.locals.userLoggedIn = req.session.userLoggedIn || false;
  next();
});

app.use(homeRoutes.routes);

app.use("*", (req, res) => {
  res.redirect("/login");
});
app.listen(port, () => {
  console.log(`APP IS LISTENING ON ${port}`);
});
