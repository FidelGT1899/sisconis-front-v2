import type { UserRepository } from '@users/domain/repositories/UserRepository'

export class DeleteManyUsers {
    constructor(private readonly repo: UserRepository) { }

    async execute(ids: string[]): Promise<void> {
        if (!ids.length) return
        await this.repo.deleteMany(ids)
    }
}
