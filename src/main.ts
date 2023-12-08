import './style.css'
import { targetMap, fixedTargetArray } from './targetMap'

// Get HTML elements
const gameMap = document.getElementById('game__area') as HTMLDivElement
const gridContainer = document.querySelector('.grid-container') as HTMLDivElement
const pointsCount = document.querySelector('#score__card--points') as HTMLDivElement
const multiplierCard = document.querySelector('#score__card--multiplier') as HTMLDivElement
const timerCard = document.querySelector('#score__card--timer') as HTMLDivElement
const gunShot = document.querySelector('#gunshot') as HTMLAudioElement

// Error handling
if (!gameMap || !gridContainer) {
    throw new Error('Game map not found')
}

if (!pointsCount || !multiplierCard || !timerCard) {
    throw new Error('Score card not found')
}
if (!gunShot) {
    throw new Error('Gunshot sound not found')
}

let score: number = 0
let shots: number = 0
let hits: number = 0
let multiplier: number = 1

const startGame = () => {
    gameTimer()
    setInterval(fixedRandomTarget, 1200)
}


const getMultiplier = () => {
    let htmlText = `Multiplier: x${multiplier}`
    if (hits > 10) {
        multiplier = 5
    } else if  (hits > 3) {
        multiplier = 2
    } else {
        multiplier =1
    }
    multiplierCard.innerText = htmlText
}


// handleShot function
const handleShot = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement
    shots += 1
    playSound()
    if (target.classList.contains('target')) {
        target.remove()
        getMultiplier()
        score += 10 * multiplier
        hits += 1
        updateScore()
    } // Include sound effect here
    else {
        hits = 0
    }
}

const playSound = () => {
    gunShot.volume = 0.1
    gunShot.play()
}

const updateScore = () => {
    pointsCount.textContent = `Score: ${score .toString()}`
}

const gameTimer = () => {
    let timeLeft: number = 60
    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer)
            alert(`Game Over! Your score is ${score}`)
        } else {
            timeLeft -= 1
            timerCard.textContent = `Time: ${timeLeft}`
            return "gameOver"
        }
    }, 1000)
}

// Layout grid for targets
// Should be part of startGame function
const targetArray = targetMap()

// Create grid for HTML to allow for targets
// Should be part of startGame function
const fixedRandomTarget = (): void => {
    const randomIndex = Math.floor(Math.random() * fixedTargetArray.length);
    const position = fixedTargetArray[randomIndex];

    const targetElement = document.createElement('div');
    targetElement.classList.add('target');
    targetElement.style.left = `${position.x}%`;
    targetElement.style.top = `${position.y}%`;
    gameMap.appendChild(targetElement);
}

const ufoMovingTarget = (): void => {
    setInterval(() => {
        const targetElement = document.createElement('div');
        targetElement.classList.add('alien');
        targetElement.style.left = `${Math.floor(Math.random() * 100)}%`;
        targetElement.style.top = `15%`;
        gameMap.appendChild(targetElement);
}, 100)
}

// interval for randomTargets to appear
// setInterval(fixedRandomTarget, 1400)
// startGame()
// setInterval(fixedRandomTarget, 1200)
// ufoMovingTarget()
// eevent listener for shots
gameMap.addEventListener('click', handleShot)
