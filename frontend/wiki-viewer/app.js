window.onload = function() {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&continue=gsroffset%7C%7C&generator=search&formatversion=2&exsentences=2&exlimit=11&exintro=1&explaintext=1 &gsrnamespace=0&gsrlimit=10&gsrprop=snippet&gsrsearch='
  let newUrl
  let contentDiv = document.getElementById('results-container')

  function getResults() {
    const request = new XMLHttpRequest()
    request.open('GET', newUrl, true)
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        //Successful HTTP request, parse data
        let result = JSON.parse(request.responseText)
        let resultArray = result['query']['pages']

        for (let i = 0; i < resultArray.length; i++) {
          let pageid = resultArray[i]['pageid']
          let title = resultArray[i]['title']
          let extract = resultArray[i]['extract']
          let currentElement = document.getElementById('single-' + (i + 1))
          currentElement.innerHTML =
            '<h3>' + title + '</h3>' + '<p>' + extract + '</p>'
          currentElement.parentElement.href =
            'http://en.wikipedia.org/?curid=' + pageid
        }
        // Show Results switch after ajax request
        let showResults = document.getElementById('results-container')
        showResults.style.visibility = 'visible'
      } else {
        console.log('Server reached, returned error')
      }
    }
    request.onerror = function() {
      console.log('error')
    }
    request.send()
  }

  //event listener for 'Enter' keypress
  let searchValue = document.getElementById('search').value
  addEventListener('keydown', function enterPressed(event) {
    if (event.keyCode === 13) {
      searchValue = document.getElementById('search').value
      newUrl = url + searchValue
      getResults()
    }
  })
  //event listener for search button click
  let button = document.getElementById('button')
  button.addEventListener('click', function buttonPressed() {
    searchValue = document.getElementById('search').value
    newUrl = url + searchValue
    getResults()
  })
}
