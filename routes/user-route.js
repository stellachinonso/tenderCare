const express = require("express");
const Router = express.Router()
const { signup, login} = require("../controllers/user-controller")
const{  resetPassword } = require("../controllers/userResetPassword")
const { devTracker2 } = require("../controllers/devTracker-controller")
const { child } = require("../controllers/child-controller")

Router.post("/signup", signup);
Router.get("/login", login);
Router.post("/tracker", devTracker2);
Router.get("/resetpassword", resetPassword);
Router.post("/child", child);

module.exports = { Router }