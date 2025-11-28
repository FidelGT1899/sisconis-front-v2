import type { User } from '@users/domain/entities/User'
import type { UserRepository } from '@users/domain/repositories/UserRepository'

export class getAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    // Aquí podrías meter reglas de negocio (filtros, orden, etc.)
    const users = await this.userRepository.getAll()
    return users
  }
}
