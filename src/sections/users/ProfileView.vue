<script setup lang="ts">
import { computed } from 'vue'

// 🔹 Datos de ejemplo (luego los cambias por los reales que vengan de tu API/Pinia)
const user = {
    fullName: 'Juan Pérez',
    avatarUrl: 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp',
    email: 'juan.perez@empresa.com',
    phone: '+51 999 999 999',
    location: 'Lima, Perú',
    position: 'Analista Senior',
    area: 'Operaciones',
    department: 'Logística',
    joinDate: '12/03/2021',
    contractType: 'Tiempo completo',
    manager: 'María Rodríguez',
    isActive: true,
    document: 'DNI 12345678',
    birthDate: '05/08/1990',
    address: 'Av. Siempre Viva 123',
    notes: 'Colaborador con buen desempeño en proyectos críticos.\nMuy orientado a resultados.',
    stats: {
        recognitionScore: 87,
        lastRecognition: 'Colaborador del mes - Octubre',
        activeProjects: 3,
        projectsDesc: 'Participa en proyectos de mejora de procesos.',
        tasksDonePercent: 86,
        tasksRemaining: 12,
    },
}

const coworkers = [
    {
        id: 1,
        name: 'Ana López',
        avatarUrl: 'https://img.daisyui.com/images/profile/demo/batperson@192.webp',
    },
    {
        id: 2,
        name: 'Carlos Ruiz',
        avatarUrl: 'https://img.daisyui.com/images/profile/demo/averagebulk@192.webp',
    },
    {
        id: 3,
        name: 'Luis Gómez',
        avatarUrl: 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp',
    },
    {
        id: 4,
        name: 'María Fernández',
        avatarUrl: 'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp',
    },
]

const visibleCoworkers = computed(() => coworkers.slice(0, 3))
const remainingCoworkers = computed(
    () => coworkers.length - visibleCoworkers.value.length
)
</script>

<template>
    <section class="grid w-full gap-6 md:grid-cols-12 bg-base-200">
        <!-- PERFIL PRINCIPAL (arriba izquierda) -->
        <div class="col-span-12 md:col-span-4">
            <article class="card bg-base-100 shadow-xl p-6 flex flex-col items-center gap-4">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-32 h-32 rounded-full ring-2 ring-offset-2">
                        <img :src="user.avatarUrl" :alt="user.fullName" />
                    </div>
                </div>

                <div class="text-center space-y-1">
                    <h2 class="text-xl font-semibold">{{ user.fullName }}</h2>
                    <p class="text-sm text-base-content/70">
                        {{ user.position }}
                    </p>
                </div>

                <!-- Área y Departamento -->
                <div class="flex flex-wrap justify-center gap-2 mt-2">
                    <div class="badge badge-info badge-outline">
                        Área: {{ user.area }}
                    </div>
                    <div class="badge badge-secondary badge-outline">
                        Departamento: {{ user.department }}
                    </div>
                </div>

                <!-- Datos básicos -->
                <div class="w-full mt-4 space-y-1 text-sm">
                    <p class="flex items-center justify-between gap-2">
                        <span class="font-medium">Correo:</span>
                        <span class="truncate text-right">{{ user.email }}</span>
                    </p>
                    <p class="flex items-center justify-between gap-2">
                        <span class="font-medium">Teléfono:</span>
                        <span class="truncate text-right">{{ user.phone }}</span>
                    </p>
                    <p class="flex items-center justify-between gap-2">
                        <span class="font-medium">Ubicación:</span>
                        <span class="truncate text-right">{{ user.location }}</span>
                    </p>
                </div>
            </article>
        </div>

        <!-- ESTADÍSTICAS + COMPAÑEROS DEL ÁREA (arriba derecha) -->
        <div class="col-span-12 md:col-span-8">
            <div class="flex flex-col gap-4 h-full">
                <!-- Stats -->
                <div class="stats shadow w-full">
                    <div class="stat">
                        <div class="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="inline-block h-8 w-8 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                </path>
                            </svg>
                        </div>
                        <div class="stat-title">Reconocimiento</div>
                        <div class="stat-value text-primary">
                            {{ user.stats.recognitionScore }}%
                        </div>
                        <div class="stat-desc">
                            {{ user.stats.lastRecognition }}
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="inline-block h-8 w-8 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div class="stat-title">Proyectos activos</div>
                        <div class="stat-value text-secondary">
                            {{ user.stats.activeProjects }}
                        </div>
                        <div class="stat-desc">
                            {{ user.stats.projectsDesc }}
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-secondary">
                            <div class="avatar avatar-online">
                                <div class="w-12 rounded-full">
                                    <img :src="user.avatarUrl" :alt="user.fullName" />
                                </div>
                            </div>
                        </div>
                        <div class="stat-value">
                            {{ user.stats.tasksDonePercent }}%
                        </div>
                        <div class="stat-title">Tareas completadas</div>
                        <div class="stat-desc text-secondary">
                            {{ user.stats.tasksRemaining }} tareas pendientes
                        </div>
                    </div>
                </div>

                <!-- Compañeros del área -->
                <div class="card bg-base-100 shadow p-4 space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-sm">
                            Otros colaboradores del área
                        </h3>
                        <span class="badge badge-neutral badge-sm">
                            {{ coworkers.length }} en esta área
                        </span>
                    </div>

                    <p class="text-xs text-base-content/70">
                        Compañeros que también pertenecen a
                        <span class="font-medium">{{ user.area }}</span>.
                    </p>

                    <div class="avatar-group -space-x-6 mt-2">
                        <div v-for="coworker in visibleCoworkers" :key="coworker.id" class="avatar">
                            <div class="w-10">
                                <img :src="coworker.avatarUrl" :alt="coworker.name" />
                            </div>
                        </div>

                        <div v-if="remainingCoworkers > 0" class="avatar avatar-placeholder">
                            <div class="bg-neutral text-neutral-content w-10">
                                <span>+{{ remainingCoworkers }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ACORDEONES (bloque de abajo) -->
        <div class="col-span-12 flex flex-col gap-3">
            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="profile-accordion" checked />
                <div class="collapse-title font-semibold">
                    Información laboral
                </div>
                <div class="collapse-content text-sm space-y-1">
                    <p>
                        <span class="font-medium">Fecha de ingreso:</span>
                        <span class="ml-1">{{ user.joinDate }}</span>
                    </p>
                    <p>
                        <span class="font-medium">Modalidad:</span>
                        <span class="ml-1">{{ user.contractType }}</span>
                    </p>
                    <p>
                        <span class="font-medium">Jefe directo:</span>
                        <span class="ml-1">{{ user.manager }}</span>
                    </p>
                    <p>
                        <span class="font-medium">Estado:</span>
                        <span class="ml-1 badge badge-sm" :class="user.isActive ? 'badge-success' : 'badge-ghost'">
                            {{ user.isActive ? 'Activo' : 'Inactivo' }}
                        </span>
                    </p>
                </div>
            </div>

            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="profile-accordion" />
                <div class="collapse-title font-semibold">
                    Información personal
                </div>
                <div class="collapse-content text-sm space-y-1">
                    <p>
                        <span class="font-medium">Documento:</span>
                        <span class="ml-1">{{ user.document }}</span>
                    </p>
                    <p>
                        <span class="font-medium">Fecha de nacimiento:</span>
                        <span class="ml-1">{{ user.birthDate }}</span>
                    </p>
                    <p>
                        <span class="font-medium">Dirección:</span>
                        <span class="ml-1">{{ user.address }}</span>
                    </p>
                </div>
            </div>

            <div class="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="profile-accordion" />
                <div class="collapse-title font-semibold">
                    Notas internas
                </div>
                <div class="collapse-content text-sm">
                    <p class="whitespace-pre-line">
                        {{ user.notes }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>