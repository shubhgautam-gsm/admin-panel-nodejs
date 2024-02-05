const express = require("express");
const {
  loginUser,
  postLoginUser,
  logoutUser,
  userProfile,
  Dashboard,
  customerController,
  addCustomerController,
  postaddCustomerController,
  viewCustomer,
  editCustomer,
  editCustomerPost,
  deleteCustomer,
} = require("../controllers/homeController");
const router = express.Router();
const {
  requireLogin,
  preventLoginAccess,
} = require("../middlewere/middlewere");

// user Routes

router.get("/login", preventLoginAccess, loginUser);

router.post("/login", postLoginUser);

router.get("/logout", logoutUser);

router.get("/profile", requireLogin, userProfile);

// Dashboard Route

router.get("/", requireLogin, Dashboard);

// Customer Route

router.get("/customer", requireLogin, customerController);

router.get("/addCustomer", addCustomerController);

router.post("/addCustomer", postaddCustomerController);

router.get("/view/:id", viewCustomer);

router.get("/edit/:id", editCustomer);

router.put("/edit/:id", editCustomerPost);

router.delete("/edit/:id", deleteCustomer);

module.exports = {
  routes: router,
};
