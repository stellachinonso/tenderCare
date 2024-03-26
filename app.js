const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, ()=>{
     console.log(`app is listening to port: ${PORT}`)
})