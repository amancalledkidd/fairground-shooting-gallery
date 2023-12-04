import './style.css'

const gameMap = document.getElementById('game__area') as HTMLDivElement

if (!gameMap) {
  throw new Error('Game map not found')
}

const showTarget = () => {
  gameMap.innerHTML = `<div class="target">🎯</div>`
}

showTarget()


const handleShot = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement
    if (target.classList.contains('target')) {
        target.remove()
        console.log("hello")
        
    }
}


gameMap.addEventListener('click', handleShot)
