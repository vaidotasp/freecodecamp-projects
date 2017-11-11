const moment = require('moment')
moment().format()

//current time in string format: Wednesday, 18:00
let getTime = function() {
  let now = moment()
  now = now.format('dddd, HH:mm')
  return now
}

module.exports = getTime
