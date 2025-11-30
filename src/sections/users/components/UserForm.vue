<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@store/users/useUsersStore'
import { mapUserErrorToMessage } from '@store/users/mapUserErrorToMessage'
import type { Role } from '@/modules/users/domain/entities/Role'
import type { Area } from '@/modules/users/domain/entities/Area'

const props = defineProps<{
    roles: Role[]
    areas: Area[]
}>()

const emit = defineEmits<{
    (e: 'created'): void
    (e: 'credentialsGenerated', payload: { email: string; password: string }): void
}>()

const usersStore = useUsersStore()

const dialogRef = ref<HTMLDialogElement | null>(null)
const name = ref('')
const lastname = ref('')
const email = ref('')
const dni = ref('')
const roleId = ref(props.roles[0]?.id ?? '')
const areaId = ref(props.areas[0]?.id ?? '')

const loading = ref(false)
const error = ref<string | null>(null)

function open() {
    error.value = null
    resetForm()
    dialogRef.value?.showModal()
}

function close() {
    dialogRef.value?.close()
}

function resetForm() {
    name.value = ''
    lastname.value = ''
    email.value = ''
    dni.value = ''
    roleId.value = props.roles[0]?.id ?? 'role-1'
    areaId.value = props.areas[0]?.id ?? 'area-1'
}

defineExpose({ open })

function generateTempPassword(): string {
    // pwd temporal simple; luego lo cambias por lo que venga del backend
    return Math.random().toString(36).slice(-10)
}

async function handleSubmit() {
    loading.value = true
    error.value = null
    try {
        const result = await usersStore.createUser({
            name: name.value,
            lastname: lastname.value,
            email: email.value,
            dni: dni.value,
            roleId: roleId.value,
            areaId: areaId.value,
        })

        emit('created')

        emit('credentialsGenerated', {
            email: result.email,
            password: result.hashPass,
        })

        resetForm()
        close()
    } catch (e) {
        error.value = mapUserErrorToMessage(e)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <dialog ref="dialogRef" class="modal">
        <div class="modal-box max-w-lg">
            <h3 class="text-lg font-bold mb-4">Nuevo usuario</h3>

            <form class="space-y-3" @submit.prevent="handleSubmit">
                <!-- Nombre -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Nombre</span>
                    </label>
                    <input v-model="name" type="text" class="input input-bordered w-full" placeholder="Nombre" required
                        minlength="5" maxlength="60" />
                </div>

                <!-- Apellido -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Apellido</span>
                    </label>
                    <input v-model="lastname" type="text" class="input input-bordered w-full" placeholder="Apellido"
                        required minlength="5" maxlength="60" />
                </div>

                <!-- Email -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input v-model="email" type="email" class="input input-bordered w-full"
                        placeholder="correo@ejemplo.com" required />
                </div>

                <!-- DNI -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">DNI</span>
                    </label>
                    <input v-model="dni" type="text" class="input input-bordered w-full" placeholder="DNI" required
                        minlength="8" maxlength="8" />
                </div>

                <!-- Área -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Área</span>
                    </label>
                    <select v-model="areaId" class="select select-bordered w-full">
                        <option value="area-1">Sistemas</option>
                        <option value="area-2">Recursos Humanos</option>
                    </select>
                </div>

                <!-- Rol -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Rol</span>
                    </label>
                    <select v-model="roleId" class="select select-bordered w-full">
                        <option value="role-1">Administrador</option>
                        <option value="role-2">Usuario</option>
                    </select>
                </div>

                <!-- Error -->
                <p v-if="error" class="text-error text-sm mt-2">
                    {{ error }}
                </p>

                <!-- Acciones -->
                <div class="modal-action">
                    <button type="button" class="btn btn-ghost" @click="close" :disabled="loading">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary" :class="{ 'btn-disabled': loading }">
                        <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
                        Guardar
                    </button>
                </div>
            </form>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>
</template>
