document.addEventListener('DOMContentLoaded', function() {
  //master control handlers
  const startBtn = document.getElementById('start')
  const resetBtn = document.getElementById('reset')
  const pauseBtn = document.getElementById('pause')
  startBtn.addEventListener('click', start)
  resetBtn.addEventListener('click', reset)
  pauseBtn.addEventListener('click', pause)
  //session length control handlers
  const sessionUpBtn = document.getElementById('sessionUpBtn')
  const sessionDownBtn = document.getElementById('sessionDownBtn')
  const breakUpBtn = document.getElementById('breakUpBtn')
  const breakDownBtn = document.getElementById('breakDownBtn')
  sessionUpBtn.addEventListener('click', addSVal)
  sessionDownBtn.addEventListener('click', remSVal)
  breakUpBtn.addEventListener('click', addBVal)
  breakDownBtn.addEventListener('click', remBVal)

  let sessionValue = document.querySelectorAll('#session span')[0]
  let breakValue = document.querySelectorAll('#break span')[0]
  let timeID = document.getElementById('time')
  let breakID = document.getElementById('breakVal')
  let timeInt // counter time in seconds
  let breakInt
  let pauseButton = document.getElementById('pauseBtn')
  let buzzer = new Audio('timer.wav')

  function breakStart() {
    breakTimer = window.setInterval(breakCountDown, 1000)
    breakInt = Math.floor(breakID.innerHTML) * 60
  }

  function breakCountDown() {
    breakInt = breakInt - 1
    displayBreak()
    if (breakInt === 0) {
      window.clearInterval(breakTimer)
      buzzer.play()
      display()
    }
  }

  function countDown() {
    timeInt = timeInt - 1
    display()
    if (timeInt === 0) {
      window.clearInterval(timer)
      buzzer.play()
      breakStart()
    }
  }

  function display() {
    //logic to add '0' before single digit increments
    if (timeInt % 60 < 10 && timeInt / 60 < 10) {
      timeID.innerHTML =
        '0' + Math.floor(timeInt / 60) + ':' + '0' + timeInt % 60
    } else if (timeInt / 60 < 10 && timeInt % 60 >= 10) {
      timeID.innerHTML = '0' + Math.floor(timeInt / 60) + ':' + timeInt % 60
    } else if (timeInt % 60 < 10) {
      timeID.innerHTML = Math.floor(timeInt / 60) + ':' + '0' + timeInt % 60
    } else {
      timeID.innerHTML = Math.floor(timeInt / 60) + ':' + timeInt % 60
    }
  }

  function displayBreak() {
    timeID.innerHTML = Math.floor(breakInt / 60) + ':' + breakInt % 60
  }

  function start() {
    timeInt = time.innerHTML.split(':')
    timeInt = (Math.floor(timeInt[0]) + Math.floor(timeInt[1])) * 60
    timer = window.setInterval(countDown, 1000)

    startBtn.removeEventListener('click', start)
    pauseButton.setAttribute('value', 'off')
    pauseButton.innerHTML = 'PAUSE'
    pauseBtn.addEventListener('click', pause)
  }

  function pause() {
    if (pauseButton.getAttribute('value') === 'off') {
      window.clearInterval(timer)
      pauseButton.setAttribute('value', 'on')
      pauseButton.innerHTML = 'RESUME'
    } else {
      timer = window.setInterval(countDown, 1000)
      pauseButton.setAttribute('value', 'off')
      pauseButton.innerHTML = 'PAUSE'
    }
  }

  function reset() {
    window.clearInterval(timer)
    pauseButton.setAttribute('value', 'off')
    pauseButton.innerHTML = 'PAUSE'
    timeID.innerHTML = sessionValue.innerHTML + ':00'
    startBtn.addEventListener('click', start)
    pauseBtn.removeEventListener('click', pause)
  }

  function addSVal() {
    sessionValue.innerHTML = eval(sessionValue.innerHTML + '+ 1')
    timeID.innerHTML = sessionValue.innerHTML + ':00'
  }

  function remSVal() {
    sessionValue.innerHTML = eval(sessionValue.innerHTML + '- 1')
    timeID.innerHTML = sessionValue.innerHTML + ':00'
  }

  function addBVal() {
    breakValue.innerHTML = eval(breakValue.innerHTML + '+ 1')
  }

  function remBVal() {
    breakValue.innerHTML = eval(breakValue.innerHTML + '- 1')
  }
})
