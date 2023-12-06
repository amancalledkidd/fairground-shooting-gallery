import './style.css'
import { targetMap, fixedTargetArray } from './targetMap'

// Get HTML elements
const gameMap = document.getElementById('game__area') as HTMLDivElement
const gridContainer = document.querySelector('.grid-container') as HTMLDivElement
const pointsCount = document.querySelector('#score__card--points') as HTMLDivElement
const multiplierCard = document.querySelector('#score__card--multiplier') as HTMLDivElement


// Error handling
if (!gameMap || !gridContainer) {
    throw new Error('Game map not found')
}

if (!pointsCount) {
    throw new Error('Score card not found')
}

let score: number = 0
let shots: number = 0
let hits: number = 0
let multiplier: number = 1

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

const updateScore = () => {
    pointsCount.textContent = `Score: ${score .toString()}`
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



// interval for randomTargets to appear
// setInterval(fixedRandomTarget, 1400)
// setInterval(fixedRandomTarget, 1200)

// eevent listener for shots
gameMap.addEventListener('click', handleShot)
