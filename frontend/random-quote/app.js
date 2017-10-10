function fetchData(data) {
  document.getElementById('author').innerHTML = data.quoteAuthor
  document.getElementById('text').innerHTML = data.quoteText
  document
    .getElementById('tweet')
    .setAttribute('href', 'http://www.twitter.com/home/?status=' + 'OKAY')
}

const newBtn = document.getElementById('new')
newBtn.addEventListener('click', initial)

//ref functions
function initial() {
  const apiURL =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=fetchData'
  const script = document.createElement('script')
  script.src = apiURL
  document.head.appendChild(script)
}

let twtBtn = document.getElementById('tweet')
twtBtn.addEventListener('click', tweet)

function tweet() {
  let texttoTweet =
    document.getElementById('text').innerHTML +
    '-' +
    document.getElementById('author').innerHTML
  console.log(texttoTweet)
  if (texttoTweet.length > 140) {
    texttoTweet = texttoTweet.slice(0, 120) + '...'
    let twtLink =
      'http://twitter.com/home?status=' + encodeURIComponent(texttoTweet)
    window.open(twtLink, '_blank')
  } else {
    let twtLink =
      'http://twitter.com/home?status=' + encodeURIComponent(texttoTweet)
    window.open(twtLink, '_blank')
  }
}

initial()
