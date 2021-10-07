////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const app = express()

////////////////////////////////////////
// DATABASE - (in Connection model)
////////////////////////////////////////

const MONGODB_URI = process.env.MONGODB_URI
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(MONGODB_URI, CONFIG)

mongoose.connection
    .on("error", (err) => console.log(err.message))
    .on("connected",() => console.log("Connected"))
    .on("disconnected",() => console.log("Disconnected"))

////////////////////////////////////////
// Models
////////////////////////////////////////


////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(morgan("tiny"))

////////////////////////////////////////
// ROUTES
////////////////////////////////////////
// Home
app.get("/", (req,res) => {
    res.send("Hello world")
})

// Seed

// Index
app.get("/restaurants", (req,res) => {
    Rest.find({}, (err,rests) => {
        res.render("rest/index.ejs")
    })
})

// New

// Destroy

// Update

// Create

// Edit

// Show
app.get("/restaurants/:id", (req,res) => {
    const id = req.params.id
    // Rest.findById(id,(err,rest) => {
    //     res.render("rest/show.ejs", {rest})
    // })
})

////////////////////////////////////////
// LISTENER
////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))