const express = require("express");
const port = 8000;
const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Ca marche ! ${port}`);
});

const hotels = [
    {
        "id": 1,
        "name": "Imperial Hotel",
        "address": "84 av des Champs-Élysées",
        "city": "Paris",
        "country": "France",
        "stars": 5,
        "hasSpa": true,
        "hasPool": true,
        "priceCategory": 3
    },
    {
        "id": 2,
        "name": "The Queen",
        "address": "3 Darwin Street",
        "city": "London",
        "country": "England",
        "stars": 4,
        "hasSpa": true,
        "hasPool": false,
        "priceCategory": 3
    },
    {
        "id": 3,
        "name": "Kiwi land",
        "address": "4587 George St.",
        "city": "Auckland",
        "country": "New-Zealand",
        "stars": 3,
        "hasSpa": false,
        "hasPool": true,
        "priceCategory": 2
    }
];

const restaurants = [
    {
        "id": 1,
        "name": "Les trois Mousquetaires",
        "address": "22 av des Champs-Élysées",
        "city": "Paris",
        "country": "France",
        "stars": 4,
        "cuisine": "french",
        "priceCategory": 3
    },
    {
        "id": 2,
        "name": "The Fat Guy",
        "address": "47 Jackson Boulevard",
        "city": "New York",
        "country": "US",
        "stars": 5,
        "cuisine": "burger",
        "priceCategory": 1
    },
    {
        "id": 3,
        "name": "Veggies",
        "address": "77 Avenir Street",
        "city": "Sydney",
        "country": "Australia",
        "stars": 5,
        "cuisine": "vegan",
        "priceCategory": 2
    }
];

app.get("/hotels", (req, res) => {
    res.json({
        status: "Ok",
        data: hotels
    });
});

app.get("/hotels/:id", (req, res) => {
    const hotel = hotels.filter(hotel => parseInt(hotel.id) === parseInt(req.params.id));
    res.send(hotel);
});

app.post("/hotels", (req, res) => {
    const newHotel = req.body;
    newHotel.id = parseInt(hotels.length + 1)
    hotels.push(newHotel);
    res.json({
        data: hotels
    });
});

app.put("/hotels/:id?name=newName", (req, res) => {
    
})