import type { User } from '@users/domain/entities/User'
import type { UserRepository } from '@users/domain/repositories/UserRepository'
import { ensureUserIsValid } from '@users/domain/entities/User'
import { isUserPasswordValid, UserPasswordNotValidError } from '@users/domain/validations/UserPassword'

export interface CreateUserCommand {
  name: string
  lastname: string
  email: string
  dni: string
  roleId: string
  areaId: string
}

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(command: CreateUserCommand): Promise<User> {
    const hashPass = this.generatePassword(command.dni, command.name, command.lastname)

    if (!isUserPasswordValid(hashPass)) {
      throw UserPasswordNotValidError()
    }

    const user: User = {
      id: crypto.randomUUID(),
      name: command.name.trim(),
      lastname: command.lastname.trim(),
      email: command.email.trim().toLowerCase(),
      dni: command.dni.trim(),
      hashPass,
      roleId: command.roleId,
      areaId: command.areaId,
      creation_date: new Date(),
    }

    ensureUserIsValid(user)

    await this.userRepository.save(user)

    return user
  }

  generatePassword(dni: string, name: string, lastname: string): string {
    const cleanDni = dni.trim();

    const firstNames = name.trim().split(" ");
    const initialName1 = firstNames[0]?.charAt(0).toUpperCase() || "";
    const initialName2 = firstNames[1]?.charAt(0).toUpperCase() || "";

    const lastnames = lastname.trim().split(" ");

    const initialLast1 = lastnames[0]?.charAt(0).toUpperCase() || "";
    const initialLast2 = lastnames[1]?.charAt(0).toUpperCase() || "";

    return `${cleanDni}${initialName1}${initialName2}${initialLast1}${initialLast2}`;
  }

}
