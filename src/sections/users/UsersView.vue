<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import UsersTable from './components/UsersTable.vue'
import UserForm from './components/UserForm.vue'
import UserFormEdit from './components/UserFormEdit.vue'

import { useUsersStore } from '@store/users/useUsersStore'
import type { User } from '@users/domain/entities/User'

const usersStore = useUsersStore()
const {
    paginatedUsers,
    loading,
    error,
    roles,
    areas,
    departments,
    page,
    pageSize,
    totalItems,
    searchTerm,
    users, // opcional, para seleccionar al editar
} = storeToRefs(usersStore)

const { loadUsers, setPage, deleteMany, deleteOne, search } = usersStore

const modalRef = ref<InstanceType<typeof UserForm> | null>(null)
const editModalRef = ref<InstanceType<typeof UserFormEdit> | null>(null)
const selectedUser = ref<User | null>(null)

function openCreateModal() {
    modalRef.value?.open()
}

async function handleUserCreated() {
    await loadUsers()
}

async function handleDeleteSelected(ids: string[]) {
    if (!ids.length) return
    const ok = confirm(`¿Eliminar ${ids.length} usuarios seleccionados?`)
    if (!ok) return
    await deleteMany(ids)
}

async function handleDeleteOne(id: string) {
    const ok = confirm('¿Eliminar este usuario?')
    if (!ok) return
    await deleteOne(id)
}

async function handleEditOne(id: string) {
    const u = users.value.find(u => u.id === id)
    if (!u) return

    selectedUser.value = u

    // 👇 MUY IMPORTANTE para que no necesites 2 clics
    await nextTick()

    editModalRef.value?.open()
}
async function handleUserUpdated() {
    await loadUsers()
}

function handleSearchInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    search(value)
}

onMounted(() => {
    loadUsers()
})
</script>

<template>
    <div class="min-h-[85vh]">
        <div class="mb-4">
            <h2 class="text-2xl font-bold">Usuarios</h2>

            <div class="flex items-center gap-3 mt-3">
                <button class="btn btn-primary" @click="openCreateModal">
                    Nuevo +
                </button>

                <input :value="searchTerm" @input="handleSearchInput" type="text" placeholder="Buscar usuarios..."
                    class="input input-bordered w-64" />
            </div>
        </div>

        <UsersTable :users="paginatedUsers" :loading="loading" :error="error" :roles="roles" :areas="areas"
            :departments="departments" :page="page" :pageSize="pageSize" :totalItems="totalItems" @update:page="setPage"
            @deleteSelected="handleDeleteSelected" @deleteOne="handleDeleteOne" @editOne="handleEditOne" />

        <UserForm ref="modalRef" :roles="roles" :areas="areas" @created="handleUserCreated" />

        <UserFormEdit ref="editModalRef" :user="selectedUser" :roles="roles" :areas="areas"
            @updated="handleUserUpdated" />
    </div>
</template>
