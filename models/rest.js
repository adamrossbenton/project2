////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Model
////////////////////////////////////////////////
const {Schema, model} = mongoose

const restSchema = new Schema({
    restName: {type: String, required: true},
    restCity: {type: String, required: true},
    restCuisine: String,
    restOpenHours: String,
    restHappsHours: String,
    restHappsDeals: String,
    restCreator: String,
    restRating: Number,
    restImgUrl: String,
})

const Rest = model("Rest",restSchema)

////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////
module.exports = Rest