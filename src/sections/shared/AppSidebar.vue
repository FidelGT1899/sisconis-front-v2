<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
    LayoutDashboard,
    Users,
    MessageCircle,
    CalendarDays,
    BarChart3,
    Settings,
    LogOut,
} from 'lucide-vue-next'

const route = useRoute()
const currentPath = computed(() => route.path)

function isActive(path: string) {
    return (
        currentPath.value === path ||
        currentPath.value.startsWith(path + '/')
    )
}

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
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>

        <div class="flex min-h-full flex-col bg-base-200 transition-all duration-300 overflow-hidden"
            :class="isExpanded ? 'w-64' : 'w-14'">
            <!-- HEADER -->
            <div class="flex items-center gap-3 px-3 py-4 transition-all duration-300"
                :class="isExpanded ? 'justify-start' : 'justify-center'">
                <div class="rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold shrink-0 transition-all duration-300"
                    :class="isExpanded ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'">
                    S
                </div>

                <div v-if="isExpanded" class="flex flex-col">
                    <span class="font-semibold text-base">Sisconis</span>
                    <span class="text-xs opacity-60">Panel admin</span>
                </div>
            </div>

            <!-- MENÚ PRINCIPAL -->
            <ul class="menu w-full flex-1 px-1 pb-2">
                <!-- DASHBOARD -->
                <li :class="{
                    'bg-base-300 border-l-4 border-primary font-semibold':
                        isActive('/dashboard'),
                }">
                    <RouterLink to="/dashboard" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Dashboard' : ''">
                        <LayoutDashboard class="size-5" />
                        <span v-if="isExpanded">Dashboard</span>
                    </RouterLink>
                </li>

                <!-- USUARIOS -->
                <li :class="{
                    'bg-base-300 border-l-4 border-primary font-semibold':
                        isActive('/users'),
                }">
                    <RouterLink to="/users" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Usuarios' : ''">
                        <Users class="size-5" />
                        <span v-if="isExpanded">Usuarios</span>
                    </RouterLink>
                </li>

                <!-- MENSAJES -->
                <li :class="{
                    'bg-base-300 border-l-4 border-primary font-semibold':
                        isActive('/messages'),
                }">
                    <RouterLink to="/messages" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Mensajes' : ''">
                        <MessageCircle class="size-5" />
                        <span v-if="isExpanded">Mensajes</span>
                    </RouterLink>
                </li>

                <!-- CALENDARIO -->
                <li :class="{
                    'bg-base-300 border-l-4 border-primary font-semibold':
                        isActive('/calendar'),
                }">
                    <RouterLink to="/calendar" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Calendario' : ''">
                        <CalendarDays class="size-5" />
                        <span v-if="isExpanded">Calendario</span>
                    </RouterLink>
                </li>

                <!-- REPORTES -->
                <li :class="{
                    'bg-base-300 border-l-4 border-primary font-semibold':
                        isActive('/reports'),
                }">
                    <RouterLink to="/reports" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Reportes' : ''">
                        <BarChart3 class="size-5" />
                        <span v-if="isExpanded">Reportes</span>
                    </RouterLink>
                </li>
            </ul>

            <!-- BLOQUE INFERIOR -->
            <ul class="menu w-full px-1 pt-2 border-t border-base-300">
                <li :class="{
                    'bg-base-300 border-l-4 border-primary font-semibold':
                        isActive('/settings'),
                }">
                    <RouterLink to="/settings" class="flex items-center gap-3 tooltip tooltip-right"
                        :data-tip="!isExpanded ? 'Ajustes' : ''">
                        <Settings class="size-5" />
                        <span v-if="isExpanded">Ajustes</span>
                    </RouterLink>
                </li>

                <li :class="{
                    'bg-base-300 border-l-4 border-error text-error-content font-semibold':
                        isActive('/logout'),
                }">
                    <RouterLink to="/logout" class="flex items-center gap-3 tooltip tooltip-right text-error"
                        :data-tip="!isExpanded ? 'Cerrar sesión' : ''">
                        <LogOut class="size-5" />
                        <span v-if="isExpanded">Cerrar sesión</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
