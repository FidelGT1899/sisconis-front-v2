import { describe, it, expect } from 'vitest'

import { UserMother } from './mothers/UserMother'
import { ensureUserIsValid } from '../../../../modules/users/domain/entities/User'

const ctx = {
    existingAreaIds: ['area-1', 'area-2'],
    existingRoleIds: ['role-1', 'role-2'],
}

describe('User domain: ensureUserIsValid', () => {
    it('should NOT throw when the user is valid', () => {
        const user = UserMother.valid()

        expect(() => ensureUserIsValid(user, ctx)).not.toThrow()
    })

    it('should throw when the id is invalid', () => {
        const user = UserMother.withInvalidId()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Id .* is not valid/)
    })

    it('should throw when the name is too short', () => {
        const user = UserMother.withShortName()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Name .* is not valid/)
    })

    it('should throw when the name contains non-alphabetic characters', () => {
        const user = UserMother.withNumericName()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Name .* is not valid/)
    })

    it('should throw when the name is too long', () => {
        const user = UserMother.withTooLongName()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Name .* is not valid/)
    })

    it('should throw when the lastname is too short', () => {
        const user = UserMother.withShortLastname()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Lastname .* is not valid/)
    })

    it('should throw when the lastname contains non-alphabetic characters', () => {
        const user = UserMother.withNumericLastname()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Lastname .* is not valid/)
    })

    it('should throw when the email is invalid', () => {
        const user = UserMother.withInvalidEmail()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Email .* is not valid/)
    })

    it('should throw when DNI does not contain exactly 8 digits', () => {
        const user = UserMother.withInvalidDni()
        expect(() => ensureUserIsValid(user, ctx)).toThrow(/DNI .* is not valid/)
    })

    it('should throw when DNI contains non-numeric characters', () => {
        const user = UserMother.withNonNumericDni()
        expect(() => ensureUserIsValid(user, ctx)).toThrow(/DNI .* is not valid/)
    })

    it('should throw when DNI contains more than 8 digits', () => {
        const user = UserMother.withTooLongDni()
        expect(() => ensureUserIsValid(user, ctx)).toThrow(/DNI .* is not valid/)
    })

    it('should throw when the password is too short', () => {
        const user = UserMother.withShortPassword()

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Password is not valid/)
    })

    it('should throw when the area does not exist in the context', () => {
        const user = UserMother.withInvalidArea('area-x')

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Area .* is not valid/)
    })

    it('should throw when the role does not exist in the context', () => {
        const user = UserMother.withInvalidRole('role-x')

        expect(() => ensureUserIsValid(user, ctx)).toThrow(/Role .* is not valid/)
    })
})