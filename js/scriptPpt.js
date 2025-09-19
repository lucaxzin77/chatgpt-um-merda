function playGame(playerChoice) {
    const choices = ['pedra', 'papel', 'tesoura'];


    document.querySelector('.opcoes').style.display = 'none';
    document.getElementById('escolhaTexto').style.display = 'none';  

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const result = determineWinner(playerChoice, computerChoice);

    showImages(playerChoice, computerChoice);

    document.getElementById('result').innerHTML = `<b>${result}</b>`;

    document.getElementById('reiniciarBtn').style.display = 'inline-block';
}


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


function showImages(playerChoice, computerChoice) {

    const playerImage = `../images/${playerChoice}.png`;
    const computerImage = `../images/${computerChoice}.png`;

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

function restartGame() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('result-images').innerHTML = '';
    
    document.querySelector('.opcoes').style.display = 'flex';
    document.getElementById('escolhaTexto').style.display = 'block';

    document.getElementById('reiniciarBtn').style.display = 'none';
}


