export function isUserAreaValid(areaId: string, existingAreaIds: string[]): boolean {
    if (!areaId) return false
    return existingAreaIds.includes(areaId)
}

export function UserAreaNotValidError(areaId: string): Error {
    return new Error(`Area ${areaId} is not valid`)
}
