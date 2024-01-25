import bottle from '../assets/images/bottle.webp'
import ufo from '../assets/images/ufo.webp'

const gameMap = document.getElementById('game__area') as HTMLDivElement
const gridContainer = document.querySelector('.grid-container') as HTMLDivElement

if (!gameMap || !gridContainer) {
    throw new Error('Game map not found')
}

// type targetType = {
//     'bottle' | 'ufo' | 'target'
// }

export const randomScatterTarget = (
    targetType: string, 
    top: number, 
    left: number,
    img: boolean = false,
    interval: number = 700,
    iterations: number = 20
): void => {
    let count = 0;
    const intervalId = setInterval(() => {
        if (count > iterations) {
            clearInterval(intervalId)
            return;
        }

        const target = document.querySelector(`.${targetType}`) as HTMLDivElement
        if (target) {
            target.remove()
        } 

        let targetElement: HTMLImageElement | HTMLDivElement

        if (img) {
            targetElement = imageTarget(targetType) as HTMLImageElement
        } else {
            targetElement = document.createElement('div')
            targetElement.classList.add(targetType) 
        }

        targetElement.style.left = `${Math.floor(Math.random() * left)}%`;
        targetElement.style.top = `${Math.floor(Math.random() * top)}%`;
        gameMap.appendChild(targetElement);

        count += 1;
}, interval)
}

const imageTarget = (targetType: string): HTMLImageElement => {
    const targetElement = document.createElement('img');
    if (targetType == 'ufo') {
        targetElement.src = ufo;
        targetElement.classList.add(targetType);
    } else if (targetType == 'bottle') {
        targetElement.src = bottle;
        targetElement.classList.add(targetType);
    } else {
        targetElement.classList.add(targetType);
    }
    
    return targetElement
}

// Function for moving targets, 
// options is vertical or horizontal( V or H), targetNum is number of targets and targetType for different styles of targets
export const movingTarget = (
    targetType: string, 
    targetNum: number, 
    options: "V" | "H", 
    horizontalSpread: number = 5, 
    verticalSpread: number = 10,
    speed: number = 0.5,
    image: boolean = false
): void => {

    for (let i = 1; i < targetNum + 1; i++) {

        let targetElement: HTMLImageElement | HTMLDivElement

        if (image) {
            targetElement = imageTarget(targetType) as HTMLImageElement;
        } else {
            targetElement = document.createElement('div') as HTMLDivElement;
            targetElement.classList.add(targetType);
        }
        
        if (options === "H") {
            targetElement.style.left = `${i * horizontalSpread}%`;
            targetElement.style.top = `${verticalSpread}%`;
        } else {
            targetElement.style.left = `${horizontalSpread}%`;
            targetElement.style.top = `${i * verticalSpread}%`;
        }

        gameMap.appendChild(targetElement);
        targetAnimation(targetElement, options, speed)
    }
}



const targetAnimation = (target: HTMLElement, options: "V" | "H", speed: number): void => {
    let direction: number = 1

    const move = (): void => {
        // parseFloat not int... need decimals for more speed control
        let currentPosition: number;
        if (options === "V") {
            currentPosition = parseFloat(target.style.top)
        } else {
            currentPosition = parseFloat(target.style.left)
        }
        // under 100 or over 0, reverse direction
        // over 100% allows for target to be removed from DOM, then return creates more space for additional targets
        if (currentPosition > 120 || currentPosition < -20) {
            direction *= -1
        }


        if (options === "V") {
            target.style.top = `${currentPosition + speed * direction}%`
        } else {
            target.style.left = `${currentPosition + speed * direction}%`
        }
        // Use requestAnimationFrame to animate, not setInterval, as uses refresh rate as interval
        // initally a callback function, but needed to be recursive
        requestAnimationFrame(move)
    }
    // recursive function, calls itself, which allows for constant animation
    move();
}