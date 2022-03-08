const express = require('express')
const app = express()
const PORT = 3001
const {test}  = require('./utils/db')


require('dotenv').config();

// ----------------------------------- Mongodb
const { MongoClient } = require('mongodb');

// 
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blok-tech.xaela.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(test)
test(client)

// ----------------------------------- render pages

const exphbs = require("express-handlebars");
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


// ----------------------------------- routes maken

app.use('/static', express.static('static'))

app.get('/', onhome)
app.get('/about', onabout)
app.get('/login', onlogin)
app.get('*', notfound)

function onhome(req, res) {
  res.send('<h1>Dit is de homepagina!</h1>')
}

function onabout(req, res) {
  res.send('<h1>About!</h1>')
}

function onlogin(req, res) {
  res.send('<h1>Op deze pagina kun je inloggen</h1>')
}

function notfound(req, res) {
  res.send('<h1>404 - Not Found!</h1>')
}

app.listen(PORT, function () {
  console.log('listening to port: ', PORT)
})
