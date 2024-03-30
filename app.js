const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors");
const { Router } = require("./routes/user-route")
const PORT = 4000;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", Router)

app.listen(PORT, ()=>{
     console.log(`app is listening to port: ${PORT}`)
})