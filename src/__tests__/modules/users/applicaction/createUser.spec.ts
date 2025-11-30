import { describe, it, expect, beforeEach, vi } from 'vitest'

import { UserRepositoryMock } from './UserRepositoryMock'
import { UserMother } from '../domain/mothers/UserMother'
import { isUserPasswordValid } from '../../../../modules/users/domain/validations/UserPassword';
import { CreateUser, CreateUserCommand } from '../../../../modules/users/application/users/create/createUser';

describe('CreateUser use case', () => {
    let repo: UserRepositoryMock
    let useCase: CreateUser

    const VALID_ID_1 = '123e4567-e89b-12d3-a456-426614174000'
    const VALID_ID_2 = '123e4567-e89b-12d3-a456-426614174001'
    const VALID_ID_3 = '123e4567-e89b-12d3-a456-426614174002'

    beforeEach(() => {
        repo = new UserRepositoryMock()
        useCase = new CreateUser(repo)

        // Ensure crypto.randomUUID exists in test environment
        if (!globalThis.crypto) {
            globalThis.crypto = {} as Crypto
        }
        if (!globalThis.crypto.randomUUID) {
            globalThis.crypto.randomUUID = vi.fn(() => 'test-uuid-1234') as unknow
        }
    })

    it('should create a valid user and persist it in the repository', async () => {
        const base = UserMother.valid()

        const command: CreateUserCommand = {
            name: base.name,
            lastname: base.lastname,
            email: base.email,
            dni: base.dni,
            roleId: base.roleId,
            areaId: base.areaId,
            password: 'StrongPass123',
        }

        const created = await useCase.execute(command)

        // repository should have been called and contain the new user
        expect(repo.save).toHaveBeenCalledTimes(1)
        expect(repo.users).toHaveLength(1)

        const saved = repo.users[0]
        expect(saved.id).toBeDefined()
        expect(saved.name).toBe(command.name.trim())
        expect(saved.lastname).toBe(command.lastname.trim())
        expect(saved.email).toBe(command.email.trim().toLowerCase())
        expect(saved.dni).toBe(command.dni.trim())
        expect(saved.roleId).toBe(command.roleId)
        expect(saved.areaId).toBe(command.areaId)

        // use case should return the created user
        expect(created.id).toBe(saved.id)
        expect(created.email).toBe(saved.email)
    })

    it('should generate a password based on DNI and initials that is valid by policy', async () => {
        const base = UserMother.valid({
            dni: '72043733',
            name: 'Juan Carlos',
            lastname: 'Pérez López',
        })

        const command: CreateUserCommand = {
            name: base.name,
            lastname: base.lastname,
            email: base.email,
            dni: base.dni,
            roleId: base.roleId,
            areaId: base.areaId,
        }

        const created = await useCase.execute(command)

        // ejemplo: 72043733JCPL
        expect(created.hashPass).toBe('72043733JCPL')
        expect(isUserPasswordValid(created.hashPass)).toBe(true)

        expect(repo.save).toHaveBeenCalledTimes(1)
    })

    it('should throw when user fields do not pass domain validation', async () => {
        const base = UserMother.valid()

        const command: CreateUserCommand = {
            name: 'Ana', // too short for your domain rules
            lastname: base.lastname,
            email: base.email,
            dni: base.dni,
            roleId: base.roleId,
            areaId: base.areaId,
            password: 'StrongPass123',
        }

        await expect(useCase.execute(command)).rejects.toThrow(/Name .* is not valid/)

        expect(repo.save).not.toHaveBeenCalled()
        expect(repo.users).toHaveLength(0)
    })
})
