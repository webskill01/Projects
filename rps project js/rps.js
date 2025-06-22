let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscrpara = document.querySelector("#user-score");
const compscrpara = document.querySelector("#comp-score");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    playgame(userchoice);
  });
});

const playgame = (userchoice) => {
  const compchoice = gencompschoice();
  
  if (userchoice === compchoice) {
    drawgame();
  } else {
    let userwin = true;
    if (userchoice === "rock") {
      userwin = compchoice === "paper" ? false : true;
    } else if (userchoice === "paper") {
      userwin = compchoice === "scissors" ? false : true;
    } else {
      userwin = compchoice === "rock" ? false : true;
    }
    showwinner(userwin, userchoice, compchoice);
  }
};

const gencompschoice = () => {
  options = ["rock", "paper", "scissors"];
  const ranidx = Math.floor(Math.random() * 3);
  return options[ranidx];
};
const drawgame = () => {
  msg.innerText = " Game Was Draw ! Play Again";
  msg.style.backgroundColor = "rgb(0, 0, 118)";
};

const showwinner = (userwin, userchoice, compchoice) => {
  if (userwin) {
    userscore++;
    userscrpara.innerText = userscore;
    msg.innerText = ` You Win! Your ${userchoice} Beats ${compchoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compscore++;
    compscrpara.innerText = compscore;
    msg.innerText = ` You Lose. ${compchoice} Beats Your ${userchoice}`;
    msg.style.backgroundColor = "red";
  }
};
