const metalHit = document.querySelector<HTMLAudioElement>('#hit')
const gunShot = document.querySelector<HTMLAudioElement>('#gunshot')
const glassHit = document.querySelector<HTMLAudioElement>('#glasshit')
const ufoHit = document.querySelector<HTMLAudioElement>('#ufohit')


if (!gunShot || !metalHit || !glassHit || !ufoHit) {
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

export const playUfoHit = () => {
    ufoHit.volume = 0.4
    ufoHit.currentTime = 0
    ufoHit.play()
}