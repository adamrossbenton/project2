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
// DATABASE
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

const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    homeCity: String,
    favCuisine: String,
    numPosts: Number,
    voteScore: Number
})

const restSchema = new Schema({
    restName: {type: String, required: true},
    restCity: {type: String, required: true},
    restCuisine: String,
    restOpenHours: String,
    restHappsHours: String,
    restCreator: String,
    restRating: Number,
})

const dealSchema = new Schema({
    dealName: String,
    dealPrice: Number,
    dealDesc: String,
})

const User = model("User",userSchema)
const Rest = model("Rest",restSchema)
const Deal = model("Deal", dealSchema)

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

////////////////////////////////////////
// LISTENER
////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))