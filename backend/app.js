const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer"); //handles form data
const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/user-route");
const { devRouter } = require("./routes/devTracker-route");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer();
app.use(upload.none()); // upload.none() middleware from multer parses the form-data and populate req.body with the form fields.

app.use(express.json());
app.use("/", userRouter);
app.use("/dev", devRouter);

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
