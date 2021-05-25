// If you put your script tag in header then use this method
document.addEventListener('DOMContentLoaded', () => {

// all out javascript be between here 

const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

let birdLeft = 220
let birdBottom = 100
let gravity = 2
let isGameOver = false
let gap = 430
let score = -1

function startGame() {
    birdBottom-= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
}


let gameTimerId = setInterval(startGame, 20)

function control(e) {
    if(e.keyCode === 32) {        // keycode 32 is for spacebar
        jump()
    }
}

function jump() {
    if(birdBottom < 500) {
        birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    
    
}

document.addEventListener('keyup', control)


function generateObstacle() {
    let obstacleLeft = 500
    let randomHeight = Math.random() * 60 
    let obstacleBottom = randomHeight
    const obstacle = document.createElement('div')    // this is how you create div in
    const topObstacle = document.createElement('div')
    if (!isGameOver) {
        score++
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

    function moveObstacle() {
        obstacleLeft -= 2
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'

        if(obstacleLeft === -60) {
        // to disappear the obstacle
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
        }

        if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 200) || birdBottom === 0) {
            gameOver()
            clearInterval(timerId)
        }
    }
    let timerId = setInterval(moveObstacle, 20)
    if(!isGameOver) setTimeout(generateObstacle, 3000)
    
}

generateObstacle()


function gameOver() {
    console.log("gameover")
    isGameOver = true
    while (gameDisplay.firstChild) {
        gameDisplay.removeChild(gameDisplay.firstChild)
    }
    gameDisplay.innerHTML = 'Your score is ' + score 
    
    document.removeEventListener('keyup', control)   // this is how we remove events
    clearInterval(gameTimerId)
    
}

})