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
        {restName: "Bangrak Market", restCity: "Seattle", restCuisine: "Thai", restOpenHours: "opentoclose", restHappsHours: "5 to 7", restHappsDeals: "lots", restCreator: "me", restRating: 1, restImgUrl: "https://infatuation.imgix.net/media/images/reviews/bangrak-market/banners/1562106564.39.jpg?auto=format&fit=max&h=1200&w=3200"},
        {restName: "Taqueria Cantina", restCity: "Seattle", restCuisine: "Mexican", restOpenHours: "open to close", restHappsHours: "3 to 6", restHappsDeals: "all kinds", restCreator: "also me", restRating: 10, restImgUrl: "https://lh3.googleusercontent.com/I2GN7aNJN1VrbLyw1dEjw4rI2jzy8Ob2rFYanz9PVjJyuOe2An1UyyWgJUCi2JPPcBoU1q33AIInadEzzrC_X7o=s1400"},
        {restName: "Cyclops", restCity: "Seattle", restCuisine: "American", restOpenHours: "open to close", restHappsHours: "6 to 9", restHappsDeals: "a good amount", restCreator: "still me", restRating: 11, restImgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfW4kdP6KiEmlVCuHzQHHgJslsIvYef2B0jA&usqp=CAU"},
        {restName: "MOONTREE", restCity: "Seattle", restCuisine: "Sushi/Japanese", restOpenHours: "open to close", restHappsHours: "8 to close", restHappsDeals: "a handful", restCreator: "not me (jk lol)", restRating: 100, restImgUrl: "https://moontreeseattle.com/wp-content/uploads/2020/09/b-2-1-1630x752.jpg"},
    ]

    Rest.deleteMany({}, (err,data) => {
        Rest.create(startRest, (err,data) => {
            console.log("----------RESTAURANTS CREATED----------")
            console.log(data)
            console.log("----------RESTAURANTS CREATED----------")
            mongoose.connection.close()
        })
    })
})
