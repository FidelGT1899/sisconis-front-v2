import type { UserRepository } from '@users/domain/repositories/UserRepository'
import type { User } from '@users/domain/entities/User'
import type { Role } from '@users/domain/entities/Role'
import type { Area } from '@users/domain/entities/Area'
import { ensureUserIsValid } from '@users/domain/entities/User'
import type { Department } from '@users/domain/entities/Department'

const STORAGE_KEY = 'sisconis.users'

function seedData(): User[] {
  const roles: Role[] = [
    { id: 'role-1', name: 'Administrador', lvl_hierarchical: 1, config: true },
    { id: 'role-2', name: 'Usuario', lvl_hierarchical: 2, config: false },
  ]

  const departments: Department[] = [
    { id: 'dep-1', name: 'Tecnología' },
    { id: 'dep-2', name: 'Administración' },
  ]

  const areas: Area[] = [
    {
      id: 'area-1',
      name: 'Sistemas',
      departmentId: 'dep-1',
      bossUserId: 'u-1',
      creation_date: new Date(),
    },
    {
      id: 'area-2',
      name: 'Recursos Humanos',
      departmentId: 'dep-2',
      bossUserId: 'u-2',
      creation_date: new Date(),
    },
  ]

  const users: User[] = [
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c2',
      name: 'Hart',
      lastname: 'Hagerty',
      email: 'hart.hagerty@example.com',
      hashPass: '***',
      roleId: 'role-1',
      areaId: 'area-1',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c3',
      name: 'Brice',
      lastname: 'Swyre',
      email: 'brice.swyre@example.com',
      hashPass: '***',
      roleId: 'role-2',
      areaId: 'area-2',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c1',
      name: 'Hart',
      lastname: 'Hagerty',
      email: 'hart.hagerty@example.com',
      hashPass: '***',
      roleId: 'role-1',
      areaId: 'area-1',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c4',
      name: 'Brice',
      lastname: 'Swyre',
      email: 'brice.swyre@example.com',
      hashPass: '***',
      roleId: 'role-2',
      areaId: 'area-2',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c5',
      name: 'Hart',
      lastname: 'Hagerty',
      email: 'hart.hagerty@example.com',
      hashPass: '***',
      roleId: 'role-1',
      areaId: 'area-1',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c6',
      name: 'Brice',
      lastname: 'Swyre',
      email: 'brice.swyre@example.com',
      hashPass: '***',
      roleId: 'role-2',
      areaId: 'area-2',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c7',
      name: 'Hart',
      lastname: 'Hagerty',
      email: 'hart.hagerty@example.com',
      hashPass: '***',
      roleId: 'role-1',
      areaId: 'area-1',
      creation_date: new Date(),
    },
    {
      id: 'aac41cab-7915-42e2-be44-c70c699691c8',
      name: 'Brice',
      lastname: 'Swyre',
      email: 'brice.swyre@example.com',
      hashPass: '***',
      roleId: 'role-2',
      areaId: 'area-2',
      creation_date: new Date(),
    },
  ]

  sessionStorage.setItem('sisconis.roles', JSON.stringify(roles))
  sessionStorage.setItem('sisconis.areas', JSON.stringify(areas))
  sessionStorage.setItem('sisconis.departments', JSON.stringify(departments))

  return users
}

export class InMemoryUserRepository implements UserRepository {
  private ensureStorageInitialized() {
    if (typeof window === 'undefined') return

    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seed = seedData()
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    }
  }

  async getAll(): Promise<User[]> {
    this.ensureStorageInitialized()

    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    return JSON.parse(raw) as User[]
  }

  async get(id: string): Promise<User | null> {
    const users = await this.getAll()
    return users.find(u => u.id === id) ?? null
  }

  async save(user: User): Promise<void> {
    this.ensureStorageInitialized()
    ensureUserIsValid(user)

    const users = await this.getAll()
    const index = users.findIndex(u => u.id === user.id)

    if (index === -1) users.push(user)
    else users[index] = user

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }

  async search(term: string): Promise<User[]> {
    this.ensureStorageInitialized();

    if (typeof window === "undefined") return [];

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const users = JSON.parse(raw) as User[];

    if (!term) return users;

    return users.filter((u) => {
      const areaName = u.areaId ?? "";
      const target = [
        u.name,
        u.lastname,
        u.email,
        u.roleId,
        areaName,
      ]
        .join(" ")
        .toLowerCase();

      return target.includes(term);
    });
  }
  async delete(id: string): Promise<void> {
    this.ensureStorageInitialized()

    if (typeof window === 'undefined') return

    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return

    const users = JSON.parse(raw) as User[]

    const filtered = users.filter(u => u.id !== id)

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  }

  async deleteMany(ids: string[]): Promise<void> {
    this.ensureStorageInitialized()

    if (typeof window === 'undefined') return

    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return

    const users = JSON.parse(raw) as User[]

    const filtered = users.filter(u => !ids.includes(u.id))

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  }
}

