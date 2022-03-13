const express = require('express')
const app = express()
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const multer = require('multer')
const PORT = process.env.PORT || 3000

const {test}  = require('./utils/db')


require('dotenv').config();

// ----------------------------------- Mongodb
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blok-tech.xaela.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.set('views', './Views');

// alle dieren die in array staan in console weergeven
test(client).then(data => { console.log(data)})

// om images en css te serven in directory "static"
app.use('/static', express.static('static'));

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

  // data uit de database wat in een array is gestopt wordt nu in de constante gebruikers gezet.
  const gebruikers = await test(client); 

  console.log(gebruikers)


  // ophalen gebruikers database
  res.render("matches", {
    gebruikers: gebruikers
  });
});


app.post("/formulier", async(req, res) => {

  const gebruikers = await test(client); 
  const inputIntresse = req.body.Intresse;
  const inputLeeftijd = req.body.Leeftijd;
  
  // console.log(inputIntresse);
  console.log(inputLeeftijd);
  let tempArray = [];

  gebruikers.forEach(object => {
    if(object.Intresse == inputIntresse && object.Leeftijd == inputLeeftijd) {
    tempArray.push(object);
    }

  });


  // delete uit de database

  app.post("/delete", async (req, res) => {

    await client.connect()
  
    console.log(req.body)
    console.log(req.body.match)
  
    client.db('userdb').collection('users').deleteOne({ naam: req.body.match }).then(LoreHarvet => {
      console.log(LoreHarvet);
    })
  
    res.redirect('/')
  
  });  

  //render same page with filter gebruikers
  res.render("matches", {
    gebruikers: tempArray
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
