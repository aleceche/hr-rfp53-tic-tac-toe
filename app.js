// Model
let playerTurn = 'X';
let box = document.getElementsByClassName('box');

const changePlayer = () => {
  playerTurn = playerTurn === 'X' ? 'O' : 'X';
  console.log(playerTurn)
;}
console.log(box);
console.log(playerTurn);

// Controller (Event Handlers)
const displaySymbol = (e) => {
  if (!e.target.innerText.length) {
    e.target.innerText = playerTurn;
    changePlayer(playerTurn);
  }
}

// View (Event Listeners)
box.addEventListener('click', displaySymbol);
