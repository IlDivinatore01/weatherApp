const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const app = express();

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    let locDate = { temp: "Temp", desc: "Discription", location: "Location", humidity: "Humidity ", feel: "Feel ", speed: "Speed" };
    res.render("index", { locDate: locDate,});
});

app.post("/", async (req, res) => {
    try {
        const location = await req.body.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        let locDate = {};
        locDate.temp = Math.floor(data.main.temp);
        locDate.desc = data.weather[0].description;
        locDate.feel = data.main.feels_like;
        locDate.humidity = data.main.humidity;
        locDate.speed = data.wind.speed;
        locDate.location = location;
        console.log(locDate);
        res.render("index", { locDate: locDate,});
    } catch (err) {
        console.log(err);
        res.status(400).json({ data: 'not found!' })
    }
}); 

const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
};
    
https.createServer(options, app)
.listen(PORT, function (req, res) {
    console.log("Server started at port %d", PORT);
}); 