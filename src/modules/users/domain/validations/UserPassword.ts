export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 64

export function isUserPasswordValid(password: string): boolean {
    if (!password) return false
    return (
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH
    )
}

export function UserPasswordNotValidError(): Error {
    return new Error(
        `Password is not valid. It must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`
    )
}