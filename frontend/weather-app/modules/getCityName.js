//Helper function to grab city name from Long/Lat input using Google API
require('dotenv').config()
const rp = require('request-promise')
const apiKey = process.env.API
const request = require('request')
let getCityName = function(lat, long) {
  return new Promise(function(resolve, reject) {
    let cityName
    let geoURL =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      lat +
      ',' +
      long +
      '&key=' +
      apiKey
    rp.get(geoURL, function(error, response, body) {
      if (error) {
        console.log('GET error: ', error)
        console.err(error)
        reject(error)
      }
      if (response.statusCode === 200) {
        let results = JSON.parse(body)
        results.results.forEach(function(item) {
          if (item.types[0] === 'locality' && item.types[1] === 'political') {
            cityName = item['formatted_address']
          } else if (
            item.types[0] === 'administrative_area_level_1' &&
            item.types[1] === 'political'
          ) {
            cityName = item['formatted_address']
          }
        })
        resolve(cityName)
      } else {
        console.log('Error')
      }
    })
  })
}

module.exports = getCityName
