interface TargetLocation {
    x: number
    y: number
}

const rows: number = 10
const cols: number = 10
const targetSize: number = 20

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