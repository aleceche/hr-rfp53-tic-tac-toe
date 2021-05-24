// Model
// Selectors for board, spaces, and scores
const reset = document.querySelector('#reset');
const spaces = document.querySelectorAll('.box');
const xScore = document.querySelector('#x-score');
const oScore = document.querySelector('#o-score');
const xName = document.querySelector('#x-name');
const oName = document.querySelector('#o-name');
const player = document.querySelector('#player');

// Game state parameters
const turn = {
  player: 'X',
  numPlays: 0,
  playerOneScore: 0,
  playerTwoScore: 0,
  toggle: () => turn.player = turn.player === 'X' ? 'O' : 'X',
  winner: null
};

const boardState = {};
for (let i = 1; i < 10; i++) {
  boardState[i] = null;
}

// Helper functions for updating board
const checkBoardClick = (e) => {
  if (e.target.matches('.box')) {
    updateGameState(e);
  }
}

const updateBoard = (e, space) => {
  boardState[space] = turn.player;
  e.target.innerText = turn.player;
  turn.numPlays++;
}

const changePlayer = () => {
  turn.toggle();
}

const updateMessage = () => {
  if (turn.winner) {
    message.innerHTML = `Game Over. ${turn.winner === 'X' ? playerOne : playerTwo} wins!`;
  } else if (turn.numPlays === 9) {
    message.innerHTML = 'Game Over. It\'s a tie.';
  } else {
    player.innerText = turn.player === 'X' ? playerOne : playerTwo;
  }
}

// could probably combine these?
checkHorizontalWin = (lastPlay) => {
  let matches = 0;
  let rowPlayed = Math.floor((lastPlay - 1) / 3);
  for (let key in boardState) {
    if (Math.floor((key - 1) / 3) === rowPlayed) {
      matches += boardState[key] === turn.player ? 1 : 0;
    }
  }
  return matches === 3;
}

checkVerticalWin = (lastPlay) => {
  let matches = 0;
  let colPlayed = lastPlay % 3;
  for (let key in boardState) {
    if (key % 3 === colPlayed) {
      matches += boardState[key] === turn.player ? 1 : 0;
    }
  }
  return matches === 3;
}

checkDiagonalWin = (lastPlay) => {
  return ((boardState[1] === boardState[5] && boardState[1] === boardState[9]) ||
          (boardState[3] === boardState[5] && boardState[3] === boardState[7]));
}

const isWinner = (lastPlay) => {
  if (turn.numPlays < 5) {
    return null;
  } else {
    let winningMove = checkHorizontalWin(lastPlay) || checkVerticalWin(lastPlay) || checkDiagonalWin(lastPlay);
    return winningMove ? turn.player : null;
  }
}

const endGame = () => {
  document.removeEventListener('click', checkBoardClick);
  reset.innerText = 'Play Again!'
  if (turn.winner) {
    turn.start = turn.player;
    if (turn.winner === 'X') {
      turn.playerOneScore += 1;
      xScore.innerText = turn.playerOneScore;
    } else {
      turn.playerTwoScore += 1;
      oScore.innerText = turn.playerTwoScore;
    }
  } else {
    changePlayer()
    turn.start = turn.player;
  }
}
//

// Controller (Event Handlers)
const updateGameState = (e) => {
  let space = e.target.getAttribute('value');
  if (!boardState[space]) {
    updateBoard(e, space);
    turn.winner = isWinner(space)
    if(turn.winner || turn.numPlays === 9){
      endGame();
    }
    changePlayer();
    updateMessage();
  } else {
    window.alert('That space is already occupied. Please choose another.');
  }
}

const resetGameState = () => {
  turn.player = turn.start;
  turn.numPlays = 0;
  for (let key in boardState) {
    boardState[key] = null;
  }
  spaces.forEach(space => space.innerText = '');
  document.addEventListener('click', checkBoardClick);
  reset.innerText = 'Reset Game';
  message.innerHTML = `<span id='player'>${turn.start === 'X' ? playerOne : playerTwo}</span>'s turn. Choose a space.`;
}

// View (Event Listeners and player names)
window.addEventListener('DOMContentLoaded', (e) => {
  document.addEventListener('click', checkBoardClick);
  reset.addEventListener('click', resetGameState);
})

// Get and Set PlayerNames
const playerOne = window.prompt('Player One (X), Please Enter Your Name: ') || 'X';
const playerTwo = window.prompt('Player Two (O), Please Enter Your Name: ') || 'O';
xName.innerText = playerOne;
oName.innerText = playerTwo;
player.innerText = playerOne;