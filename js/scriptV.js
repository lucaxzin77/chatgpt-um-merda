const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;

  if (!gameActive || cell.classList.contains("taken")) return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    message.textContent = `🎉 Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if ([...cells].every(cell => cell.classList.contains("taken"))) {
    message.textContent = "😮 Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `Vez do jogador ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);

// Mensagem inicial
message.textContent = `Vez do jogador ${currentPlayer}`;
