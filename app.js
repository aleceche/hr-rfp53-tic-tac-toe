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

const updateBoard = (e) => {
  boardState[e.target.innerText] = turn.player;
  e.target.innerText = turn.player;
  turn.numPlays++;
}

const changePlayer = () => {
  turn.toggle();
}

const checkForWinner = () => {
  if (turn.numPlays < 5) {
    return;
  }
  // logic to check for victor

  // catch case where we have made it to end of game with tie
  turn.numPlays === 9 ? console.log('tie game') : console.log('still playing');
  // display tie
  // reset game
}

// Controller (Event Handlers)
const updateGameState = (e) => {
  // need to find a better way to get value of box
  if (boardState[e.target.innerText] === '') {
    updateBoard(e);
    changePlayer();
    checkForWinner();
  } else {
    window.alert('That space is already occupied. Please choose another.');
  }
}

// View (Event Listeners)
document.addEventListener('click', (e) => {
  if (e.target.matches('.box')) {
    updateGameState(e);
  }
});
