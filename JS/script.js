const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0;
let snake = [];
let direction = "RIGHT";
let gameRunning = true; // new flag for Game Over

let food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale
};

let bonusFood = null;
let bonusActive = false;
let bonusTimer = 0;

// Initialize snake
snake[0] = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale
};

// Keyboard controls
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Function to create bonus food
function createBonusFood() {
    bonusFood = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
    bonusTimer = 50;      // bonus lasts 50 frames
    bonusActive = true;
}

// Function to handle Game Over
function gameOver() {
    clearInterval(playGame);
    gameRunning = false;

    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 110, canvas.height / 2);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Final Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 40);
}

// Main draw function
function draw() {
    if (!gameRunning) return; // stop drawing after Game Over

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeStyle = "pink";
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }

    // Draw normal food
    ctx.fillStyle = "orange";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(food.x, food.y, scale, scale);

    // Draw bonus food
    if (bonusActive && bonusFood) {
        ctx.fillStyle = "blue";
        ctx.fillRect(bonusFood.x, bonusFood.y, scale, scale);
        ctx.strokeStyle = "black";
        ctx.strokeRect(bonusFood.x, bonusFood.y, scale, scale);

        bonusTimer--;
        if (bonusTimer <= 0) {
            bonusFood = null;
            bonusActive = false;
        }
    }

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);

    // Snake head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update position based on direction
    if (direction === "LEFT") snakeX -= scale;
    if (direction === "RIGHT") snakeX += scale;
    if (direction === "UP") snakeY -= scale;
    if (direction === "DOWN") snakeY += scale;

    // Wrap around walls (optional, remove for wall Game Over)
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeX < 0) snakeX = canvas.width - scale;
    if (snakeY >= canvas.height) snakeY = 0;
    if (snakeY < 0) snakeY = canvas.height - scale;

    // Check collision with normal food
    if (snakeX === food.x && snakeY === food.y) {
        score += 3;
        food.x = Math.floor(Math.random() * columns) * scale;
        food.y = Math.floor(Math.random() * rows) * scale;

        // 30% chance to spawn bonus food
        if (!bonusActive && Math.random() < 0.3) {
            createBonusFood();
        }
    } else {
        snake.pop();
    }

    // Check collision with bonus food
    if (bonusActive && bonusFood && snakeX === bonusFood.x && snakeY === bonusFood.y) {
        score += 10;
        bonusFood = null;
        bonusActive = false;
    }

    // Check self-collision (Game Over)
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver();
            return; // stop drawing
        }
    }

    // Add new head to snake
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}

// Start the game loop
let playGame = setInterval(draw, 100);
