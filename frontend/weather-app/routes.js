const express = require('express')
const router = express.Router()
const getCityName = require('./modules/getCityName')
const getWeather = require('./modules/getWeather')
const getTime = require('./modules/getTime')

router.get('/', function(req, res, next) {
  res.render('index')
})

router.post('/', function(req, res, next) {
  let lat = req.body.lat
  let long = req.body.long

  Promise.all([getCityName(lat, long), getWeather(lat, long)]).then(values => {
    console.log(values)
    let locationInfo = {}
    let timeNow = getTime()
    locationInfo.time = timeNow
    locationInfo.cityName = values[0]
    locationInfo['temp'] = values[1].temp
    locationInfo.humidity = values[1].humidity
    locationInfo.icon = values[1].icon
    locationInfo.summary = values[1].summary
    locationInfo.forecast = values[1].forecast
    res.json(locationInfo)
  })
})

module.exports = router
