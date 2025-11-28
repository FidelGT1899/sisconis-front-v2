<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNotificationsStore } from '@store/ui/useNotificationsStore'

const notificationsStore = useNotificationsStore()
const { toasts } = storeToRefs(notificationsStore)

const typeClasses = computed(() => ({
    success: 'alert-success',
    error: 'alert-error',
    info: 'alert-info',
    warning: 'alert-warning',
}))
</script>

<template>
    <!-- contenedor fijo abajo a la derecha -->
    <div class="toast toast-end toast-bottom z-50">
        <TransitionGroup name="list" tag="div">
            <div v-for="toast in toasts" :key="toast.id" class="mb-2">
                <div class="alert shadow-lg w-80" :class="typeClasses[toast.type]">
                    <span>{{ toast.message }}</span>
                    <button class="btn btn-ghost btn-xs" @click="notificationsStore.removeToast(toast.id)">
                        ✕
                    </button>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
