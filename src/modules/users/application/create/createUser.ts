import type { User } from '@users/domain/entities/User'
import type { UserRepository } from '@users/domain/repositories/UserRepository'
import { ensureUserIsValid } from '@users/domain/entities/User'
import { isUserPasswordValid, UserPasswordNotValidError } from '../../domain/validations/UserPassword'

export interface CreateUserCommand {
  name: string
  lastname: string
  email: string
  roleId: string
  areaId: string
  password: string
}

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(command: CreateUserCommand): Promise<User> {
    if (!isUserPasswordValid(command.password)) {
      throw UserPasswordNotValidError()
    }

    const hashPass = command.password
    // 1. Construimos el User de dominio
    const user: User = {
      id: crypto.randomUUID(),
      name: command.name.trim(),
      lastname: command.lastname.trim(),
      email: command.email.trim().toLowerCase(),
      hashPass,
      roleId: command.roleId,
      areaId: command.areaId,
      creation_date: new Date(),
    }

    ensureUserIsValid(user)

    await this.userRepository.save(user)

    return user
  }
}
