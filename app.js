// Model
const turn = {
  player: 'X',
  numPlays: 0,
  toggle: () => turn.player = turn.player === 'X' ? 'O' : 'X'
};

const boardState = {};
for (let i = 1; i < 10; i++) {
  boardState[i] = '';
}

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

const checkForWinner = (lastPlay) => {
  if (turn.numPlays < 5) {
    return false;
  } else {
    return checkHorizontalWin(lastPlay) || checkVerticalWin(lastPlay) || checkDiagonalWin(lastPlay);
  }
  console.log('tie game');
}

// Controller (Event Handlers)
const updateGameState = (e) => {
  // need to find a better way to get value of box
  let space = e.target.innerText
  console.log(e.target.getAttribute('value'));
  if (boardState[space] === '') {
    updateBoard(e, space);
    if(checkForWinner(space)){
      document.removeEventListener('click', checkBoardClick);
      console.log(`${turn.player} wins!`);
    }
    changePlayer();
  } else {
    window.alert('That space is already occupied. Please choose another.');
  }
}

// View (Event Listeners)
document.addEventListener('click', checkBoardClick);
