// Model
const OPTIONS = ['X', 'O'];
let playerTurn = 'X';
let turn = 0;

const changePlayer = () => {
  playerTurn = playerTurn === 'X' ? 'O' : 'X';
}

// Controller (Event Handlers)
const displaySymbol = (e) => {
  if (!OPTIONS.includes(e.target.innerText)) {
    e.target.innerText = playerTurn;
    changePlayer(playerTurn);
  }
}

// View (Event Listeners)
document.addEventListener('click', (e) => {
  if (e.target.matches('.box')) {
    displaySymbol(e);
  }
});
