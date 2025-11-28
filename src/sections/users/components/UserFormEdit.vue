<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '@users/domain/entities/User'
import type { Role } from '@users/domain/entities/Role'
import type { Area } from '@users/domain/entities/Area'
import { useUsersStore } from '@/stores/users/useUsersStore'

const props = defineProps<{
    user: User | null
    roles: Role[]
    areas: Area[]
}>()

const emit = defineEmits<{
    (e: 'updated'): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const name = ref('')
const lastname = ref('')
const email = ref('')
const roleId = ref('')
const areaId = ref('')
const password = ref('') // opcional: si lo dejas vacío, se mantiene la actual

const loading = ref(false)
const error = ref<string | null>(null)

watch(
    () => props.user,
    (u) => {
        if (!u) return
        name.value = u.name
        lastname.value = u.lastname
        email.value = u.email
        roleId.value = u.roleId
        areaId.value = u.areaId
        password.value = ''
        error.value = null
    },
    { immediate: true }
)

function open() {
    if (!props.user) return
    error.value = null
    dialogRef.value?.showModal()
}

function close() {
    dialogRef.value?.close()
}

defineExpose({
    open,
})
const usersStore = useUsersStore()

async function handleSubmit() {
    if (!props.user) return

    loading.value = true
    error.value = null

    try {
        await usersStore.updateUser({
            id: props.user.id,
            name: name.value,
            lastname: lastname.value,
            email: email.value,
            roleId: roleId.value,
            areaId: areaId.value,
            password: password.value || undefined,
        })

        emit('updated')
        close()
    } catch (e: unknown) {
        console.error(e)

        // obtener mensaje sin usar any
        const msg =
            e instanceof Error && e.message
                ? e.message
                : 'Error actualizando usuario'

        error.value = msg
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <dialog ref="dialogRef" class="modal">
        <div class="modal-box max-w-lg">
            <h3 class="text-lg font-bold mb-4">Editar usuario</h3>

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

                <!-- Área -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Área</span>
                    </label>
                    <select v-model="areaId" class="select select-bordered w-full">
                        <option v-for="area in areas" :key="area.id" :value="area.id">
                            {{ area.name }}
                        </option>
                    </select>
                </div>

                <!-- Rol -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Rol</span>
                    </label>
                    <select v-model="roleId" class="select select-bordered w-full">
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                </div>

                <!-- Password -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Contraseña (dejar vacío para no cambiar)</span>
                    </label>
                    <input v-model="password" type="password" class="input input-bordered w-full"
                        placeholder="********" />
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
                        Guardar cambios
                    </button>
                </div>
            </form>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button>Cerrar</button>
        </form>
    </dialog>
</template>
