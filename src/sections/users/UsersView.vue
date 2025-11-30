<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import UsersTable from './components/UsersTable.vue'
import UserForm from './components/UserForm.vue'
import UserFormEdit from './components/UserFormEdit.vue'

import { useUsersStore } from '@store/users/useUsersStore'
import type { User } from '@users/domain/entities/User'
import BaseConfirmModal from '../shared/BaseConfirmModal.vue'
import UserCredentialsModal from './components/UserCredentialsModal.vue'

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

const showDeleteModal = ref(false)
const pendingDeleteIds = ref<string[]>([])
const deleteCount = computed(() => pendingDeleteIds.value.length)

const showCredentialsModal = ref(false)
const credentialsEmail = ref('')
const credentialsPassword = ref('')

const deleteTitle = computed(() =>
    deleteCount.value > 1 ? 'Eliminar usuarios' : 'Eliminar usuario'
)

const deleteMessage = computed(() =>
    deleteCount.value > 1
        ? `Se eliminarán ${deleteCount.value} usuarios. Esta acción no se puede deshacer.`
        : 'Se eliminará este usuario. Esta acción no se puede deshacer.'
)

function openCreateModal() {
    modalRef.value?.open()
}

async function handleUserCreated() {
    await loadUsers()
}

function handleCredentialsGenerated(payload: { email: string; password: string }) {
    credentialsEmail.value = payload.email
    credentialsPassword.value = payload.password
    showCredentialsModal.value = true
}

function handleSendCredentialsEmail() {
    console.log(
        'Simulando envío de credenciales a:',
        credentialsEmail.value,
        'pass:',
        credentialsPassword.value,
    )
    // TODO: aquí en el futuro se llamara a un use case / API real
}

async function handleDeleteSelected(ids: string[]) {
    if (!ids.length) return
    pendingDeleteIds.value = ids
    showDeleteModal.value = true
}

async function handleDeleteOne(id: string) {
    pendingDeleteIds.value = [id]
    showDeleteModal.value = true
}

async function confirmDelete() {
    const ids = pendingDeleteIds.value
    if (!ids.length) return

    if (ids.length === 1) {
        const id = ids[0]
        if (!id) return
        await deleteOne(id)
    } else {
        await deleteMany(ids)
    }

    pendingDeleteIds.value = []
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

        <UserForm ref="modalRef" :roles="roles" :areas="areas" @created="handleUserCreated"
            @credentialsGenerated="handleCredentialsGenerated" />

        <UserFormEdit ref="editModalRef" :user="selectedUser" :roles="roles" :areas="areas"
            @updated="handleUserUpdated" />

        <BaseConfirmModal v-model="showDeleteModal" :title="deleteTitle" :message="deleteMessage"
            confirmLabel="Eliminar" cancelLabel="Cancelar" :danger="true" @confirm="confirmDelete" />

        <UserCredentialsModal v-model="showCredentialsModal" :email="credentialsEmail" :password="credentialsPassword"
            @send-email="handleSendCredentialsEmail" />
    </div>
</template>
