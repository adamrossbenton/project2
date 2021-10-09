////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const RestRouter = require("./controllers/rest")
const UserRouter = require("./controllers/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const Rest = require("./models/rest")
const Deal = require("./models/deal")

////////////////////////////////////////
// App
////////////////////////////////////////

const app = express()

////////////////////////////////////////
// DATABASE - (in Connection model)
////////////////////////////////////////

////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(morgan("tiny"))
app.use("/restaurants", RestRouter)
// app.use("/user", UserRouter)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    saveUninitialized: true,
    resave: false
}))

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
        res.render("rest/index.ejs", {rests})
    })
})

// New
app.get("/restaurants/new", (req,res) => {
    res.render("rest/new.ejs")
})

// Destroy
app.delete("/restaurants/:id", (req,res) => {
    const id = req.params.id
    Rest.findByIdAndRemove(id, (err,rest) => {
        res.redirect("/restaurants")
    })
})

// Update
app.put("/restaurants/:id", (req,res) => {
    const id = req.params.id
    Rest.findByIdAndUpdate(id, req.body, {new: true}, (err,rest) => {
        res.redirect("/restaurants")
    })
})

// Create
app.post("/restaurants", (req,res) => {
    Rest.create(req.body, (err,rest) => {
        res.redirect("/restaurants")
    })
})

// Edit
app.get("/restaurants/:id/edit", (req,res) => {
    const id = req.params.id
    Rest.findById(id, (err,rest) => {
        res.render("rest/edit.ejs", {rest})
    })
})

// Show
app.get("/restaurants/:id", (req,res) => {
    const id = req.params.id
    Rest.findById(id,(err,rest) => {
        res.render("rest/show.ejs", {rest})
    })
})

////////////////////////////////////////
// LISTENER
////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))