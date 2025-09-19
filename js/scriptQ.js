const questions = [
  {
    question: "Qual é o resultado de 5 + 3 * 2 em JavaScript?",
    answers: [
      "16",
      "11",
      "13",
      "10"
    ],
    correct: 1
  },
  {
    question: "Qual estrutura de controle é usada para repetir um bloco de código em JavaScript?",
    answers: ["if", "while", "switch", "for"],
    correct: 1
  },
  {
    question: "O que a operação lógica '&&' faz em JavaScript?",
    answers: [
      "Verifica se ambos os lados são verdadeiros",
      "Verifica se pelo menos um dos lados é verdadeiro",
      "Realiza uma comparação de igualdade",
      "Faz uma atribuição"
    ],
    correct: 0
  },
  {
    question: "Qual é o valor de 'true && false' em JavaScript?",
    answers: ["true", "false", "undefined", "null"],
    correct: 1
  },
  {
    question: "O que o operador '%' faz em JavaScript?",
    answers: [
      "Realiza uma multiplicação",
      "Realiza uma divisão inteira",
      "Realiza um cálculo de módulo",
      "Realiza uma operação de soma"
    ],
    correct: 2
  },
  {
    question: "Qual das alternativas é a condição correta para um 'if' em JavaScript?",
    answers: [
      "if (x == 10)",
      "if x = 10",
      "if x == 10 then",
      "if x = 10;"
    ],
    correct: 0
  },
  {
    question: "Qual o resultado da expressão '3 > 2 && 5 < 6'?",
    answers: [
      "true",
      "false",
      "undefined",
      "null"
    ],
    correct: 0
  },
  {
    question: "Qual é a saída do seguinte código? console.log(10 > 5 ? 'Sim' : 'Não');",
    answers: [
      "'Sim'",
      "'Não'",
      "'10 > 5 ? Sim : Não'",
      "'true'"
    ],
    correct: 0
  },
  {
    question: "Em um loop 'for', qual é a função do comando 'break'?",
    answers: [
      "Interrompe o loop e continua a execução do código após ele",
      "Diminui o valor da variável de controle",
      "Desvia para a próxima iteração do loop",
      "Repete o loop novamente"
    ],
    correct: 0
  },
  {
    question: "Qual das alternativas representa um loop infinito em JavaScript?",
    answers: [
      "for (let i = 0; i < 10; i++) { }",
      "while (true) { }",
      "for (let i = 0; i < 10; i++) { console.log(i); }",
      "while (i < 10) { i++; }"
    ],
    correct: 1
  }
];

const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("nextButton");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer");
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answersContainer.innerHTML = "";
}

function selectAnswer(index) {
  let correct = questions[currentQuestionIndex].correct;

  [...answersContainer.children].forEach((button, i) => {
    if (i === correct) button.classList.add("correct");
    if (i === index && index !== correct) button.classList.add("wrong");
    button.disabled = true;
  });

  if (index === correct) score++;

  nextButton.style.display = "inline-block";
}

function showScore() {
  resetState();
  questionContainer.textContent = "Fim do quiz!";
  scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

showQuestion();
