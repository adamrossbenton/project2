////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")

////////////////////////////////////////////////
// Connection
////////////////////////////////////////////////
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

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = mongoose