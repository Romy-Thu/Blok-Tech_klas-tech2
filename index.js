// console.log("Hallo mensen")

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express')
const app = express()

app.use('/static', express.static('static'))
app.set('view engine', 'hier mijn templating')
app.set('views', 'view')

app.get('/', onhome)
app.get('/about', onabout)
app.get('/login', onlogin)

.listen(8000)

function onhome(req, res) {
  res.send('<h1>Home Page</h1>')
}

function onabout(req, res) {
  res.send('<h1>about me</h1>')
}

function onlogin(req, res) {
  res.send('<h1>login</h1>')
}

app.use((req, res, next) => {
  res.status(404).send('jammerdan')
})

