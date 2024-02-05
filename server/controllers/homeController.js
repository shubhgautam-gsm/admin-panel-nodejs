const mongoose = require("mongoose");
const customerModel = require("../models/customerModel");
const userModel = require("../models/userModel");
const session = require("express-session");
const requireLogin = require("../middlewere/middlewere");

// ======================================== User Routes ====================================//

/*
 * Get/
 * Login User
 */

const loginUser = (req, res, next) => {
  const locals = {
    title: "Login",
    description: "Nord js Dashboard",
  };
  res.render("Account/login", locals);
};

/*
 * Get/
 * Post Login User
 */

const postLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email and password are required.");
  }

  const userData = await userModel.findOne({ email });

  if (userData && userData.password === password) {
    req.session.user = userData.email; // Set the session variable
    req.session.userLoggedIn = true;
    res.redirect("/");
  } else {
    res.send("Incorrect email or password");
  }
};

/*
 * Get/
 * User Logout
 */

const logoutUser = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/login");
  });
};

/*
 * Get/
 * User profile
 */

const userProfile = (req, res, next) => {
  const locals = {
    title: "Login",
    description: "Nord js Dashboard",
  };
  res.render("Account/profile", locals);
};

// ======================================== Dashboard Routes ====================================//

/*
 * Get/
 * Dashboard
 */

const Dashboard = (req, res, next) => {
  res.render("Dashboard/dashboard");
};

// ======================================== Customer Routes ====================================//

/*
 * Get/
 * Customer
 */

const customerController = async (req, res) => {
  const locals = {
    title: "NodeJs",
    description: "Free NodeJs user management system",
  };
  try {
    const customers = await customerModel.find({}).limit(22);
    res.render("Customer/customer", { locals, customers });
  } catch (error) {
    console.log(error);
  }
};

/*
 * Get/
 * New Customer Form
 */

const addCustomerController = (req, res) => {
  const locals = {
    title: "Add New Customer",
    description: "Free NodeJs user management system",
  };
  res.render("Customer/addCustomer", locals);
};

/*
 * Post/
 * Create new Customer Form
 */

const postaddCustomerController = async (req, res) => {
  const newCustomer = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await newCustomer.save();
    res.redirect("/customer");
  } catch (error) {
    console.log(error);
  }
};

/*
 * Get/
 * View Customer
 */

const viewCustomer = async (req, res) => {
  try {
    const singleCustomer = await customerModel.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs user management system",
    };

    res.render("customer/viewCustomer", { locals, singleCustomer });
  } catch (error) {
    console.log(error);
  }
};

/*
 * Get/
 * Edit Customer
 */

const editCustomer = async (req, res) => {
  const editCustomer = await customerModel.findOne({ _id: req.params.id });
  try {
    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs user management system",
    };

    res.render("customer/editCustomer", { locals, editCustomer });
  } catch (error) {
    console.log(error);
  }
};

/*
 * Post/
 * Edit Customer
 */

const editCustomerPost = async (req, res) => {
  try {
    await customerModel.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });

    // await res.redirect(`/edit/${req.params.id}`);
    await res.redirect("/customer");
  } catch (error) {
    console.log(error);
  }
};

/*
 * Delete/
 * Delete Customer
 */

const deleteCustomer = async (req, res) => {
  try {
    await customerModel.deleteOne({ _id: req.params.id });
    res.redirect("/customer");
  } catch (error) {
    console.log(error);
  }
};

// ======================================== End Customer Routes ====================================//

module.exports = {
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
};
