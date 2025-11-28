export const LASTNAME_MIN_LENGTH = 5;
export const LASTNAME_MAX_LENGTH = 60;

export function isUserLastnameValid(name: string): boolean {
	return name.length >= LASTNAME_MIN_LENGTH && name.length <= LASTNAME_MAX_LENGTH;
}

export function UserLastnameNotValidError(name: string): Error {
	return new Error(`Lastname ${name} is not valid`);
}