// const canvas= document.querySelector(".canvas");
// const ctx = canvas.getContext("2d");

// console.log(ctx)

// const scale = 20;
// const  rows = canvas.height/scale;
// const columns = canvas.width/scale;

// let snake = [];
// snake[0] = {
//     x:Math.floor(Math.random()*columns)*scale, 
//     y:Math.floor(Math.random()*rows)*scale
// };

// let d = "right";

// let playgame = setInterval(draw, 100);

// function draw()
// {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for(let i=0; i<snake.length; i++){

//         ctx.fillStyle = "#fff";
//         ctx.strokeStyle = "red";

//         ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
//         ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
//         }


//         let snakeX = snake[0].x;
//         let snakeY = snake[0].y;
//         console.log(snakeX)


//         if(d === "RIGHT") snakeX += scale;
//         if(d === "LEFT") snakeX -= scale;
//         if(d === "UP") snakeY -= scale;
//         if(d === "DOWN") snakeY += scale;
//         let newHead = {
//             x: snakeX,
//             y: snakeY
//         }

//         snake.unshift(newHead);
//     }


const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

console.log(ctx)

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale
};

// FIX: use uppercase to match conditions
let d = "RIGHT";

setInterval(draw, 100);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  console.log(snakeX);

  if (d === "RIGHT") snakeX += scale;
  if (d === "LEFT") snakeX -= scale;
  if (d === "UP") snakeY -= scale;
  if (d === "DOWN") snakeY += scale;

  let newHead = { x: snakeX, y: snakeY };

  snake.unshift(newHead);

  // prevent infinite growth (core snake move)
//   snake.pop();
}
