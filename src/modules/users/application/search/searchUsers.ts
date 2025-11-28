import type { UserRepository } from "@users/domain/repositories/UserRepository";
import type { User } from "@users/domain/entities/User";

export class SearchUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(term: string): Promise<User[]> {
    return this.repository.search(term.trim().toLowerCase());
  }
}
