const express = require('express');
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

let superheros =
    [
        {
            name: "Iron Man",
            power: ["money"],
            color: "red",
            isAlive: true,
            age: 46,
            image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
        },
        {
            name: "Thor",
            power: ["electricty", "worthy"],
            color: "blue",
            isAlive: true,
            age: 300,
            image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
        },
        {
            name: "Daredevil",
            power: ["blind"],
            color: "red",
            isAlive: false,
            age: 30,
            image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
        }
    ];

app.use(function debug(req, res, next) {
    console.log("lol");
    next();
});

function transformName(req, res, next) {
    req.body.name = req.body.name.toLowerCase();
    next();
};

app.get("/", (req, res) => {
    res.send("Superheros");
});

app.get("/heroes", (req, res) => {
    res.send(superheros);
});

app.get("/heroes/:name", (req, res) => {
    // for (let hero of superheros) {
    //     if (req.params.name === hero.name) {
    //         console.log(hero);
    //         res.send(hero);
    //     }
    // }
    const hero = superheros.filter(hero => hero.name === req.params.name);
    console.log(hero);
    res.send(hero);
});

app.get("/heroes/:name/power", (req, res) => {
    const hero = superheros.filter(hero => hero.name === req.params.name);
    console.log(hero);
    res.send(hero.power);
});

app.post("/heroes", transformName, (req, res) => {
    const heroInfo = req.body;
    superheros.push(heroInfo);
    console.log(superheros);
    res.json({
        message: "Hero created",
        data: superheros
    });
});

app.patch("/heroes/:name/power", (req, res) => {
    const hero = superheros.filter(hero => hero.name === req.params.name);
    console.log(hero[0].power);
    hero[0].power.push(req.body.power);
    res.json({
        message: "Pouvoir ajouté",
        data: superheros
    });
});