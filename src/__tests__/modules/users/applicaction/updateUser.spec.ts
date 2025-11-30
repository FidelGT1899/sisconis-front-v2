import { describe, it, expect, beforeEach } from 'vitest';
import { UserMother } from '../domain/mothers/UserMother'
import { UserRepositoryMock } from './UserRepositoryMock';
import { UpdateUserCommand, UpdateUser } from '../../../../modules/users/application/users/update/updateUser';

describe('UpdateUser use case', () => {
    let repo: UserRepositoryMock
    let useCase: UpdateUser

    const VALID_ID_1 = '123e4567-e89b-12d3-a456-426614174000'
    const VALID_ID_2 = '123e4567-e89b-12d3-a456-426614174001'
    const VALID_ID_3 = '123e4567-e89b-12d3-a456-426614174002'

    beforeEach(() => {
        repo = new UserRepositoryMock()
        useCase = new UpdateUser(repo)
    })

    it('should update an existing user and persist changes', async () => {
        const original = UserMother.valid({
            id: VALID_ID_1,
            email: 'old.email@example.com',
        })
        repo.users = [original]

        const command: UpdateUserCommand = {
            id: VALID_ID_1,              // 👈 mismo id
            name: 'Updated Name',
            lastname: 'Updated Lastname',
            email: 'new.email@example.com',
            dni: original.dni,
            roleId: original.roleId,
            areaId: original.areaId,
            // no new password -> keep hashPass
        }

        const updated = await useCase.execute(command)

        expect(repo.save).toHaveBeenCalledTimes(1)
        expect(repo.users).toHaveLength(1)

        const saved = repo.users[0]
        expect(saved.id).toBe(VALID_ID_1)                // 👈 el id no cambia
        expect(saved.name).toBe('Updated Name')
        expect(saved.lastname).toBe('Updated Lastname')
        expect(saved.email).toBe('new.email@example.com')
        expect(saved.hashPass).toBe(original.hashPass)   // password not changed

        expect(updated).toEqual(saved)
    })

    it('should update the password when a new valid password is provided', async () => {
        const original = UserMother.valid({
            id: VALID_ID_2,
            hashPass: 'OldPass123',
        })
        repo.users = [original]

        const command: UpdateUserCommand = {
            id: VALID_ID_2,              // 👈 mismo id
            name: original.name,
            lastname: original.lastname,
            email: original.email,
            dni: original.dni,
            roleId: original.roleId,
            areaId: original.areaId,
            password: 'NewStrongPass123',
        }

        const updated = await useCase.execute(command)

        expect(updated.hashPass).toBe('NewStrongPass123')
        expect(repo.save).toHaveBeenCalledTimes(1)
    })

    it('should throw when trying to update a non-existing user', async () => {
        repo.users = [] // empty repository

        const command: UpdateUserCommand = {
            id: 'non-existing-id',
            name: 'Test',
            lastname: 'Test',
            email: 'test@example.com',
            dni: '12345678',
            roleId: 'role-1',
            areaId: 'area-1',
        }

        await expect(useCase.execute(command)).rejects.toThrow(/User with id .* not found/)
        expect(repo.save).not.toHaveBeenCalled()
    })

    it('should throw when the new data does not pass domain validation', async () => {
        const original = UserMother.valid({ id: VALID_ID_3 })
        repo.users = [original]

        const command: UpdateUserCommand = {
            id: VALID_ID_3,             // 👈 mismo id
            name: 'Ana',                // too short, invalid by domain
            lastname: original.lastname,
            email: original.email,
            dni: original.dni,
            roleId: original.roleId,
            areaId: original.areaId,
        }

        await expect(useCase.execute(command)).rejects.toThrow(/Name .* is not valid/)
        expect(repo.save).not.toHaveBeenCalled()
    })
})