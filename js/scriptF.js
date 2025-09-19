let rodada = 0; 
let palavrasUsadas = []; 

const palavras = [
  "JAVASCRIPT", 
  "COMPUTADOR", 
  "PROGRAMAÇÃO", 
  "HTML", 
  "DESENVOLVIMENTO", 
  "ESCOLA",
  "SISTEMA",
  "ALUNO",
  "FUNÇÃO",
  "ANÁLISE",
  "LÓGICA",
  "FUNDAMENTO",
  "ALGORITMO",
  "CÓDIGO",
  "VARIÁVEL",
  "FUNÇÃO",
  "CLASSE",
  "OBJETO",
  "DADOS",
  "SINTAXE",
  "COMPILAÇÃO",
  "ARRAY",
  "FRONTEND",
  "BACKEND",
  "WEBSITE"
];

let palavraEscolhida = "";
let letrasCertas = [];
let letrasErradas = [];
let tentativas = 10;

function escolherPalavra() {
  // Filtra as palavras que ainda não foram usadas
  const palavrasDisponiveis = palavras.filter(palavra => !palavrasUsadas.includes(palavra));

  // Se todas as palavras já foram usadas, reinicia a lista
  if (palavrasDisponiveis.length === 0) {
    palavrasUsadas = []; // Reseta a lista de palavras usadas
  }

  // Escolhe uma palavra aleatória da lista filtrada
  const palavra = palavrasDisponiveis[Math.floor(Math.random() * palavrasDisponiveis.length)];

  // Marca a palavra como usada
  palavrasUsadas.push(palavra);

  return palavra;
}

function mostrarPalavra() {
  const exibicao = palavraEscolhida
    .split("")
    .map(letra => (letrasCertas.includes(letra) ? letra : "_"))
    .join(" ");
  document.getElementById("palavra").textContent = exibicao;
}

function criarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = "";

  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let letra of letras) {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.onclick = () => tentarLetra(letra); 
    teclado.appendChild(btn);
  }
}

function removerAcento(letra) {
  return letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function tentarLetra(letra) {
  const btn = Array.from(document.querySelectorAll(".teclado button"))
    .find(b => removerAcento(b.textContent) === letra); 

  if (!btn || btn.disabled) return;

  btn.disabled = true;

  const corresponde = palavraEscolhida.split("").some(l => removerAcento(l) === letra);

  if (corresponde) {
    palavraEscolhida.split("").forEach(l => {
      if (removerAcento(l) === letra && !letrasCertas.includes(l)) {
        letrasCertas.push(l);
      }
    });
    btn.classList.add("correto");
  } else {
    letrasErradas.push(letra);
    tentativas--;
    btn.classList.add("errado");
    document.getElementById("tentativas").textContent = tentativas;
    document.getElementById("letras-erradas").textContent = "Letras erradas: " + letrasErradas.join(", ");
  }

  mostrarPalavra();
  verificarFim();

  if (palavraEscolhida.split("").every(l => letrasCertas.includes(l))) {
    showWinScreen();
  }

  if (tentativas <= 0) {
    showLoseScreen();
  }
}

function verificarFim() { 
  const mensagem = document.getElementById("mensagem"); 
  const btnReiniciar = document.getElementById("btn-reiniciar"); 
  const venceu = palavraEscolhida.split("").every(l => letrasCertas.includes(l)); 

  if (venceu) { 
    mensagem.textContent = "🎉 Você venceu!"; desativarTeclado(); 
    btnReiniciar.style.display = "inline-block"; 
  } 

  if (tentativas === 0) { 
    mensagem.textContent = "💀 Você perdeu! A palavra era: " + palavraEscolhida; 
    mostrarPalavraFinal(); 
    desativarTeclado(); 
    btnReiniciar.style.display = "inline-block"; 
  } 
}

function mostrarPalavraFinal() {
  document.getElementById("palavra").textContent = palavraEscolhida.split("").join(" ");
}

function desativarTeclado() {
  const botoes = document.querySelectorAll(".teclado button");
  botoes.forEach(btn => btn.disabled = true);
}

function iniciarJogo() {
  rodada++; 
  document.getElementById("rodada").textContent = `Rodada: ${rodada}`; // Exibe o número da rodada

  palavraEscolhida = escolherPalavra();
  letrasCertas = [];
  letrasErradas = [];
  tentativas = 10;

  document.getElementById("tentativas").textContent = tentativas;
  document.getElementById("letras-erradas").textContent = "Letras erradas: ";
  document.getElementById("mensagem").textContent = "";
  document.getElementById("btn-reiniciar").style.display = "none";

  mostrarPalavra();
  criarTeclado();
}

window.onload = iniciarJogo;
