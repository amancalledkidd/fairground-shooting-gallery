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


let score: number = 0
let shots: number = 0
let hits: number = 0
let multiplier: number = 1


// TODO: make more efficent
const getMultiplier = (multiplier: number) => {
    let htmlText = `Multiplier: x${multiplier}`
    if (hits > 10) {
        multiplier = 5
    } else if  (hits > 3) {
        multiplier = 2
    } else {
        multiplier = 1
    }
    multiplierCard.innerText = htmlText
}

const handleStartClick = () => {
    startButton.innerText = 'Restart'
    startGame()
}

const startGame = () => {
    let score: number = 0
    let shots: number = 0
    let hits: number = 0
    let multiplier: number = 1

    movingTarget("target", 5, "H", 10, 30);
    movingTarget("bottle", 15, "H", 7, 93.5, 0.7, true);
    // movingTarget("target", 5, "H", 10, 55);
    // movingTarget("target", 5, "H", 10, 70);
    movingTarget("target", 5, "V", 5, 20);
    randomScatterTarget("ufo", 90, 90, true);

}
// handleShot function
const handleShot = (event: MouseEvent) => {
    // get target element that was clicked
    const target = event.target as HTMLDivElement
    shots += 1
    // play a gunshot sound
    playGunShot()
    // if target is a target, remove it depnding on type
    if (target.classList.contains('target')) {
       targetHit()
       target.remove()
    } else if (target.classList.contains('bottle')) {
        bottleHit()
        target.remove()
    }
    else {
        hits = 0
    }
}

const targetHit = () => {
    playMetalTargetHit()
    score += 10 * multiplier
    hits += 1
    updateScore()
}


const bottleHit = () => {
    playGlassTargetHit()
    score += 20 * multiplier
    hits += 1
    updateScore()
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


gameMap.addEventListener('click', handleShot)
startButton.addEventListener('click', handleStartClick)

