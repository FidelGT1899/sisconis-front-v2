<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import EnterPasswordImg from '@/assets/images/enter-password.svg'

const router = useRouter()

const INITIAL_LOGIN_OBJ = {
    emailId: '',
    password: '',
}

const loginObj = reactive({ ...INITIAL_LOGIN_OBJ })
const loading = ref(false)
const errorMessage = ref('')

const submitForm = () => {
    errorMessage.value = ''

    if (!loginObj.emailId.trim()) {
        errorMessage.value = 'El email es requerido (usa cualquier valor de prueba).'
        return
    }

    if (!loginObj.password.trim()) {
        errorMessage.value = 'La contraseña es requerida (usa cualquier valor de prueba).'
        return
    }

    loading.value = true

    // Simular llamada a API
    setTimeout(() => {
        // Guardar token dummy
        localStorage.setItem('token', 'DummyTokenHere')

        loading.value = false

        // Redirigir con vue-router
        router.push('/admin')
    }, 800)
}
</script>

<template>
    <div class="min-h-screen bg-base-300 flex items-center justify-center">
        <div class="card mx-auto w-full max-w-5xl shadow-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 bg-base-100 rounded-xl overflow-hidden">
                <!-- Columna izquierda: intro / branding -->
                <div class="hidden md:flex flex-col justify-center items-center bg-base-200/60 p-10">
                    <img :src="EnterPasswordImg" alt="Login Illustration" class="w-72 mx-auto" />

                    <h1 class="text-3xl font-bold mt-6 text-shadow-primary-content text-center">Bienvenido a SISCONIS
                    </h1>
                    <p class="text-sm text-base-content/70 text-center max-w-sm">
                        Ingresa tus credenciales para continuar.
                    </p>
                </div>


                <!-- Columna derecha: formulario -->
                <div class="py-10 px-8 md:px-10">
                    <h2 class="text-2xl font-semibold mb-2 text-center">Iniciar sesión</h2>
                    <p class="text-sm text-base-content/70 mb-6 text-center">
                        Usa cualquier correo y contraseña de prueba para continuar.
                    </p>

                    <form @submit.prevent="submitForm">
                        <!-- Email -->
                        <div class="mb-4">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">Email</span>
                                </div>
                                <input v-model="loginObj.emailId" type="email" placeholder="tu@correo.com"
                                    class="input input-bordered w-full" />
                            </label>
                        </div>

                        <!-- Password -->
                        <div class="mb-2">
                            <label class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">Password</span>
                                </div>
                                <input v-model="loginObj.password" type="password" placeholder="••••••••"
                                    class="input input-bordered w-full" />
                            </label>
                        </div>

                        <!-- Forgot password -->
                        <div class="text-right text-secondary mb-2">
                            <RouterLink to="/forgot-password">
                                <span
                                    class="text-sm inline-block hover:text-secondary hover:underline hover:cursor-pointer transition duration-200">
                                    ¿Olvidaste tu contraseña?
                                </span>
                            </RouterLink>
                        </div>

                        <!-- Mensaje de error -->
                        <p v-if="errorMessage" class="mt-2 text-sm text-error">
                            {{ errorMessage }}
                        </p>

                        <!-- Botón login -->
                        <button type="submit" class="btn btn-primary mt-4 w-full" :disabled="loading">
                            <span v-if="!loading">
                                Iniciar sesión
                            </span>

                            <span v-else class="flex items-center justify-center gap-2">
                                <span class="loading loading-spinner loading-sm"></span>
                                Iniciando...
                            </span>
                        </button>


                        <!-- Registro -->
                        <div class="text-center mt-4 text-sm">
                            ¿No tienes cuenta?
                            <span
                                class="inline-block text-secondary hover:underline hover:cursor-pointer transition duration-200">
                                Contacta a un administrador
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>