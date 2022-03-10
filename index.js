const express = require('express')
const app = express()
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const multer = require('multer')
const PORT = 3001

const {test}  = require('./utils/db')


require('dotenv').config();

// ----------------------------------- Mongodb
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blok-tech.xaela.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

console.log(test)
test(client)

// ----------------------------------- render pages

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("matches");
});



// alle dieren die in array staan in console weergeven
test(client).then(data => { console.log(data)})


//-------------------------------------------------------------------------------------- naar database

// middleware om omtegaan met incoming data in de body van een request. In dit geval POST
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// async geeft aan dat dit een funcite is waarin dingen langer duren, zoals data uit een database halen
// res.render() wordt gebruikt om een view te renderen en verstuurd de gerenderde HTML naar de client. 
// duurt wat langer nog even wachten...
app.get("/", async(req, res) => {

  // data uit de database wat in een array is gestopt wordt nu in de constante dieren gezet.
  const gebruikers = await test(client); 

  // ophalen gebruikers database
  res.render("matches", {
    
    gebruikers: gebruikers
  });
});


app.post("/formulier", async(req, res) => {

  const gebruikers = await test(client); 

  console.log(req.body);
  // filter gebruikers
  const filterGebruikers = gebruikers.filter((gebruikers) => {
    // stop het item alleen in de array wanneer onderstaande regel 'true' is
    return gebruikers.Intresse == req.body.Intresse;
  });
  //render same page with filtered animals
  res.render("matches", {
    gebruikers: filterGebruikers
  });
});

// ----------------------------------- routes maken
app.get('/about', onabout)
app.get('/login', onlogin)
app.get('*', notfound)


function onabout(req, res) {
  res.send('<h1>Hier vind je alles about me!</h1>')
}

function onlogin(req, res) {
  res.send('<h1>Op deze pagina kun je inloggen</h1>')
}

function notfound(req, res) {
  res.send('<h1>404 - Not Found!</h1>')
}

// Geeft aan dat de app draait op de poort 8000
app.listen(PORT, function () {
  console.log('listening to port: ', PORT)
})
