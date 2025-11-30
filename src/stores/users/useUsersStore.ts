import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { User } from '@users/domain/entities/User'
import type { Role } from '@users/domain/entities/Role'
import type { Area } from '@users/domain/entities/Area'
import type { Department } from '@users/domain/entities/Department'
import { useNotificationsStore } from '@store/ui/useNotificationsStore'

import {
    getAllUsersUseCase,
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    deleteManyUsersUseCase,
} from '@users/infrastructure/userModule'

// helper para no repetir lógica en los catch
function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
        return error.message
    }
    return fallback
}

export const useUsersStore = defineStore('users', () => {
    const notifications = useNotificationsStore()

    const users = ref<User[]>([])
    const roles = ref<Role[]>([])
    const areas = ref<Area[]>([])
    const departments = ref<Department[]>([])

    const loading = ref(false)
    const error = ref<string | null>(null)

    const searchTerm = ref('')
    const page = ref(1)
    const pageSize = ref(8)

    function loadRelatedDataFromSession() {
        if (typeof window === 'undefined') return
        roles.value = JSON.parse(sessionStorage.getItem('sisconis.roles') ?? '[]')
        areas.value = JSON.parse(sessionStorage.getItem('sisconis.areas') ?? '[]')
        departments.value = JSON.parse(
            sessionStorage.getItem('sisconis.departments') ?? '[]',
        )
    }

    const filteredUsers = computed<User[]>(() => {
        if (!searchTerm.value) return users.value

        const term = searchTerm.value.toLowerCase().trim()

        return users.value.filter(u => {
            const area = areas.value.find(a => a.id === u.areaId)
            const role = roles.value.find(r => r.id === u.roleId)
            const dept = area
                ? departments.value.find(d => d.id === area.departmentId)
                : undefined

            const target = [
                u.name,
                u.lastname,
                u.email,
                u.dni,
                role?.name ?? '',
                area?.name ?? '',
                dept?.name ?? '',
            ]
                .join(' ')
                .toLowerCase()

            return target.includes(term)
        })
    })

    const totalItems = computed(() => filteredUsers.value.length)

    const paginatedUsers = computed<User[]>(() => {
        const start = (page.value - 1) * pageSize.value
        return filteredUsers.value.slice(start, start + pageSize.value)
    })

    const totalPages = computed(() => {
        if (pageSize.value <= 0) return 1
        return Math.max(1, Math.ceil(totalItems.value / pageSize.value))
    })

    async function loadUsers() {
        loading.value = true
        error.value = null
        try {
            users.value = await getAllUsersUseCase.execute()
            loadRelatedDataFromSession()
        } catch (e: unknown) {
            console.error(e)
            error.value = getErrorMessage(e, 'Error cargando usuarios')
        } finally {
            loading.value = false
        }
    }

    function setPage(newPage: number) {
        const safe = Math.min(Math.max(newPage, 1), totalPages.value)
        page.value = safe
    }

    function search(term: string) {
        searchTerm.value = term
    }

    async function createUser(payload: {
        name: string
        lastname: string
        email: string
        dni: string
        roleId: string
        areaId: string
    }) {
        loading.value = true
        error.value = null
        try {
            await createUserUseCase.execute(payload)
            await loadUsers()
            notifications.success('Usuario creado correctamente 🎉', { withConfetti: true })
        } catch (e: unknown) {
            const msg = getErrorMessage(e, 'Error creando usuario')
            notifications.error(msg)
            throw e
        } finally {
            loading.value = false
        }
    }

    async function updateUser(payload: {
        id: string
        name: string
        lastname: string
        email: string
        dni: string
        roleId: string
        areaId: string
        password?: string
    }) {
        loading.value = true
        error.value = null
        try {
            await updateUserUseCase.execute(payload)
            await loadUsers()
            notifications.success('Usuario actualizado correctamente 🎉', { withConfetti: true })
        } catch (e: unknown) {
            const msg = getErrorMessage(e, 'Error actualizando usuario')
            notifications.error(msg)
            throw e
        } finally {
            loading.value = false
        }
    }

    async function deleteOne(id: string) {
        loading.value = true
        error.value = null
        try {
            await deleteUserUseCase.execute(id)
            await loadUsers()
            notifications.success('Usuario eliminado 🎉', { withConfetti: true })
        } catch (e: unknown) {
            console.error(e)
            const msg = getErrorMessage(e, 'Error eliminando usuario')
            notifications.error(msg)
            throw e
        } finally {
            loading.value = false
        }
    }

    async function deleteMany(ids: string[]) {
        if (!ids.length) return
        loading.value = true
        error.value = null
        try {
            await deleteManyUsersUseCase.execute(ids)
            await loadUsers()
            notifications.success(`Se eliminaron ${ids.length} usuarios 🎉`, { withConfetti: true })
        } catch (e: unknown) {
            console.error(e)
            const msg = getErrorMessage(e, 'Error eliminando usuarios')
            notifications.error(msg)
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        // state
        users,
        roles,
        areas,
        departments,
        loading,
        error,
        searchTerm,
        page,
        pageSize,

        // getters
        filteredUsers,
        paginatedUsers,
        totalItems,
        totalPages,

        // actions
        loadUsers,
        setPage,
        search,
        createUser,
        updateUser,
        deleteOne,
        deleteMany,
    }
})
