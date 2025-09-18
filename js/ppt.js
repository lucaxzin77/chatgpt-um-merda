// Função que recebe a jogada do jogador e gera a jogada do computador
function playGame(playerChoice) {
    const choices = ['pedra', 'papel', 'tesoura'];

    // Esconder as opções de escolha e o texto "Escolha sua jogada:"
    document.querySelector('.opcoes').style.display = 'none';
    document.getElementById('escolhaTexto').style.display = 'none';  // Esconder o texto "Escolha sua jogada:"

    // Jogada aleatória do computador
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Comparação das escolhas
    const result = determineWinner(playerChoice, computerChoice);

    // Mostrar as imagens
    showImages(playerChoice, computerChoice);

    // Exibir o resultado
    document.getElementById('result').innerHTML = `<b>${result}</b>`;

    // Mostrar o botão de reiniciar
    document.getElementById('reiniciarBtn').style.display = 'inline-block';
}



// Função para determinar o vencedor
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Empate!";
    }

    if (
        (playerChoice === 'pedra' && computerChoice === 'tesoura') ||
        (playerChoice === 'papel' && computerChoice === 'pedra') ||
        (playerChoice === 'tesoura' && computerChoice === 'papel')
    ) {
        return "Você venceu!";
    } else {
        return "O computador venceu!";
    }
}

// Função para mostrar as imagens de Pedra, Papel e Tesoura com caminho ajustado
function showImages(playerChoice, computerChoice) {
    // Caminho relativo para as imagens (subindo um nível para acessar a pasta images/)
    const playerImage = `../images/${playerChoice}.png`;
    const computerImage = `../images/${computerChoice}.png`;

    // Atualizar as imagens no HTML
    document.getElementById('result-images').innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; margin-right: 40px;">
            <span><b>Jogador</b></span>
            <img src="${playerImage}" alt="Escolha do jogador" width="120" height="120">
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
            <span><b>Computador</b></span>
            <img src="${computerImage}" alt="Escolha do computador" width="120" height="120">
        </div>
    `;
}

// Função de reiniciar o jogo
function restartGame() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('result-images').innerHTML = '';
    
    // Mostrar novamente as opções de escolha e o texto "Escolha sua jogada:"
    document.querySelector('.opcoes').style.display = 'flex';
    document.getElementById('escolhaTexto').style.display = 'block';  // Mostrar o texto novamente

    document.getElementById('reiniciarBtn').style.display = 'none';
}


