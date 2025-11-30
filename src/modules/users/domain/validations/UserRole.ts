export function isUserRoleValid(roleId: string, existingRoleIds: string[]): boolean {
    if (!roleId) return false
    return existingRoleIds.includes(roleId)
}

export function UserRoleNotValidError(roleId: string): Error {
    return new Error(`Role ${roleId} is not valid`)
}
