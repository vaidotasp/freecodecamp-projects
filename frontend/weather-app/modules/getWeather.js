require('dotenv').config()
const rp = require('request-promise')
const dAPI = process.env.dAPI
let result

let getWeather = function(lat, long) {
  let URI =
    'https://api.darksky.net/forecast/' +
    dAPI +
    '/' +
    lat +
    ',' +
    long +
    '?exclude=daily,minutely,alerts,flags&units=si'

  return new Promise(function(resolve, reject) {
    rp
      .get(URI, function(error, response, body) {
        if (error) reject(error)
      })
      .then(function(result) {
        result = JSON.parse(result)

        let data = {
          temp: result.currently.temperature,
          humidity: result.currently.humidity,
          icon: result.currently.icon,
          summary: result.currently.summary,
          forecast: result.hourly.summary
        }
        resolve(data)
      })
      .catch(err => console.log(err))
  })
}

module.exports = getWeather
