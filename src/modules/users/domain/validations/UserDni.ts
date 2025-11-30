export const DNI_LENGTH = 8

export function isUserDniValid(dni: string): boolean {
    const onlyDigits = /^[0-9]+$/.test(dni)
    return onlyDigits && dni.length === DNI_LENGTH
}

export function UserDniNotValidError(dni: string): Error {
    return new Error(`DNI ${dni} is not valid`)
}

//TODO:Validación de DNI único
