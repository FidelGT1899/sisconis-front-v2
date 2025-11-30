import type { UserRepository } from '@users/domain/repositories/UserRepository'

export class DeleteUser {
    constructor(private readonly repo: UserRepository) { }

    async execute(id: string): Promise<void> {
        await this.repo.delete(id)
    }
}