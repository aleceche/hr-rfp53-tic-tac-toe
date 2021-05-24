// Model
let playerTurn = 'X';
// let box = document.getElementsByClassName('box');

const changePlayer = () => {
  playerTurn = playerTurn === 'X' ? 'O' : 'X';
  console.log(playerTurn)
;}
// console.log(box);
console.log(playerTurn);

// Controller (Event Handlers)
const displaySymbol = (e) => {
  const OPTIONS = ['X', 'Y'];
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
