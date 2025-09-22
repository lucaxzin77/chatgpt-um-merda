const rows = document.querySelectorAll(".row");
let currentRowIndex = 0;

// Banco de palavras
const words = ["TERMO", "JOGAR", "MOUSE", "LIVRO"];
// Palavra alvo (aleatória)
const secretWord = words[Math.floor(Math.random() * words.length)];

console.log("Palavra secreta:", secretWord); // debug

// Inicializa: bloqueia todas as linhas menos a primeira
rows.forEach((row, i) => {
  row.querySelectorAll("input").forEach((inp) => {
    if (i !== 0) {
      inp.disabled = true;
      inp.classList.add("none");
    }
  });
});

function clearInputs() {
  const currentRow = rows[currentRowIndex];
  currentRow.querySelectorAll("input").forEach((inp) => {
    inp.value = "";
    inp.classList.remove("correct", "near", "incorrect");
  });
}

document.getElementById("clear-key").addEventListener("click", clearInputs);

function updateKeyboard(letter, status) {
  // Busca todas as teclas que não são wide-key
  const keys = Array.from(
    document.querySelectorAll("#keyboard .key:not(.wide-key)")
  );
  // Encontra a tecla que tem o texto igual à letra
  const key = keys.find((k) => k.textContent === letter);
  if (!key) return;

  // Se já está "correct", não rebaixa para "near" ou "incorrect"
  if (key.classList.contains("correct")) return;

  if (status === "correct") {
    key.classList.remove("near", "incorrect");
    key.classList.add("correct");
  } else if (status === "near") {
    if (!key.classList.contains("near")) {
      key.classList.add("near");
    }
  } else {
    if (!key.classList.contains("near")) {
      key.classList.add("incorrect");
    }
  }
}

function activateRow(rowIndex) {
  const row = rows[rowIndex];
  row.querySelectorAll("input").forEach((inp) => {
    inp.disabled = false;
    inp.classList.remove("none");
    inp.value = "";
    inp.classList.remove("correct", "near", "incorrect");
  });
  row.querySelector("input").focus();

  const inputs = row.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
}

// Ativa primeira linha
activateRow(0);

function checkWord() {
  const currentRow = rows[currentRowIndex];
  const inputs = currentRow.querySelectorAll("input");

  // Monta a palavra digitada
  let guess = "";
  inputs.forEach((inp) => (guess += inp.value.toUpperCase()));

  if (guess.length !== secretWord.length) {
    alert("Preencha todas as letras!");
    return;
  }

  const secretArray = secretWord.split("");
  const guessArray = guess.split("");

  // Cópia auxiliar para controlar letras já usadas
  const secretCopy = [...secretArray];

  // Limpa classes antigas
  inputs.forEach((inp) => inp.classList.remove("correct", "near", "incorrect"));

  // 1ª passada → letras corretas
  guessArray.forEach((letter, i) => {
    if (letter === secretArray[i]) {
      inputs[i].classList.add("correct");
      secretCopy[i] = null;
      updateKeyboard(letter, "correct");
    }
  });

  // 2ª passada → letras perto ou incorretas
  guessArray.forEach((letter, i) => {
    if (!inputs[i].classList.contains("correct")) {
      const pos = secretCopy.indexOf(letter);
      if (pos !== -1) {
        inputs[i].classList.add("near");
        secretCopy[pos] = null;
        updateKeyboard(letter, "near");
      } else {
        inputs[i].classList.add("incorrect");
        updateKeyboard(letter, "incorrect");
      }
    }
  });

  // Trava linha atual
  inputs.forEach((inp) => {
    inp.disabled = true;
    inp.classList.add("none");
  });

  // Vitória
  if (guess === secretWord) {
    document.querySelector(".alert-text").innerText = "Você acertou!";
    document.querySelector(".alert").classList.add("right");
    document.querySelector(".alert").classList.remove("hide");
    return;
  }

  // Próxima linha
  if (currentRowIndex < rows.length - 1) {
    currentRowIndex++;
    activateRow(currentRowIndex);
  } else {
    document.querySelector(
      ".alert-text"
    ).innerText = `A palavra era: ${secretWord}`;
    document.querySelector(".alert").classList.add("wrong");
    document.querySelector(".alert").classList.remove("hide");
  }
}

document.getElementById("enter-key").addEventListener("click", checkWord);

document.getElementById("close-alert").addEventListener("click", () => {
  document.querySelector(".alert").classList.add("hide");
  window.location.reload();
});
