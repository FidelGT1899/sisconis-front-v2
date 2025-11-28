import confetti from 'canvas-confetti'

export function fireConfetti() {
    if (typeof window === 'undefined') return

    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 1, x: 0.9 },
        scalar: 0.9,
    })
}
