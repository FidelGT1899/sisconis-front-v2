export function isUserEmailValid(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export function UserEmailNotValidError(email: string): Error {
    return new Error(`Email ${email} is not valid`)
}