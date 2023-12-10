import './style.css'
import { randomScatterTarget, movingTarget } from './targetMap'
import { playMetalTargetHit, playGunShot, playGlassTargetHit } from './soundEffects'

// Get HTML elements
const gameMap = document.getElementById('game__area') as HTMLDivElement
const pointsCount = document.querySelector('#score__card--points') as HTMLDivElement
const multiplierCard = document.querySelector('#score__card--multiplier') as HTMLDivElement
const timerCard = document.querySelector('#score__card--timer') as HTMLDivElement
const startButton = document.querySelector('#start__button') as HTMLButtonElement


// Error handling
if (!gameMap) {
    throw new Error('Game map not found')
}

if (!startButton) {
    throw new Error('Start button not found')
}

if (!pointsCount || !multiplierCard || !timerCard) {
    throw new Error('Score card not found')
}

type GameStats = {
    score: number
    shots: number
    hits: number
    multiplier: number
}



const getMultiplier = (currentGame: GameStats) => {
    if (currentGame.hits > 10) {
        currentGame.multiplier = 5
    } else if  (currentGame.hits > 3) {
        currentGame.multiplier = 2
    } else {
        currentGame.multiplier = 1
    }
    multiplierCard.innerText = `Multiplier: x${currentGame.multiplier}`
}

const handleStartClick = () => {
    gameMap.innerHTML = ''
    startButton.innerText = 'Restart'
    startGame()
}

const startGame = () => {
    const currentGame: GameStats = {
        score: 0,
        shots: 0,
        hits: 0,
        multiplier: 1
    } 
    gameTimer(currentGame)

    movingTarget("target", 5, "H", 10, 30);
    movingTarget("bottle", 15, "H", 7, 93.5, 0.7, true);
    movingTarget("target", 5, "V", 5, 20);
    randomScatterTarget("ufo", 90, 90, true, 2500);


    const handleShot = (event: MouseEvent) => {
        // get target element that was clicked
        const target = event.target as HTMLDivElement
        currentGame.shots += 1
        // play a gunshot sound
        playGunShot()
        // if target is a target, remove it depnding on type
        if (target.classList.contains('target')) {
            targetHit(currentGame)
            target.remove()
        } else if (target.classList.contains('bottle')) {
            bottleHit(currentGame)
            target.remove()
        } else if (target.classList.contains('ufo')) {
            target.remove()
            ufoHit(currentGame)
        }
        else {
            currentGame.hits = 0
        }
    }

    gameMap.addEventListener('click', handleShot)
}


const targetHit = (currentGame: GameStats) => {
    playMetalTargetHit()
    currentGame.score += 10 * currentGame.multiplier
    getMultiplier(currentGame)
    currentGame.hits += 1
    updateScore(currentGame)
}

const ufoHit = (currentGame: GameStats) => {
    playMetalTargetHit()
    currentGame.score += 200 * currentGame.multiplier
    getMultiplier(currentGame)
    currentGame.hits += 1
    updateScore(currentGame)
}

const bottleHit = (currentGame: GameStats) => {
    playGlassTargetHit()
    currentGame.score += 20 * currentGame.multiplier
    getMultiplier(currentGame)
    currentGame.hits += 1
    updateScore(currentGame)
}



const updateScore = (currentGame: GameStats) => {
    pointsCount.textContent = `Score: ${currentGame.score.toString()}`
}

const gameTimer = (currentGame: GameStats) => {
    let timeLeft: number = 60
    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer)
            gameOver(currentGame)
        } else {
            timeLeft -= 1
            timerCard.textContent = `Time: ${timeLeft}`
            if (timeLeft <= 10) {
                timerCard.style.color = 'red'
            }
        }
    }, 1000)
}

const gameOver = (currentGame: GameStats): void => {
    alert(`Game Over! Your score is ${currentGame.score}`)
    const finalScore = document.createElement('div')
    finalScore.classList.add('final__score')
    finalScore.textContent = `Final Score: ${currentGame.score}`

    const retryButton = document.createElement('button')
    retryButton.classList.add('retry__button')
    retryButton.textContent = 'Play Again'
    retryButton.addEventListener('click', handleStartClick)

    gameMap.innerHTML = ''
    gameMap.appendChild(finalScore)
    gameMap.appendChild(retryButton)


}


startButton.addEventListener('click', handleStartClick)

