const metalHit = document.querySelector<HTMLAudioElement>('#hit')
const gunShot = document.querySelector<HTMLAudioElement>('#gunshot')
const glassHit = document.querySelector<HTMLAudioElement>('#glasshit')

if (!gunShot || !metalHit || !glassHit) {
    throw new Error('Sound effect not found')
}

export const playMetalTargetHit = () => {
    metalHit.volume = 0.2
    metalHit.currentTime = 0
    metalHit.play()
}

export const playGunShot = () => {
    gunShot.volume = 0.1
    gunShot.currentTime = 0
    gunShot.play()
}

export const playGlassTargetHit = () => {
    glassHit.volume = 0.2
    glassHit.currentTime = 0
    glassHit.play()
}