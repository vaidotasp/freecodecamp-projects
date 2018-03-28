let locator = new Promise(function(resolve, reject) {
  navigator.geolocation.getCurrentPosition(success, error);
  function error(position) {
    console.log('Location unavailable');
    reject(error);
  }
  function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    resolve({ lat: lat, long: long });
  }
});

locator.then(({ lat, long }) => {
  function status(response) {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  function json(response) {
    return response.json();
  }

  let content = {
    lat: lat,
    long: long
  };

  fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  })
    .then(status)
    .then(json)
    .then(function(data) {
      let temperature = data.temp;
      temperature = temperature.toFixed() + '°C';
      document.getElementById('temp').innerHTML = temperature;
      document.getElementById('description').innerHTML = data.summary;
      document.getElementById('forecast').innerHTML = data.forecast;
      document.getElementById('time').innerHTML = data.time;
      document.getElementById('location').innerHTML = data.cityName;
      weatherIcon(data.icon);
    })
    .catch(function(error) {
      console.log('request failed: ', error);
    });
});

function weatherIcon(icon) {
  switch (icon) {
    case 'clear-day' || 'clear-night':
      document.getElementById('img').src = 'img/clear.png';
      break;
    case 'cloudy' || 'partly-cloudy-day' || 'partly-cloudy-night':
      document.getElementById('img').src = 'img/cloudy.png';
      break;
    case 'rain':
      document.getElementById('img').src = 'img/drizzle.png';
      break;
    case 'snow' || 'sleet':
      document.getElementById('img').src = 'img/snow.png';
      break;
    case 'Thunderstorm':
      document.getElementById('img').src = 'img/storm.png';
      break;
    default:
      document.getElementById('img').src = 'img/cloudy.png';
      break;
  }
}
