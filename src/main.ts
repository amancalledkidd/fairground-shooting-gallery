import './style.css'
import { targetMap } from './targetMap'

// Get HTML elements
const gameMap = document.getElementById('game__area') as HTMLDivElement
const gridContainer = document.querySelector('.grid-container') as HTMLDivElement

// Error handling
if (!gameMap || !gridContainer) {
  throw new Error('Game map not found')
}

// handleShot function
const handleShot = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement
    if (target.classList.contains('target')) {
        target.remove()
        // Include sound effect here
        console.log("hello")
        
    }
}

// Layout grid for targets
// Should be part of startGame function
const targetArray = targetMap()

// Create grid for HTML to allow for targets
// Should be part of startGame function
targetArray.forEach((target) => {
        gridContainer.innerHTML += `<div class="grid-item"></div>`
})

// Randomly place target within grid
const randomTarget = () => {
    const randomTarget = Math.floor(Math.random() * targetArray.length)
    const gridItems = document.querySelectorAll('.grid-item') as NodeListOf<HTMLDivElement>
    gridItems[randomTarget].innerHTML = `<div class="target">🎯</div>`
}
// interval for randomTargets to appear
setInterval(randomTarget(), 1)

// eevent listener for shots
gameMap.addEventListener('click', handleShot)
