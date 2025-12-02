<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EmailSendImg from '@/assets/images/email-send.svg'
import MailSendedImg from '@/assets/images/email-sended.svg'

const router = useRouter()

const email = ref('')
const loading = ref(false)
const errorMessage = ref('')
const isSent = ref(false)

const submitForm = () => {
    errorMessage.value = ''

    if (!email.value.trim()) {
        errorMessage.value = 'El email es requerido.'
        return
    }

    loading.value = true

    // Simular llamada a API de recuperación
    setTimeout(() => {
        loading.value = false
        isSent.value = true
        // Aquí normalmente NO dices si el correo existe o no por seguridad
    }, 900)
}

const goToLogin = () => {
    router.push('/')
}

const resetForm = () => {
    isSent.value = false
    email.value = ''
    errorMessage.value = ''
}
</script>

<template>
    <div class="min-h-screen bg-base-300 flex items-center justify-center">
        <div class="card mx-auto w-full max-w-5xl shadow-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 bg-base-100 rounded-xl overflow-hidden">
                <!-- Columna izquierda: intro / branding -->
                <div class="hidden md:flex flex-col justify-center items-center bg-base-200/60 p-10">
                    <img :src="isSent ? MailSendedImg : EmailSendImg" alt="Recover Password Illustration"
                        class="w-72 mx-auto" />

                    <h1 class="text-3xl font-bold mt-6 text-shadow-primary-content text-center">
                        {{ isSent ? 'Revisa tu correo' : 'Recuperar contraseña' }}
                    </h1>

                    <p class="text-sm text-base-content/70 text-center max-w-sm">
                        {{ isSent
                            ? `Si el correo existe en nuestro sistema, te hemos enviado un enlace para restablecer tu
                        contraseña.`
                            : `Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.`
                        }}
                    </p>

                </div>

                <!-- Columna derecha -->
                <div class="py-10 px-8 md:px-10">
                    <!-- Paso 1: Formulario -->
                    <div v-if="!isSent">
                        <h2 class="text-2xl font-semibold mb-2 text-center">
                            ¿Olvidaste tu contraseña?
                        </h2>
                        <p class="text-sm text-base-content/70 mb-6 text-center">
                            Escribe tu correo para enviarte instrucciones de recuperación.
                        </p>

                        <form @submit.prevent="submitForm">
                            <!-- Email -->
                            <div class="mb-4">
                                <label class="form-control w-full">
                                    <div class="label">
                                        <span class="label-text">Email</span>
                                    </div>
                                    <input v-model="email" type="email" placeholder="tu@correo.com"
                                        class="input input-bordered w-full" />
                                </label>
                            </div>

                            <!-- Mensaje de error -->
                            <p v-if="errorMessage" class="mt-2 text-sm text-error">
                                {{ errorMessage }}
                            </p>

                            <!-- Botón recuperar -->
                            <button type="submit" class="btn btn-primary mt-4 w-full" :disabled="loading">
                                <span v-if="!loading">
                                    Recuperar contraseña
                                </span>
                                <span v-else class="flex items-center justify-center gap-2">
                                    <span class="loading loading-spinner loading-sm"></span>
                                    Enviando...
                                </span>
                            </button>

                            <!-- Volver al login -->
                            <div class="text-center mt-4 text-sm">
                                ¿Recordaste tu contraseña?
                                <RouterLink to="/">
                                    <span
                                        class="inline-block text-secondary hover:underline hover:cursor-pointer transition duration-200">
                                        Volver al login
                                    </span>
                                </RouterLink>
                            </div>
                        </form>
                    </div>

                    <!-- Paso 2: Confirmación -->
                    <div v-else class="flex flex-col items-center justify-center h-full">
                        <h2 class="text-2xl font-semibold mb-2 text-center">
                            Correo enviado
                        </h2>
                        <p class="text-sm text-base-content/70 mb-6 text-center max-w-sm">
                            Si el correo que ingresaste está registrado, recibirás un mensaje con un enlace
                            para restablecer tu contraseña. Revisa también tu carpeta de spam o correo no deseado.
                        </p>

                        <button class="btn btn-primary w-full mb-3" @click="goToLogin">
                            Volver al login
                        </button>

                        <button class="btn btn-ghost w-full" @click="resetForm">
                            Usar otro correo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>