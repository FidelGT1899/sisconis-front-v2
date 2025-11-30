import { User } from '../../../../../modules/users/domain/entities/User';

export class UserMother {
    static valid(overrides: Partial<User> = {}): User {
        const base: User = {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Juan Carlos',
            lastname: 'Pérez López',
            dni: '72043733',
            email: 'juan.perez@example.com',
            hashPass: 'SuperSecure123',
            areaId: 'area-1',
            roleId: 'role-1',
            creation_date: new Date(),
        }

        return {
            ...base,
            ...overrides,
        }
    }

    static withInvalidId(): User {
        return this.valid({ id: 'invalid-uuid' })
    }

    static withShortName(): User {
        return this.valid({ name: 'Ana' })
    }

    static withNumericName(): User {
        return this.valid({ name: 'Juan123' })
    }

    static withTooLongName(): User {
        return this.valid({ name: 'a'.repeat(61) })
    }

    static withShortLastname(): User {
        return this.valid({ lastname: 'Abc' })
    }

    static withNumericLastname(): User {
        return this.valid({ lastname: 'García9' })
    }

    static withInvalidEmail(): User {
        return this.valid({ email: 'no-es-email' })
    }

    static withInvalidDni(): User {
        return this.valid({ dni: "123" })
    }

    static withNonNumericDni(): User {
        return this.valid({ dni: "12A45B78" })
    }

    static withTooLongDni(): User {
        return this.valid({ dni: "123456789" })
    }

    static withShortPassword(): User {
        return this.valid({ hashPass: '1234567' })
    }

    static withInvalidArea(areaId = 'area-x'): User {
        return this.valid({ areaId })
    }

    static withInvalidRole(roleId = 'role-x'): User {
        return this.valid({ roleId })
    }
}