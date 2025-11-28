<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
    pinned: boolean
}>()

const isHover = ref(false)

const onEnter = () => {
    isHover.value = true
}

const onLeave = () => {
    isHover.value = false
}

// expandido si está fijado por el botón O si está en hover
const isExpanded = computed(() => props.pinned || isHover.value)
</script>

<template>
    <div class="drawer-side" @mouseenter="onEnter" @mouseleave="onLeave">
        <!-- overlay: en móviles cierra el drawer -->
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>

        <div class="flex min-h-full flex-col bg-base-200 transition-all duration-300 overflow-hidden"
            :class="isExpanded ? 'w-64' : 'w-14'">
            <!-- HEADER CON LOGO -->
            <div class="flex items-center gap-3 px-3 py-4 transition-all duration-300"
                :class="isExpanded ? 'justify-start' : 'justify-center'">
                <!-- Logo: cuadradito con letra S (puedes cambiarlo por <img>) -->
                <div class="rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold shrink-0 transition-all duration-300"
                    :class="isExpanded ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'">
                    S
                </div>

                <!-- Texto solo cuando está expandido -->
                <div v-if="isExpanded" class="flex flex-col">
                    <span class="font-semibold text-base">Sisconis</span>
                    <span class="text-xs opacity-60">Panel admin</span>
                </div>
            </div>

            <!-- MENÚ -->
            <ul class="menu w-full flex-1 px-1 pb-4">
                <!-- DASHBOARD -->
                <li>
                    <RouterLink to="/dashboard" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Dashboard' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                            <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                            <rect x="14" y="10" width="7" height="11" rx="1"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        </svg>
                        <span v-if="isExpanded">Dashboard</span>
                    </RouterLink>
                </li>

                <!-- USUARIOS -->
                <li>
                    <RouterLink to="/users" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Usuarios' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="3"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span v-if="isExpanded">Usuarios</span>
                    </RouterLink>
                </li>

                <!-- MENSAJES -->
                <li>
                    <RouterLink to="/messages" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Mensajes' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3" />
                            <path d="M22 3 12 13"></path>
                        </svg>
                        <span v-if="isExpanded">Mensajes</span>
                    </RouterLink>
                </li>

                <!-- CALENDARIO -->
                <li>
                    <RouterLink to="/calendar" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Calendario' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span v-if="isExpanded">Calendario</span>
                    </RouterLink>
                </li>

                <!-- REPORTES -->
                <li>
                    <RouterLink to="/reports" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Reportes' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 3h18v4H3z"></path>
                            <rect x="7" y="11" width="3" height="7" rx="1"></rect>
                            <rect x="12" y="9" width="3" height="9" rx="1"></rect>
                            <rect x="17" y="13" width="3" height="5" rx="1"></rect>
                        </svg>
                        <span v-if="isExpanded">Reportes</span>
                    </RouterLink>
                </li>

                <!-- DIVIDER -->
                <li class="mt-2 mb-1">
                    <div class="divider my-1"></div>
                </li>

                <!-- AJUSTES -->
                <li>
                    <RouterLink to="/settings" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Ajustes' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path
                                d="M19.4 15a1.78 1.78 0 0 0 .37 2l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.78 1.78 0 0 0-2-.37 1.78 1.78 0 0 0-1 1.61V22a2 2 0 0 1-4 0v-.09A1.78 1.78 0 0 0 9 20.3a1.78 1.78 0 0 0-2 .37l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.78 1.78 0 0 0 .37-2 1.78 1.78 0 0 0-1.61-1H2a2 2 0 0 1 0-4h.09A1.78 1.78 0 0 0 3.7 9a1.78 1.78 0 0 0-.37-2l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.78 1.78 0 0 0 2 .37A1.78 1.78 0 0 0 9 2.09V2a2 2 0 0 1 4 0v.09A1.78 1.78 0 0 0 15 3.7a1.78 1.78 0 0 0 2-.37l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.78 1.78 0 0 0-.37 2 1.78 1.78 0 0 0 1.61 1H22a2 2 0 0 1 0 4h-.09A1.78 1.78 0 0 0 19.4 15z">
                            </path>
                        </svg>
                        <span v-if="isExpanded">Ajustes</span>
                    </RouterLink>
                </li>

                <!-- LOGOUT -->
                <li>
                    <RouterLink to="/logout" class="flex items-center gap-3 tooltip tooltip-right text-error"
                        :data-tip="!isExpanded ? 'Cerrar sesión' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span v-if="isExpanded">Cerrar sesión</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
