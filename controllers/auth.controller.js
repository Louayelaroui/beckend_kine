const { User } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const { findById } = require("../models/Injuries");

function getSignInView(req, res) {
  res.render("pages/admin-login");
}
async function signUpAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const newUser = User({
      username,
      password,
      role: "admin",
    });
    await newUser.save();

    res.redirect("/auth/signin-admin");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Invalid Request");
  }
}

async function getSignUpView(req, res) {
  res.render("pages/admin-signup");
}

async function signInAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!(user && user.role === "admin")) {
      throw new Error("admin user not found !");
    }

    if (password !== user.password) {
      throw new Error("wrong credentials");
    }

    const payload = { sub: user._id, username, role: user.role };
    const token = jwt.sign(payload, config.JWT_SECRET);

    user.token = token;

    await user.save();

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
    res.redirect("/auth/admin-panel");
  } catch (e) {
    console.log(e);
    return res.status(500).render("pages/admin-login", { message: e.message });
  }
}

async function getHomeAdmin(req, res) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("../scratch");
  }

  let token = localStorage.getItem("token");

  token = jwt.decode(token, config.JWT_SECRET);

  if (!(token && token.role == "admin")) {
    res.redirect("/auth/signin-admin");
  }
  const users = await User.find({});

  res.render("pages/home-admin", { users });
}

async function editUserAdmin(req, res) {
  try {
    const id = req.params["id"];
    const { username, password, role } = req.body;

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    let token = localStorage.getItem("token");
    token = jwt.decode(token, config.JWT_SECRET);
    if (!(token && token.role == "admin")) {
      res.redirect("/auth/signin-admin");
    }

    const user = await User.findById(id);
    console.log("---------------------");
    if (!user) {
      throw new Error("User not found");
    }
    user.username = username;
    user.password = password;
    user.role = role;

    await user.save();

    res.status(202).redirect("/auth/admin-panel");
  } catch (e) {
    console.log(e);
    return res.redirect("/auth/edit-user/" + id);
  }
}

async function getEditUserView(req, res) {
  try {
    const id = req.params["id"];

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    let token = localStorage.getItem("token");
    token = jwt.decode(token, config.JWT_SECRET);

    if (!(token && token.role == "admin")) {
      res.redirect("/auth/signin-admin");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not find with id " + id);
    }
    res.render("pages/admin-edit", { user: user });
  } catch (e) {
    console.log(e);
    res.redirect("/auth/admin-panel");
  }
}

async function deleteUserAdmin(req, res) {
  try {
    const id = req.params["id"];

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    let token = localStorage.getItem("token");
    token = jwt.decode(token, config.JWT_SECRET);
    if (!(token && token.role == "admin")) {
      res.redirect("/auth/signin-admin");
    }
    const user = await User.findByIdAndDelete(id);
    res.redirect("/auth/admin-panel");
  } catch (e) {
    console.log(e);
    res.redirect("/auth/admin-panel");
  }
}

async function addUserAdmin(req, res) {
  try {
    const role = req.query.role;
    const { username, password } = req.body;

    console.log(req.body);

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    let token = localStorage.getItem("token");
    token = jwt.decode(token, config.JWT_SECRET);
    if (!(token && token.role == "admin")) {
      res.redirect("/auth/signin-admin");
    }

    console.log("---------------------");

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      throw new Error("already found user with same username");
    }

    const user = new User({
      username,
      password,
      role,
    });

    await user.save();

    res.status(202).redirect("/auth/admin-panel");
  } catch (e) {
    console.log(e);
    return res.redirect("/auth/add-user");
  }
}

async function getAddUserView(req, res) {
  try {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    let token = localStorage.getItem("token");
    token = jwt.decode(token, config.JWT_SECRET);

    if (!(token && token.role == "admin")) {
      res.redirect("/auth/signin-admin");
    }

    res.render("pages/admin-add");
  } catch (e) {
    console.log(e);
    res.redirect("/auth/admin-panel");
  }
}

async function logout(req, res) {
  try {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    let token = localStorage.getItem("token");
    token = jwt.decode(token, config.JWT_SECRET);
    if (!(token && token.role == "admin")) {
      res.redirect("/auth/signin-admin");
    }

    localStorage.removeItem("token");

    const user = await User.findById(token.sub);

    if (!user) {
      res.redirect("/auth/signin-admin");
    }

    user.token = "";

    await user.save();
    res.redirect("/auth/signin-admin");
  } catch (e) {
    console.log(e);
    res.redirect("/auth/admin-panel");
  }
}

module.exports = {
  getHomeAdmin,
  signInAdmin,
  getSignUpView,
  signUpAdmin,
  getSignInView,
  editUserAdmin,
  getEditUserView,
  deleteUserAdmin,
  logout,
  getAddUserView,
  addUserAdmin,
};
