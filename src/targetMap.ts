export const targetMap = () => {
    const targetArray: number[] = []  
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 25; j++) {
            targetArray.push(0)
        }
    }
    return targetArray
}