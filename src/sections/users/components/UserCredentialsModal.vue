<script setup lang="ts">
import { ref } from 'vue'
import { Copy, CopyCheck } from 'lucide-vue-next'

const props = defineProps<{
    modelValue: boolean
    email: string
    password: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'send-email'): void
}>()

// 1. Estado para el feedback visual
const copied = ref(false)
const copiedemail = ref(false)
const copiedall = ref(false)

function close() {
    // Restablecer el estado de copiado al cerrar
    copied.value = false
    copiedemail.value = false
    copiedall.value = false
    emit('update:modelValue', false)
}

// 2. Función para copiar SÓLO la contraseña
async function copyPasswordToClipboard() {
    if (!navigator?.clipboard) return

    try {
        await navigator.clipboard.writeText(props.password)

        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 3000)

    } catch (e) {
        console.error('Error copiando la contraseña al portapapeles', e)
    }
}

async function copyEmailToClipboard() {
    if (!navigator?.clipboard) return

    try {
        await navigator.clipboard.writeText(props.email)

        copiedemail.value = true
        setTimeout(() => {
            copiedemail.value = false
        }, 3000)

    } catch (e) {
        console.error('Error copiando la contraseña al portapapeles', e)
    }
}

async function copyAllToClipboard() {
    if (!navigator?.clipboard) return
    const text = `Email: ${props.email}\nPassword: ${props.password}`
    try {
        await navigator.clipboard.writeText(text)
        copiedall.value = true

        setTimeout(() => {
            copiedall.value = false
        }, 3000)
    } catch (e) {
        console.error('Error copiando todo al portapapeles', e)
    }
}

function sendEmail() {
    emit('send-email')
}
</script>

<template>
    <!-- Usamos :open con <dialog> en lugar de ref/showModal -->
    <dialog class="modal" :open="modelValue">
        <div class="modal-box max-w-md">
            <h3 class="text-lg font-bold mb-3">Credenciales del usuario</h3>

            <p class="mb-2 text-sm opacity-80">
                Guarda o envía estas credenciales al usuario. La contraseña no se mostrará nuevamente.
            </p>

            <div class="space-y-2 my-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <div
                        class="bg-base-300 rounded-lg px-3 py-2 flex items-center justify-between gap-3 font-mono text-sm">
                        <span class="truncate select-all">
                            {{ email }}
                        </span>

                        <button type="button" class="btn btn-ghost btn-xs btn-square" @click="copyEmailToClipboard"
                            :class="{ 'text-success': copiedemail }" :disabled="copiedemail"
                            :title="copiedemail ? 'Copiado' : 'Copiar contraseña'">
                            <Copy v-if="!copiedemail" class="size-5" />
                            <CopyCheck v-else />
                        </button>
                    </div>
                    <p v-if="copiedemail" class="text-xs text-success mt-1">
                        Email copiado al portapapeles
                    </p>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Contraseña generada</span>
                    </label>

                    <div
                        class="bg-base-300 rounded-lg px-3 py-2 flex items-center justify-between gap-3 font-mono text-sm">
                        <span class="truncate select-all">
                            {{ password }}
                        </span>

                        <button type="button" class="btn btn-ghost btn-xs btn-square" @click="copyPasswordToClipboard"
                            :class="{ 'text-success': copied }" :disabled="copied"
                            :title="copied ? 'Copiado' : 'Copiar contraseña'">
                            <Copy v-if="!copied" class="size-5" />
                            <CopyCheck v-else />
                        </button>
                    </div>

                    <p v-if="copied" class="text-xs text-success mt-1">
                        Contraseña copiada al portapapeles
                    </p>
                </div>
                <p v-if="copiedall" class="text-xs text-success mt-1">
                    Credenciales copiadas al portapapeles
                </p>

            </div>

            <div class="modal-action flex justify-between">
                <button type="button" class="btn" @click="copyAllToClipboard">
                    Copiar credenciales
                </button>
                <div class="flex gap-2">
                    <button type="button" class="btn btn-outline" @click="sendEmail">
                        Enviar por correo
                    </button>
                    <button type="button" class="btn btn-primary" @click="close">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button @click="close">
                Cerrar
            </button>
        </form>
    </dialog>
</template>
