import { vi } from 'vitest'
import type { UserRepository } from '@/modules/users/domain/repositories/UserRepository'
import type { User } from '@/modules/users/domain/entities/User'

export class UserRepositoryMock implements UserRepository {
    public users: User[] = []

    save = vi.fn(async (user: User) => {
        const idx = this.users.findIndex(u => u.id === user.id)
        if (idx === -1) {
            this.users.push(user)
        } else {
            this.users[idx] = user
        }
    })

    get = vi.fn(async (id: string) => {
        return this.users.find(u => u.id === id) ?? null
    })

    getAll = vi.fn(async () => {
        return [...this.users]
    })

    // si tienes estos métodos en el repo real, añádelos:
    delete = vi.fn(async (id: string) => {
        this.users = this.users.filter(u => u.id !== id)
    })

    deleteMany = vi.fn(async (ids: string[]) => {
        const set = new Set(ids)
        this.users = this.users.filter(u => !set.has(u.id))
    })
}
