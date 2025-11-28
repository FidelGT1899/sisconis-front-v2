import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fireConfetti } from '@/libs/confetti'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
    id: number
    type: ToastType
    message: string
    duration?: number
}

let idCounter = 1

export const useNotificationsStore = defineStore('notifications', () => {
    const toasts = ref<Toast[]>([])

    function pushToast(toast: Omit<Toast, 'id'> & { withConfetti?: boolean }) {
        const id = idCounter++
        const duration = toast.duration ?? 4000

        toasts.value.push({
            id,
            type: toast.type,
            message: toast.message,
            duration,
        })

        if (toast.withConfetti) {
            fireConfetti()
        }

        // auto-close
        setTimeout(() => {
            removeToast(id)
        }, duration)

        return id
    }

    function removeToast(id: number) {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    // helpers
    function success(message: string, opts?: { withConfetti?: boolean; duration?: number }) {
        return pushToast({
            type: 'success',
            message,
            duration: opts?.duration,
            withConfetti: opts?.withConfetti,
        })
    }

    function error(message: string, duration = 5000) {
        return pushToast({
            type: 'error',
            message,
            duration,
        })
    }

    function info(message: string, duration = 4000) {
        return pushToast({
            type: 'info',
            message,
            duration,
        })
    }

    function warning(message: string, duration = 4000) {
        return pushToast({
            type: 'warning',
            message,
            duration,
        })
    }

    return {
        toasts,
        pushToast,
        removeToast,
        success,
        error,
        info,
        warning,
    }
})
