let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgCont = document.querySelector(".msg-container");
let newBtn = document.querySelector("#new");
let msg = document.querySelector("#msg");

let turnO = true;

const winnigPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const reset = () => {
  enablebox();
  msgCont.classList.add("hide");
  turnO = true;
};

const enablebox = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disablebox = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    checkWinner();
  });
});
const showWinner = (winner) => {
  msg.innerText = `Congratulations ! Winner Is ${winner}`;
  msgCont.classList.remove("hide");
};
const checkWinner = () => {
  for (let pattern of winnigPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        disablebox();
      }
    }
  }
};
resetBtn.addEventListener("click", reset);
newBtn.addEventListener("click", reset);
