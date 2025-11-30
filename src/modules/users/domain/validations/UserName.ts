export const NAME_MIN_LENGTH = 5
export const NAME_MAX_LENGTH = 60
const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/

export function isUserNameValid(name: string): boolean {
	if (!name) return false
	const lenOk = name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH
	const patternOk = NAME_REGEX.test(name)
	return lenOk && patternOk
}

export function UserNameNotValidError(name: string): Error {
	return new Error(`Name ${name} is not valid`)
}