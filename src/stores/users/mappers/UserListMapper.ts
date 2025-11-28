import type { User } from '@/modules/users/domain/entities/User'
import type { Role } from '@/modules/users/domain/entities/Role'
import type { Area } from '@/modules/users/domain/entities/Area'
import type { Department } from '@/modules/users/domain/entities/Department'
import type { UserListItemDTO } from '../dtos/userListItemDTO'

export class UserListMapper {
    static map(
        users: User[],
        roles: Role[],
        areas: Area[],
        departments: Department[]
    ): UserListItemDTO[] {
        return users.map(u => {
            const area = areas.find(a => a.id === u.areaId)
            const role = roles.find(r => r.id === u.roleId)
            const dept = area
                ? departments.find(d => d.id === area.departmentId)
                : undefined

            return {
                id: u.id,
                fullName: `${u.name} ${u.lastname}`,
                email: u.email,
                roleName: role?.name ?? 'Sin rol',
                areaName: area?.name ?? 'Sin área',
                departmentName: dept?.name ?? 'Sin departamento',
            }
        })
    }
}
