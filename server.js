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
const User = require("./models/user")

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

////////////////////////////////////////
// LISTENER
////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))