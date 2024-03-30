const express = require("express");
const Router = express.Router()
const { signup, login} = require("../controllers/user-controller")
const{  resetPassword } = require("../controllers/userResetPassword")

Router.post("/signup", signup)
Router.get("/login", login);
Router.get("/resetpassword", resetPassword);

module.exports = { Router }