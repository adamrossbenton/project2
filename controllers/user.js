////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

////////////////////////////////////////////////
// Create Route
////////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////

// Signup
router.get("/signup", (req,res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req,res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    User.create(req.body, (err,user) => {
        res.redirect("/restaurants")
    })
})

// Login
router.get("/login", (req,res) => {
    res.render("/user/login.ejs")
})

router.post("/login", (req,res) => {
    const {username, password} = req.body
    User.findOne({username}, (err, user) => {
        if (!user) {
            res.send("User does not exist")
        } else {
            const result = bcrypt.compareSync(password, user.password)
            if (result) {
                req.session.loggedIn = true
                req.session.username = username
                res.redirect("/restaurants")
            } else {
                res.send("Incorrect password")
            }
        }
    })
})

// Logout
router.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = router