const resultArea = document.getElementById("result-area");
const chanceArea = document.getElementById("chance-area");
const listContainer = document.getElementById("list-container");
const userInput = document.getElementById("user-input");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");

const CHANCE_COUNTS = 5;
const HIDDEN_CLASSNAME = "hidden";
const UL_ID = "add-number-list";
const RED_CLASSNAME = "red";
const BLUE_CLASSNAME = "blue";
const VIBE_CLASSNAME = "vibe";
const history = [];

let randomNumber = 0;
let gameOver = false;
let chances = CHANCE_COUNTS;

makeUl();
pickRandomNumber();
userInput.addEventListener("focus", () => (userInput.value = ""));

function pickRandomNumber() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(randomNumber);
}

function getUl() {
  let addNumberList = document.getElementById(UL_ID);
  return addNumberList;
}

function makeUl() {
  const ul = document.createElement("ul");
  ul.id = UL_ID;
  listContainer.append(ul);
}

function play() {
  let userValue = userInput.value;

  removeClass();

  if (userValue < 1 || userValue > 100) {
    resultArea.innerText = "1~100 사이의 숫자를 입력해주세요!!";
    resultArea.classList.add(VIBE_CLASSNAME);
    return;
  }

  if (history.includes(userValue)) {
    resultArea.innerText =
      "이미 입력한 숫자입니다. \n 다른 숫자를 입력해주세요!!";
    resultArea.classList.add(VIBE_CLASSNAME);
    return;
  }

  chances--;
  chanceArea.innerText = `남은 기회는? ${chances}`;

  history.push(userValue);

  if (userValue < randomNumber) {
    resultArea.innerText = "UP!!!";
    if (resultArea.classList.contains(BLUE_CLASSNAME)) {
      resultArea.classList.remove(BLUE_CLASSNAME);
    }
    resultArea.classList.add(RED_CLASSNAME);
  } else if (userValue > randomNumber) {
    resultArea.innerText = "DOWN!!";
    if (resultArea.classList.contains(RED_CLASSNAME)) {
      resultArea.classList.remove(RED_CLASSNAME);
    }
    resultArea.classList.add(BLUE_CLASSNAME);
  } else {
    resultArea.innerText = "정답입니다!!";
    removeClass();
    btnDisabled(true);
  }
  addNumber(history);
  listContainer.classList.remove(HIDDEN_CLASSNAME);
  if (chances < 1) {
    btnDisabled(true);
    if (userValue != randomNumber) {
      removeClass();
      resultArea.innerText = "다음 기회에...";
    }
  }
}

function reset() {
  resultArea.innerText = "Up? or Down?";
  chanceArea.innerText = "남은 기회는?";
  userInput.value = "";
  history.splice(0, history.length);
  chances = CHANCE_COUNTS;
  btnDisabled(false);
  getUl().remove();
  makeUl();
  listContainer.classList.add(HIDDEN_CLASSNAME);
  removeClass();
}

function btnDisabled(gameOver) {
  if (gameOver) {
    playBtn.disabled = true;
    userInput.disabled = true;
  } else {
    playBtn.disabled = false;
    userInput.disabled = false;
  }
}

function addNumber(list) {
  const li = document.createElement("li");
  li.innerText = history[list.length - 1];
  getUl().appendChild(li);
}

function removeClass() {
  resultArea.classList.remove(BLUE_CLASSNAME) ||
    resultArea.classList.remove(RED_CLASSNAME) ||
    resultArea.classList.remove(VIBE_CLASSNAME);
}

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
