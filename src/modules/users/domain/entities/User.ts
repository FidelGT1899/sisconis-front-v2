import { UserIdNotValidError, isUserIdValid } from "@users/domain/validations/UserId";
import { UserNameNotValidError, isUserNameValid } from "@users/domain/validations/UserName";
import { UserLastnameNotValidError, isUserLastnameValid } from "@users/domain/validations/UserLastname";
import { isUserEmailValid, UserEmailNotValidError } from "../validations/UserEmail";
import { isUserPasswordValid, UserPasswordNotValidError } from "../validations/UserPassword";
import { isUserAreaValid, UserAreaNotValidError } from "../validations/UserArea";
import { isUserRoleValid, UserRoleNotValidError } from "../validations/UserRole";
import { isUserDniValid, UserDniNotValidError } from "../validations/UserDni";


export interface User {
	id: string
	name: string
	lastname: string
	email: string
	dni: string
	areaId: string
	roleId: string
	hashPass: string
	creation_date?: Date
}

export interface UserValidationContext {
	existingAreaIds?: string[]
	existingRoleIds?: string[]
}

export function ensureUserIsValid(
	{ id, name, lastname, email, hashPass, dni, areaId, roleId }: User,
	ctx: UserValidationContext = {}
): void {
	if (!isUserIdValid(id)) {
		throw UserIdNotValidError(id)
	}

	if (!isUserNameValid(name)) {
		throw UserNameNotValidError(name)
	}

	if (!isUserLastnameValid(lastname)) {
		throw UserLastnameNotValidError(lastname)
	}

	if (!isUserEmailValid(email)) {
		throw UserEmailNotValidError(email)
	}

	if (!isUserDniValid(dni)) throw UserDniNotValidError(dni)

	if (!isUserPasswordValid(hashPass)) {
		throw UserPasswordNotValidError()
	}

	if (ctx.existingAreaIds && !isUserAreaValid(areaId, ctx.existingAreaIds)) {
		throw UserAreaNotValidError(areaId)
	}

	if (ctx.existingRoleIds && !isUserRoleValid(roleId, ctx.existingRoleIds)) {
		throw UserRoleNotValidError(roleId)
	}
}