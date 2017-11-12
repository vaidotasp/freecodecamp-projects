document.addEventListener('DOMContentLoaded', function() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  let playerHuman
  let playerAI
  let turnOwner
  let currentState = ['', '', '', '', '', '', '', '', '']

  function checkForDraw(currentState) {
    let moves = []
    for (let i = 0; i < currentState.length; i++) {
      if (currentState[i] !== 'X' && currentState[i] !== 'O') {
        moves.push(i)
      }
    }
    if (
      moves.length === 0 &&
      !winState(currentState, winConditions, turnOwner)
    ) {
      console.log('ITS A DRAW')
      let el = (document.getElementById('reset').value = "It's a Draw!")
      resetGame()
    } else {
      console.log('NO DRAW :(')
    }
  }

  // function that checks if winning condition has been met
  function winState(currentState, winConditions, turnOwner) {
    for (let i = 0; i < winConditions.length; i++) {
      if (
        currentState[winConditions[i][0]] === 'X' &&
        currentState[winConditions[i][1]] === 'X' &&
        currentState[winConditions[i][2]] === 'X'
      ) {
        if (turnOwner === 'Human') {
          let el = (document.getElementById('reset').value = 'Human Wins!')
        } else {
          let el = (document.getElementById('reset').value = 'Computer Wins!')
        }
        keys.forEach(key => key.removeEventListener('click', action))
        console.log('Winstate reached')
        resetGame()
        return true
      } else if (
        currentState[winConditions[i][0]] === 'O' &&
        currentState[winConditions[i][1]] === 'O' &&
        currentState[winConditions[i][2]] === 'O'
      ) {
        if (turnOwner === 'Human') {
          let el = (document.getElementById('reset').value = 'Human Wins!')
        } else {
          let el = (document.getElementById('reset').value = 'Computer Wins!')
        }
        keys.forEach(key => key.removeEventListener('click', action))
        console.log('Winstate reached')
        resetGame()
        return true
      } else {
      }
    }
    return false
  }

  const keys = Array.from(document.querySelectorAll('.key'))
  keys.forEach(key => key.addEventListener('click', action))

  function action(e) {
    if (turnOwner === 'Human') {
      if (currentState[Number(e.target.dataset.position)] === '') {
        currentState[Number(e.target.dataset.position)] = playerHuman
        e.target.innerHTML = playerHuman
        if (winState(currentState, winConditions, turnOwner)) {
          winState(currentState, winConditions, turnOwner)
        } else {
          turnOwner = 'Computer'
          init()
        }
      }
    }
  }

  function init() {
    function getMoves(currentState) {
      //finds available moves left
      let availMoves = []
      for (let i = 0; i < currentState.length; i++) {
        if (currentState[i] === '') {
          availMoves.push(i)
        }
      }
      return availMoves
    }

    function getRandom() {
      // gives random move from available move
      let availMoves = getMoves(currentState)
      let random = Math.floor(Math.random() * availMoves.length)
      return availMoves[random]
    }
    let move = getRandom()
    currentState[move] = playerAI
    let activeDiv = document.querySelector(
      '[' + 'data-position="' + move + '"' + ']'
    )
    activeDiv.innerHTML = playerAI
    winState(currentState, winConditions, turnOwner)
    turnOwner = 'Human'
    checkForDraw(currentState)
  }

  const buttonX = document.getElementById('x')
  buttonX.addEventListener('click', tokenX)
  const buttonO = document.getElementById('o')
  buttonO.addEventListener('click', tokenO)

  function tokenX() {
    document.querySelector('.box').style.visibility = 'hidden'
    playerHuman = 'X'
    playerAI = 'O'
    turnOwner = 'Human'
  }

  function tokenO() {
    document.querySelector('.box').style.visibility = 'hidden'
    playerHuman = 'O'
    playerAI = 'X'
    turnOwner = 'Computer'
    init()
  }

  function resetGame() {
    let timeout = window.setTimeout(slowReset, 2500)
    function slowReset() {
      currentState = ['', '', '', '', '', '', '', '', '']
      playerHuman = null
      playerAI = null
      turnOwner = null
      const keys = Array.from(document.querySelectorAll('.key'))
      keys.forEach(key => (key.innerHTML = ''))
      keys.forEach(key => key.addEventListener('click', action))
      document.querySelector('.box').style.visibility = 'visible'
      let el = (document.getElementById('reset').value = 'Reset Game')
    }
  }
})
