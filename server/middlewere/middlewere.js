const requireLogin = async (req, res, next) => {
  console.log("session", req.session.user);
  if (req.session.user) {
    next(); // User is logged in, proceed to the next middleware/route
  } else {
    console.log("session is not set");
    res.redirect("/login");
  }
};

const preventLoginAccess = (req, res, next) => {
  if (req.session.userLoggedIn) {
    // If the user is already logged in, redirect them to another page, e.g., the profile page
    return res.redirect("/");
  }
  // If the user is not logged in, allow them to access the login page
  next();
};

module.exports = { requireLogin, preventLoginAccess };
