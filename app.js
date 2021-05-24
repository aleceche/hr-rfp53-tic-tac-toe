// Model
// Selectors for board and spaces
const reset = document.querySelector('#reset');
const spaces = document.querySelectorAll('.box');

// Game state parameters
const turn = {
  player: 'X',
  numPlays: 0,
  toggle: () => turn.player = turn.player === 'X' ? 'O' : 'X'
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

const endGame = (winner) => {
  document.removeEventListener('click', checkBoardClick);
  if (winner) {
    console.log(`${turn.player} wins!`);
  } else {
    console.log('It\'s a tie!');
  }
}
//

// Controller (Event Handlers)
const updateGameState = (e) => {
  let space = e.target.getAttribute('value');
  if (!boardState[space]) {
    updateBoard(e, space);
    let winner = isWinner(space)
    if(winner || turn.numPlays === 9){
      endGame(winner);
    }
    changePlayer();
  } else {
    window.alert('That space is already occupied. Please choose another.');
  }
}

const resetGameState = () => {
  turn.player = 'X';
  turn.numPlays = 0;
  for (let key in boardState) {
    boardState[key] = null;
  }
  spaces.forEach(space => space.innerText = '');
  document.addEventListener('click', checkBoardClick);
}

// View (Event Listeners)
document.addEventListener('click', checkBoardClick);
reset.addEventListener('click', resetGameState);

