export function mapUserErrorToMessage(err: unknown): string {
    if (!(err instanceof Error)) {
        return 'Ocurrió un error inesperado. Inténtalo de nuevo.'
    }

    const msg = err.message

    if (msg.includes('Name') && msg.includes('is not valid')) {
        return 'El nombre debe tener entre 5 y 60 caracteres.'
    }

    if (msg.includes('Lastname') && msg.includes('is not valid')) {
        return 'El apellido debe tener entre 5 y 60 caracteres.'
    }

    if (msg.includes('Email') && msg.includes('is not valid')) {
        return 'El correo electrónico no es válido.'
    }

    if (msg.includes('Password') && msg.includes('is not valid')) {
        return 'La contraseña debe tener entre 8 y 128 caracteres.'
    }

    if (msg.includes('Id') && msg.includes('is not valid')) {
        return 'El identificador del usuario no es válido.'
    }

    return msg
}
