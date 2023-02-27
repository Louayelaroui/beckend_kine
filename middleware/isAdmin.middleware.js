const ExpressError = require("../utils/errorObject");

function isAdmin(req, res, next) {
  try {
    if (!(req.user.role == "admin"))
      throw new ExpressError("Unauthorized Request");

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  isAdmin,
};
