let gameSeq = [];
let userSeq = [];
let btnColor = ["yellow", "green", "red", "blue"];
let highScore = 0;
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level ${level} <br> Your Highest Score is ${highScore}` ;
  if(level>highScore){
    highScore = level
  }
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btnColor[randIdx];
  let btnCol = document.querySelector(`.${randColor}`);
  btnFlash(btnCol);
  gameSeq.push(randColor);
  console.log(gameSeq);
}

function chceckAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start again`;
    document.querySelector('body').style.backgroundColor = "red"
    setTimeout(() => {
        document.querySelector('body').style.backgroundColor = "white"
    }, 200);
    reset();
  }
}
function btnPress() {
  let btn = this;
  btnFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  chceckAns(userSeq.length - 1);
}
let allBtn = document.querySelectorAll(".btn");
for (btns of allBtn) {
  btns.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
