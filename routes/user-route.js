const express = require("express");
const Router = express.Router()
const { signup, login} = require("../controllers/user-controller")
const{  resetPassword } = require("../controllers/userResetPassword")
const { devTracker2 } = require("../controllers/childBioData-controller")
const { devTracker } = require("../controllers/tracker-controller")

Router.post("/signup", signup);
Router.get("/login", login);
Router.post("/child", devTracker2);
Router.get("/resetpassword", resetPassword);
Router.post("/tracker", devTracker);

module.exports = { Router }