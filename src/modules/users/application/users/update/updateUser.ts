import type { User } from '@users/domain/entities/User'
import type { UserRepository } from '@users/domain/repositories/UserRepository'
import { ensureUserIsValid } from '@users/domain/entities/User'
import { isUserPasswordValid, UserPasswordNotValidError } from '../../../domain/validations/UserPassword'

export interface UpdateUserCommand {
  id: string
  name: string
  lastname: string
  email: string
  roleId: string
  areaId: string
  password?: string
}

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(command: UpdateUserCommand): Promise<User> {
    const existing = await this.userRepository.get(command.id)
    if (!existing) {
      throw new Error(`User with id ${command.id} not found`)
    }

    let hashPass = existing.hashPass

    if (command.password && command.password.length > 0) {
      if (!isUserPasswordValid(command.password)) {
        throw UserPasswordNotValidError()
      }

      hashPass = command.password
    }

    const updated: User = {
      ...existing,
      name: command.name.trim(),
      lastname: command.lastname.trim(),
      email: command.email.trim().toLowerCase(),
      roleId: command.roleId,
      areaId: command.areaId,
      hashPass,
    }

    ensureUserIsValid(updated)
    await this.userRepository.save(updated)

    return updated
  }
}
