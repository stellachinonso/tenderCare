const express = require("express");
const Router = express.Router();


const { child } = require("../controllers/child-controller");
Router.post("/child", child);

module.exports = { Router };
