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
    restHappsDeals: String,
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

// Seed
app.get("/seed", (req,res) => {
    const startRest = [
        {restName: "Bangrak Market", restCity: "Seattle", restCuisine: "Thai", restOpenHours: "opentoclose", restHappsHours: "5 to 7", restHappsDeals: "lots", restCreator: "me", restRating: 1},
        {restName: "Taqueria Cantina", restCity: "Seattle", restCuisine: "Mexican", restOpenHours: "open to close", restHappsHours: "3 to 6", restHappsDeals: "all kinds", restCreator: "also me", restRating: 10},
        {restName: "Cyclops", restCity: "Seattle", restCuisine: "American", restOpenHours: "open to close", restHappsHours: "6 to 9", restHappsDeals: "a good amount", restCreator: "still me", restRating: 11},
        {restName: "MOONTREE", restCity: "Seattle", restCuisine: "Sushi/Japanese", restOpenHours: "open to close", restHappsHours: "8 to close", restHappsDeals: "a handful", restCreator: "not me (jk lol)", restRating: 100},
    ]

    Rest.remove({}, (err,data) => {
        Rest.create(startRest, (err,data) => {
            res.json(data)
        })
    })
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