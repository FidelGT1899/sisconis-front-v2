<script setup lang="ts">
const emit = defineEmits<{
    (e: 'toggle-sidebar-pinned'): void
}>();
</script>

<template>
    <nav class="navbar w-full bg-base-100 shadow-sm">
        <div class="flex-1 flex items-center gap-2">
            <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost"
                @click.stop="emit('toggle-sidebar-pinned')">
                <!-- tu ícono -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>

            <span class="font-bold text-lg">Sisconis</span>
        </div>

        <!-- DERECHA: todo alineado 100% horizontal -->
        <div class="flex-none flex items-center gap-4">
            <!-- Buscador -->
            <div class="form-control hidden md:block">
                <label class="input input-bordered flex items-center gap-2 w-64 max-w-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-4 opacity-60" viewBox="0 0 24 24"
                        stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="20" y2="20" />
                    </svg>
                    <input type="text" placeholder="Buscar..." class="grow bg-transparent outline-none" />
                </label>
            </div>

            <!-- Notifs -->
            <div class="dropdown dropdown-end">
                <button tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <span class="badge badge-xs badge-error indicator-item rounded-md"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 16v-5a6 6 0 0 0-12 0v5" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            <path d="M4 16h16" />
                        </svg>

                    </div>
                </button>
                <div tabindex="0" class="mt-3 z-10 card card-compact dropdown-content w-72 bg-base-100 shadow">
                    <div class="card-body">
                        <h2 class="card-title">Notificaciones</h2>
                        <p class="text-sm opacity-70">Tienes nuevas notificaciones.</p>

                        <!-- Ejemplo items -->
                        <div class="mt-2 space-y-2 text-sm">
                            <div class="flex gap-2 items-center">
                                <div class="avatar">
                                    <div class="w-8 rounded-full">
                                        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" />
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <p class="font-medium truncate">John Doe</p>
                                    <p class="text-xs opacity-60 truncate">
                                        Aceptó tu solicitud.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="card-actions justify-end mt-2">
                            <button class="btn btn-sm btn-primary w-full">Ver todas</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Avatar -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li class="mb-1 px-2 py-1 border-b border-base-200">
                        <p class="font-semibold text-sm">John Doe</p>
                        <p class="text-xs opacity-60">Admin</p>
                    </li>
                    <li><a>Perfil</a></li>
                    <li><a>Configuración</a></li>
                    <li><a>Cerrar sesión</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>
