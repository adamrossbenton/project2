////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const express = require("express")
const Rest = require("../models/rest")

////////////////////////////////////////////////
// Create Route
////////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////////
// Router Middleware
////////////////////////////////////////////////

// Auth Middleware
// I don't think I want this, maybe just for create?
// router.use((req,res,next) => {
//     if (req.session.loggedIn) {
//         next()
//     } else {
//         res.redirect("/user/login")
//     }
// })


////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////

// Index
router.get("/", (req,res) => {
    Rest.find({}, (err,rests) => {
        res.render("rest/index.ejs", {rests, loggedIn: req.session.loggedIn})
    })
})

// New
router.get("/new", (req,res) => {
    res.render("rest/new.ejs")
})

// Destroy
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Rest.findByIdAndRemove(id, (err,rest) => {
        res.redirect("/restaurants")
    })
})

// Update
router.put("/:id", (req,res) => {
    const id = req.params.id
    Rest.findByIdAndUpdate(id, req.body, {new: true}, (err,rest) => {
        res.redirect("/restaurants")
    })
})

// Create
router.post("/", (req,res) => {
    Rest.create(req.body, (err,rest) => {
        res.redirect("/restaurants")
    })
})

// Edit
router.get("/:id/edit", (req,res) => {
    const id = req.params.id
    Rest.findById(id, (err,rest) => {
        res.render("rest/edit.ejs", {rest})
    })
})

// Show
router.get("/:id", (req,res) => {
    const id = req.params.id
    Rest.findById(id,(err,rest) => {
        res.render("rest/show.ejs", {rest})
    })
})

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = router