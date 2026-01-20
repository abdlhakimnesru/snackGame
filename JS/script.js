

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

 let food = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
      };

// FIX: use uppercase to match conditions
let d = "LEFT";

document.onkeydown = direction;

function direction(event) {
  if (event.keyCode === 37 && d !== "RIGHT") d = "LEFT";
  else if (event.keyCode === 38 && d !== "DOWN") d = "UP";
  else if (event.keyCode === 39 && d !== "LEFT") d = "RIGHT";
  else if (event.keyCode === 40 && d !== "UP") d = "DOWN";
}

setInterval(draw, 100);

function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
      }

      // draw food
     

      ctx.fillStyle = "#ff0";
      ctx.strokeStyle = "green";
      
      ctx.fillRect(food.x, food.y, scale, scale);
      ctx.strokeRect(food.x, food.y, scale, scale);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
      console.log(snakeX);

      


      if (d === "RIGHT") snakeX += scale;
      if (d === "LEFT") snakeX -= scale;
      if (d === "UP") snakeY -= scale;
      if (d === "DOWN") snakeY += scale;

      if (snakeX >= canvas.width) snakeX = 0;
      if (snakeX < 0) snakeX = canvas.width - scale;

      if (snakeY >= canvas.height) snakeY = 0;
      if (snakeY < 0) snakeY = canvas.height - scale;


      if (snakeX === food.x && snakeY === food.y) {
        food = {
          x: Math.floor(Math.random() * columns) * scale,
          y: Math.floor(Math.random() * rows) * scale
        };
      } else {
        snake.pop();
      }



      let newHead = { x: snakeX, y: snakeY };

      snake.unshift(newHead);
    }

      // checkCollision function can be added here for self-collision detection

      function checkCollision(head, array)
       {
            for (let i = 0; i < array.length; i++) {
              if (head.x === array[i].x && head.y === array[i].y) {
                return true;
              }
            }
            return false;
      }