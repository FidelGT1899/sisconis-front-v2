export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 50

export function isUserPasswordValid(password: string): boolean {
    return (
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH
    )
}

export function UserPasswordNotValidError(): Error {
    return new Error('Password is not valid')
}
