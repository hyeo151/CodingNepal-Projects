const boardElement = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controlsElement = document.querySelectorAll(".controls i")

const speed = 125;

let foodX, foodY;
let snakeX = 2, snakeY = 2;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let isPaused = false;
let intervalId;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem("high-score") | 0;
highScoreElement.innerHTML = `High Score: ${highScore}`
let boardSize = 30;

controlsElement.forEach( controlKey => {
    controlKey.addEventListener("click",() =>{ changeDirection( {key:controlKey.dataset.key} ) })
});

const changeDirection = (e) => {
    if(isPaused && ( e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft")){
        pauseGame();
    }
    if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;  
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === " "){
        pauseGame();
    }
}

const pauseGame = () => {
    if (isPaused){
        // Resume the game
        intervalId = setInterval(initGame,speed);
        isPaused = false;
    } else {
        // Pause the game
        clearInterval(intervalId);
        isPaused = true;
    }
}

const changeFoodPosition = () => {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * boardSize) + 1;
        newY = Math.floor(Math.random() * boardSize) + 1;
    } while (snakeBody.some(segment => segment[0] === newX && segment[1] === newY));
    foodX = newX;
    foodY = newY;
}


const updateSnakeBody = () => {
    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
}

const repaint = () => {
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`
    for(let i=0; i<snakeBody.length; i++){
        htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver=true;
        }
    }
    boardElement.innerHTML = htmlMarkup
}

const handleGameOver = () => {
    if(gameOver){
        clearInterval(intervalId);
        alert("Game Over! Press OK to replay...");
        location.reload();
    }
}

const initGame = () => {

    updateSnakeBody();
    
    snakeX += velocityX;
    snakeY += velocityY;
    snakeBody[0] = [snakeX,snakeY]

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore)
        scoreElement.innerHTML = `Score: ${score}`
        highScoreElement.innerHTML = `High Score: ${highScore}`
    }

    if(snakeX < 1 || snakeX > boardSize || snakeY < 1 || snakeY > boardSize){
        gameOver = true;
    }

    if(gameOver) return handleGameOver();

    repaint();
}

changeFoodPosition();
intervalId = setInterval(initGame,speed);
document.addEventListener("keydown",changeDirection);