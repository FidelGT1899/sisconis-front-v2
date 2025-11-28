<script setup lang="ts">
import type { User } from '@users/domain/entities/User'
import type { Role } from '@users/domain/entities/Role'
import type { Area } from '@users/domain/entities/Area'
import type { Department } from '@users/domain/entities/Department'
import { computed, ref } from 'vue'

const props = defineProps<{
    users: User[]
    loading: boolean
    error: string | null
    roles: Role[]
    areas: Area[]
    departments: Department[]
    page: number
    pageSize: number
    totalItems: number
}>()

const emit = defineEmits<{
    (e: 'update:page', value: number): void
    (e: 'selectChange', selectedIds: string[]): void
    (e: 'deleteSelected', selectedIds: string[]): void
    (e: 'deleteOne', id: string): void
    (e: 'editOne', id: string): void
}>()

// seleccionados (por ID)
const selectedIds = ref<string[]>([])

function isSelected(userId: string) {
    return selectedIds.value.includes(userId)
}

function toggleRow(userId: string, checked: boolean) {
    if (checked) {
        if (!selectedIds.value.includes(userId)) {
            selectedIds.value = [...selectedIds.value, userId]
        }
    } else {
        selectedIds.value = selectedIds.value.filter(id => id !== userId)
    }
    emit('selectChange', selectedIds.value)
}

// ¿todos los visibles están seleccionados?
const allVisibleSelected = computed(() => {
    return (
        props.users.length > 0 &&
        props.users.every(u => selectedIds.value.includes(u.id))
    )
})

function toggleSelectAll(checked: boolean) {
    if (checked) {
        const pageIds = props.users.map(u => u.id)
        const set = new Set([...selectedIds.value, ...pageIds])
        selectedIds.value = Array.from(set)
    } else {
        const pageIds = props.users.map(u => u.id)
        selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
    }
    emit('selectChange', selectedIds.value)
}

function handleDeleteSelected() {
    if (selectedIds.value.length === 0) return
    emit('deleteSelected', selectedIds.value)
    selectedIds.value = []
}

// paginación
const totalPages = computed(() => {
    if (props.pageSize <= 0) return 1
    return Math.max(1, Math.ceil(props.totalItems / props.pageSize))
})

function goToPage(page: number) {
    const safePage = Math.min(Math.max(page, 1), totalPages.value)
    if (safePage !== props.page) {
        emit('update:page', safePage)
    }
}

function goToPrev() {
    goToPage(props.page - 1)
}

function goToNext() {
    goToPage(props.page + 1)
}

// helpers de nombres
function getAreaName(areaId: string) {
    return props.areas.find(a => a.id === areaId)?.name ?? 'Sin área'
}

function getRoleName(roleId: string) {
    return props.roles.find(r => r.id === roleId)?.name ?? 'Sin rol'
}

function getDepartmentNameByAreaId(areaId: string) {
    const area = props.areas.find(a => a.id === areaId)
    if (!area) return 'Sin departamento'
    const dept = props.departments.find(d => d.id === area.departmentId)
    return dept?.name ?? 'Sin departamento'
}
</script>

<template>
    <div class="bg-base-200 rounded-box p-2">
        <!-- Barra superior: info + botón eliminar -->
        <div class="flex items-center justify-between mb-2">
            <div class="text-sm opacity-70">
                Mostrando
                <span class="font-semibold">
                    {{ users.length }}
                </span>
                de
                <span class="font-semibold">
                    {{ totalItems }}
                </span>
                usuarios
            </div>

            <button class="btn btn-sm btn-error" :disabled="selectedIds.length === 0" @click="handleDeleteSelected">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18" />
                    <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6h6" />
                    <path d="M10 3h4l1 3H9l1-3z" />
                </svg>
                {{ selectedIds.length === 0 ? '' : selectedIds.length }}
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" :checked="allVisibleSelected"
                                    :indeterminate="!allVisibleSelected && selectedIds.length > 0"
                                    @change="toggleSelectAll(($event.target as HTMLInputElement).checked)" />
                            </label>
                        </th>
                        <th>Nombre</th>
                        <th>Área / Depto</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Loading -->
                    <tr v-if="loading">
                        <td colspan="5" class="text-center py-6">Cargando usuarios...</td>
                    </tr>

                    <!-- Error -->
                    <tr v-else-if="error">
                        <td colspan="5" class="text-center text-error py-6">
                            {{ error }}
                        </td>
                    </tr>

                    <!-- Sin datos -->
                    <tr v-else-if="!users.length">
                        <td colspan="5" class="text-center py-6 opacity-70">
                            No hay usuarios para mostrar.
                        </td>
                    </tr>

                    <!-- Datos -->
                    <tr v-else v-for="user in users" :key="user.id">
                        <td>
                            <label>
                                <input type="checkbox" class="checkbox" :checked="isSelected(user.id)"
                                    @change="toggleRow(user.id, ($event.target as HTMLInputElement).checked)" />
                            </label>
                        </td>

                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
                                        <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">
                                        {{ user.name }} {{ user.lastname }}
                                    </div>
                                    <div class="text-sm opacity-50">
                                        {{ getRoleName(user.roleId) }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td>
                            {{ getAreaName(user.areaId) }}
                            <br />
                            <span class="badge badge-ghost badge-sm">
                                {{ getDepartmentNameByAreaId(user.areaId) }}
                            </span>
                        </td>

                        <td>
                            {{ user.email }}
                        </td>

                        <td>
                            <div class="flex gap-1">
                                <!-- Botón EDITAR -->
                                <button class="btn btn-ghost btn-xs" type="button" @click="emit('editOne', user.id)"
                                    title="Editar usuario">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>

                                <!-- Botón ELIMINAR -->
                                <button class="btn btn-ghost btn-xs text-error" type="button"
                                    @click="emit('deleteOne', user.id)" title="Eliminar usuario">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6l1-3h4l1 3" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Área / Depto</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Paginación -->
        <div class="flex items-center justify-between mt-3">
            <div class="text-xs opacity-70">
                Página
                <span class="font-semibold">{{ page }}</span>
                de
                <span class="font-semibold">{{ totalPages }}</span>
            </div>

            <div class="join">
                <button class="btn btn-sm join-item" :disabled="page <= 1" @click="goToPrev">
                    «
                </button>
                <button class="btn btn-sm join-item pointer-events-none">
                    {{ page }}
                </button>
                <button class="btn btn-sm join-item" :disabled="page >= totalPages" @click="goToNext">
                    »
                </button>
            </div>
        </div>
    </div>
</template>
