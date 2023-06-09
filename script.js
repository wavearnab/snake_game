const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");

let score;
let ScoreDOM = document.getElementById("score")

let direction;
let changing_direction = false;
let xFoodPosition;
let yFoodPosition;

let isPaused = false;

const topControlBtn = document.getElementById("top-control-btn");
const leftControlBtn = document.getElementById("left-control-btn");
const rightControlBtn = document.getElementById("right-control-btn");
const downControlBtn = document.getElementById("down-control-btn");

topControlBtn.addEventListener("click", () => {changeDirection({ keyCode: 38 })});
leftControlBtn.addEventListener("click", () => {changeDirection({ keyCode: 37 })});
rightControlBtn.addEventListener("click", () => {changeDirection({ keyCode: 39 })});
downControlBtn.addEventListener("click", () => {changeDirection({ keyCode: 40 })});

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);

function disableControlBtns(){
   topControlBtn.disabled = true;
   leftControlBtn.disabled = true;
   rightControlBtn.disabled = true;
   downControlBtn.disabled = true;
}

function enableControlBtns(){
   topControlBtn.disabled = false;
   leftControlBtn.disabled = false;
   rightControlBtn.disabled = false;
   downControlBtn.disabled = false;
}

let snakeBody;

pauseBtn.disabled = true;
window.addEventListener("keydown", changeDirection);

function start(){
   score = 0;
   direction = "right";
   ScoreDOM.innerHTML = score;
   pauseBtn.disabled = false;
   enableControlBtns();
   snakeBody = [
      { x: 200, y: 250 },
      { x: 190, y: 250 },
      { x: 180, y: 250 },
      { x: 170, y: 250 },
      { x: 160, y: 250 },
      { x: 150, y: 250 },
   ];
   clearBox();
   createRendomFoodPosition();
   main();
   startBtn.disabled = true;
}

function pause(){
   if(!isPaused){
      isPaused = true;
      disableControlBtns()
      pauseBtn.innerHTML = "Resume";
   }else{
      isPaused = false;
      enableControlBtns()
      pauseBtn.innerHTML = "Pause";
      main();
   }
}


function main() {
   if (checkForHit()) {
      return;
   }

   if(isPaused){
      return;
   }

   changing_direction = false;

   setTimeout(() => {
      clearBox();
      drawsnakeBody();
      createFood();

      main();
   }, 120);
}

function checkForHit() {
   for (i = 4; i < snakeBody.length; i++) {
      if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y) {
         startBtn.disabled = false;
         pauseBtn.disabled = true;
         disableControlBtns();
         return true;
      }
   }

   if (
      snakeBody[0].x > canvas.width - 10 ||
      snakeBody[0].x < 0 ||
      snakeBody[0].y > canvas.height - 10 ||
      snakeBody[0].y < 0
   ) {
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      disableControlBtns();
      return true;
   }

}

function clearBox() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawsnakeBody() {
   switch (direction) {
      case "left":
         snakeBody.unshift({ x: snakeBody[0].x - 10, y: snakeBody[0].y });
         break;

      case "top":
         snakeBody.unshift({ x: snakeBody[0].x, y: snakeBody[0].y - 10 });
         break;

      case "right":
         snakeBody.unshift({ x: snakeBody[0].x + 10, y: snakeBody[0].y });
         break;

      case "down":
         snakeBody.unshift({ x: snakeBody[0].x, y: snakeBody[0].y + 10 });
         break;
   }
   snakeBody.pop();
   snakeBody.forEach(drawsnakeBodyPart);
}

function drawsnakeBodyPart(part) {
   ctx.fillStyle = "#D90B1C";
   // ctx.strokeStyle = "#D90B1C";

   ctx.fillRect(part.x, part.y, 10, 10);
   // ctx.strokeRect(part.x, part.y, 10, 10);
}

function changeDirection(event) {
   if (changing_direction) return;
   changing_direction = true;

   if (event.keyCode === 37 && !(direction === "right")) {
      direction = "left";
   }

   if (event.keyCode === 38 && !(direction === "down")) {
      direction = "top";
   }

   if (event.keyCode === 39 && !(direction === "left")) {
      direction = "right";
   }

   if (event.keyCode === 40 && !(direction === "top")) {
      direction = "down";
   }
}

//**************** Code For Food *****************/

function createRendomFoodPosition() {
   xFoodPosition = Math.round((Math.random() * (canvas.width - 10)) / 10) * 10;
   yFoodPosition = Math.round((Math.random() * (canvas.height - 10)) / 10) * 10;

   ctx.fillRect(xFoodPosition, yFoodPosition, 10, 10);
}

function createFood() {
   ctx.fillStyle = "#3EB595";
   ctx.fillRect(xFoodPosition, yFoodPosition, 10, 10);
   if (snakeBody[0].x === xFoodPosition && snakeBody[0].y === yFoodPosition) {
      score += 10;
      ScoreDOM.innerHTML = score;
      createRendomFoodPosition();
      snakeBody.push({
         x: snakeBody[snakeBody.length - 1].x,
         y: snakeBody[snakeBody.length - 1].y,
      });
   }
}

