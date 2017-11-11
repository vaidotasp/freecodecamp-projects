require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

const bodyParser = require('body-parser')
const jsonParser = require('body-parser').json

app.set('view engine', 'pug')
app.use(jsonParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/img'))
app.use(routes)

//404 handler is not an error handler, it is the last route
app.use(function(req, res, next) {
  res.status(404).send('Page Not Found')
})

//default error handler. We need to pass err to next() => next(err) for this to trigger
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  res.json({ error: err.message })
})

app.listen(3000 || process.env.PORT)
