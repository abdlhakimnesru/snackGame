const canvas= document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

console.log(ctx)

const scale = 20;
const  rows = canvas.height/scale;
const columns = canvas.width/scale;

let snake = [];
snake[0] = {
    x:Math.floor(Math.random()*columns)*scale, 
    y:Math.floor(Math.random()*rows)*scale
};


let playgame = setInterval(draw, 100);

function draw(){
ctx.fillStyle = "#fff";
ctx.fillRect(snake[0].x, snake[0].y, scale, scale);

ctx.strokeRect(snake[0].x, snake[0].y, scale, scale);
ctx.strokeStyle = "red";
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;


if(d="RIGHT") snakeX += scale;
if(d="LEFT") snakeX -= scale;
if(d="UP") snakeY -= scale;
if(d="DOWN") snakeY += scale;


