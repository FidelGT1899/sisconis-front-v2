export const LASTNAME_MIN_LENGTH = 5
export const LASTNAME_MAX_LENGTH = 60
const LASTNAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/

export function isUserLastnameValid(lastname: string): boolean {
	if (!lastname) return false
	const lenOk =
		lastname.length >= LASTNAME_MIN_LENGTH &&
		lastname.length <= LASTNAME_MAX_LENGTH
	const patternOk = LASTNAME_REGEX.test(lastname)
	return lenOk && patternOk
}

export function UserLastnameNotValidError(lastname: string): Error {
	return new Error(`Lastname ${lastname} is not valid`)
}
