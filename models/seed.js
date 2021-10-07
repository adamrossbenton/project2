////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const mongoose = require("./connection")
const Rest = require("./rest")

////////////////////////////////////////////////
// Seed
////////////////////////////////////////////////
mongoose.connection.on("open", () => {
    const startRest = [
        {restName: "Bangrak Market", restCity: "Seattle", restCuisine: "Thai", restOpenHours: "opentoclose", restHappsHours: "5 to 7", restHappsDeals: "lots", restCreator: "me", restRating: 1},
        {restName: "Taqueria Cantina", restCity: "Seattle", restCuisine: "Mexican", restOpenHours: "open to close", restHappsHours: "3 to 6", restHappsDeals: "all kinds", restCreator: "also me", restRating: 10},
        {restName: "Cyclops", restCity: "Seattle", restCuisine: "American", restOpenHours: "open to close", restHappsHours: "6 to 9", restHappsDeals: "a good amount", restCreator: "still me", restRating: 11},
        {restName: "MOONTREE", restCity: "Seattle", restCuisine: "Sushi/Japanese", restOpenHours: "open to close", restHappsHours: "8 to close", restHappsDeals: "a handful", restCreator: "not me (jk lol)", restRating: 100},
    ]

    Rest.deleteMany({}, (err,data) => {
        Rest.create(startRest, (err,data) => {
            res.json(data)
            mongoose.connection.close()
        })
    })
})
