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