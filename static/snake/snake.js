let lastUpdateTime = 0;
let frameDelay = 1000;

class Snake {
    posX;
    posX = 0;
    posY;
    posY = 0;
    direction;
    direction = "right";
    score;
    score = 0;

    constructor(headDiv, snakeSpeed) {
        this.snakeHead = headDiv;
        this.posX = 0;
        this.posY = 0;
        this.direction = "right"; // Fix the direction here
        this.snakeSpeed = 40;
        this.updatePosition(this.direction);
    }

    setDirection(direction) {
        this.direction = direction;
    }

    updatePosition(direction) {
        if (this.direction === "right") {
            this.posX += this.snakeSpeed;
        } else if (this.direction === "left") {
            this.posX -= this.snakeSpeed;
        } else if (this.direction === "up") {
            this.posY -= this.snakeSpeed;
        } else if (this.direction === "down") {
            this.posY += this.snakeSpeed;
        }

        this.snakeHead.style.left = this.posX + "px";
        this.snakeHead.style.top = this.posY + "px";

        if (this.posX < 0 || this.posX >= 400 || this.posY < 0 || this.posY >= 400) {
            // Game over, out of bounds
            alert("Game over!");
            document.location.reload();
        }
    }
}

class Food {
    constructor(snakeFood) {
        this.snakeFood = snakeFood;
        this.posX = 0;
        this.posY = 0;
        this.placeFood();
    }

    placeFood() {
        this.posX = Math.floor(Math.random() * 10) * 40;
        this.posY = Math.floor(Math.random() * 10) * 40;

        this.snakeFood.style.left = this.posX + "px";
        this.snakeFood.style.top = this.posY + "px";
    }
}

function checkCollision(snake, food, score) {
    if (snake.posX === food.posX && snake.posY === food.posY) {
        // Snake eats food
        snake.score += 1;
        food.placeFood();
        score.innerHTML = snake.score + "&#x2665;";
        frameDelay *= 0.9;
    }
}

function gameLoop(snake, food, direction, frameDelay, score) {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastUpdateTime;

    if (deltaTime >= frameDelay) { // Limit to approximately 60 FPS (1000 ms / 60 FPS)
        lastUpdateTime = currentTime;
        snake.updatePosition(direction);
        checkCollision(snake, food, score);
    }

    requestAnimationFrame(() => gameLoop(snake, food, direction, frameDelay, score));
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && snake.direction !== "left") {
        snake.setDirection("right");
    } else if (event.key === "ArrowLeft" && snake.direction !== "right") {
        snake.setDirection("left")
    } else if (event.key === "ArrowUp" && snake.direction !== "down") {
        snake.setDirection("up")
    } else if (event.key === "ArrowDown" && snake.direction !== "up") {
        snake.setDirection("down")
    }
});

const snakeHead = document.getElementById("snakeHead");
const snakeFood = document.getElementById("snakeFood");
const scoreLabel = document.getElementById("kissScore");

let snake = new Snake(snakeHead);
let food = new Food(snakeFood);

gameLoop(snake, food, snake.direction, frameDelay, scoreLabel);
