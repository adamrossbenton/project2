////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////

const express = require("express")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const app = express()
const db = mongoose.connection

////////////////////////////////////////
// PORT
////////////////////////////////////////

const PORT = process.env.PORT || 3000;

////////////////////////////////////////
// DATABASE
////////////////////////////////////////

const MONGODB_URI = process.env.MONGODB_URI
db.on("error", (err) => console.log(err.message))
db.on("connected",() => console.log("Connected"))
db.on("disconnected",() => console.log("Disconnected"))

////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride("_method"))

////////////////////////////////////////
// ROUTES
////////////////////////////////////////

app.get("/", (req,res) => {
    res.send("Hello world")
})

////////////////////////////////////////
// LISTENER
////////////////////////////////////////

app.listen(PORT, () => console.log(`Listening on ${PORT}`))