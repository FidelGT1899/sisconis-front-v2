import { UserIdNotValidError, isUserIdValid } from "@users/domain/validations/UserId";
import { UserNameNotValidError, isUserNameValid } from "@users/domain/validations/UserName";
import { UserLastnameNotValidError, isUserLastnameValid } from "@users/domain/validations/UserLastname";
import { isUserEmailValid, UserEmailNotValidError } from "../validations/UserEmail";

export interface User {
	id: string;
	name: string;
	lastname: string;
	email: string;
	hashPass: string;

	roleId: string;
	areaId: string;

	creation_date?: Date;
}


export function ensureUserIsValid({ id, name, lastname, email }: User): void {
	if (!isUserIdValid(id)) {
		throw UserIdNotValidError(id);
	}
	if (!isUserNameValid(name)) {
		throw UserNameNotValidError(name);
	}
	if (!isUserLastnameValid(lastname)) {
		throw UserLastnameNotValidError(lastname);
	}
	if (!isUserEmailValid(email)) {
		throw UserEmailNotValidError(email)
	}
}