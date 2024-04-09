const express = require("express");
const userRouter = express.Router();
const { signup, login } = require("../controllers/user-controller");
const { resetPassword } = require("../controllers/userResetPassword");
const { child } = require("../controllers/child-controller");

userRouter.post("/signup", signup);
userRouter.get("/login", login);
userRouter.get("/resetpassword", resetPassword);
userRouter.post("/child", child);

module.exports = { userRouter };
