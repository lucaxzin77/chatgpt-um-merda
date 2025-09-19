const cards = [
  { id: 1, content: 'Script' },
  { id: 2, content: 'Funções' },
  { id: 3, content: 'Loops' },
  { id: 4, content: 'Objetos' },
  { id: 5, content: 'Arrays' },
  { id: 6, content: 'Variável' },
  { id: 7, content: 'Eventos' },
  { id: 8, content: 'Lógica' }
];

// Duplicar as cartas para criar os pares
const gameCards = [...cards, ...cards];

// Embaralhar as cartas
gameCards.sort(() => Math.random() - 0.5);

let flippedCards = [];
let matchedCards = 0;

const gameContainer = document.getElementById('game-container');
const gameOverText = document.getElementById('game-over');

gameCards.forEach((card, index) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.setAttribute('data-id', index);
  cardElement.addEventListener('click', () => flipCard(cardElement, card));
  gameContainer.appendChild(cardElement);
});

function flipCard(cardElement, card) {
  if (cardElement.classList.contains('flipped') || flippedCards.length === 2 || cardElement.classList.contains('matched')) {
    return;
  }

  cardElement.classList.add('flipped');
  cardElement.textContent = card.content;

  flippedCards.push({ cardElement, card });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.card.content === secondCard.card.content) {
    firstCard.cardElement.classList.add('matched');
    secondCard.cardElement.classList.add('matched');
    matchedCards++;

    if (matchedCards === cards.length) {
      setTimeout(() => {
        gameOverText.style.display = 'block';
      }, 500);
    }
  } else {
    setTimeout(() => {
      firstCard.cardElement.classList.remove('flipped');
      secondCard.cardElement.classList.remove('flipped');
    }, 1000);
  }

  flippedCards = [];
}
