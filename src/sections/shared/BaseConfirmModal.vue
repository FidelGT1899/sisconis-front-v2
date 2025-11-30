<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean
    title?: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    danger?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
}>()

function close() {
    emit('update:modelValue', false)
}

function handleCancel() {
    close()
}

function handleConfirm() {
    emit('confirm')
    close()
}
</script>

<template>
    <!-- DaisyUI: modal-toggle controlado por v-model -->
    <input type="checkbox" class="modal-toggle" :checked="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />

    <div class="modal" role="dialog">
        <div class="modal-box">
            <h3 class="text-lg font-bold">
                {{ title || 'Confirmar acción' }}
            </h3>

            <p class="py-4">
                {{ message || '¿Estás seguro que deseas continuar?' }}
            </p>

            <div class="modal-action">
                <button type="button" class="btn" @click="handleCancel">
                    {{ cancelLabel || 'Cancelar' }}
                </button>
                <button type="button" class="btn" :class="danger ? 'btn-error' : 'btn-primary'" @click="handleConfirm">
                    {{ confirmLabel || 'Confirmar' }}
                </button>
            </div>
        </div>

        <label class="modal-backdrop" @click="handleCancel">Cerrar</label>
    </div>
</template>
