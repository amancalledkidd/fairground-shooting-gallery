const gameMap = document.getElementById('game__area') as HTMLDivElement
const gridContainer = document.querySelector('.grid-container') as HTMLDivElement

if (!gameMap || !gridContainer) {
    throw new Error('Game map not found')
}





type TargetLocation = {
    x: number
    y: number
}



export const fixedTargetArray: TargetLocation[] = [
    { x: 49.5, y: 69 },
    { x: 65.5, y: 69 },
    { x: 78.5, y: 69 },
    { x: 35.3, y: 69 },
    { x: 21.3, y: 69 },
    { x: 10.3, y: 68.9 },
    { x: 10.5, y: 50.9 },
    { x: 10.9, y: 37.8 },
    { x: 21, y: 37.8 },
    { x: 29.5, y: 38.8 },
    { x: 36.5, y: 39.8 },
    { x: 38.5, y: 30.8 },
    { x: 18.5, y: 25.8 },
    { x: 20.5, y: 51 },
    { x: 24.5, y: 51 },
    { x: 36.5, y: 50.5 },
    { x: 42, y: 50.5 },
    { x: 85.5, y: 50.5 },
    { x: 55.5, y: 45.5 },
    { x: 83.5, y: 32.5 },
    { x: 77.5, y: 41.5 },
    { x: 64.5, y: 79.5 }
]

const rows: number = 5
const cols: number = 0
const targetSize: number = 10

export const targetMap= (): TargetLocation[] => {
    const targetArray: TargetLocation[] = [] 
    const spacingX = (650 - cols * targetSize) / (cols + 1);
    const spacingY = (650 - rows * targetSize) / (rows + 1);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = j * (targetSize + spacingX) + spacingX;
            const y = i * (targetSize + spacingY) + spacingY;
            targetArray.push({ x, y });
        }
    }
    return targetArray
}

// Function for moving targets, 
// options is vertical or horizontal( V or H), targetNum is number of targets and targetType for different styles of targets
export const movingTarget = (targetType: string, targetNum: number, options: "V" | "H"): void => {
    for (let i = 1; i < targetNum + 1; i++) {
        const targetElement = document.createElement('div');
        targetElement.classList.add(targetType);
        targetElement.style.left = `${i * 4}%`;
        targetElement.style.top = `${i * 10}%`;
        gameMap.appendChild(targetElement);

        targetAnimation(targetElement, options)
    }
}

const targetAnimation = (target: HTMLElement, options: "V" | "H"): void => {
    let direction: number = 1
    let speed: number = 0.5

    const move = (): void => {
        // parseFloat not int... need decimals for more speed control
        const currentTop = parseFloat(target.style.top)
        // under 100 or over 0, reverse direction
        // over 100% allows for target to be removed from DOM, then return creates more space for additional targets
        if (currentTop > 120 || currentTop < 0) {
            direction *= -1
        }
        if (options === "V") {
            target.style.top = `${currentTop + speed * direction}%`
        } else {
            target.style.left = `${currentTop + speed * direction}%`
        }

    target.style.top = `${currentTop + speed * direction}%`
    // Use requestAnimationFrame to animate, not setInterval, as uses refresh rate as interval
    // initally a callback function, but needed to be recursive
    requestAnimationFrame(move)
    }
    // recursive function, calls itself, which allows for constant animation
    move();
}