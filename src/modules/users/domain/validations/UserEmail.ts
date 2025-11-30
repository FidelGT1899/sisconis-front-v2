const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isUserEmailValid(email: string): boolean {
    if (!email) return false
    return EMAIL_REGEX.test(email)
}

export function UserEmailNotValidError(email: string): Error {
    return new Error(`Email ${email} is not valid`)
}

//TODO:Validación de Email único