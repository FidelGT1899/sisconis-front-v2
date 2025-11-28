<template>
    <div class="flex flex-col items-center justify-center min-h-[70vh] text-center p-10">
        <h1 class="text-7xl font-bold text-error">404</h1>
        <h2 class="text-2xl font-semibold mt-4">Página no encontrada</h2>
        <p class="opacity-70 mt-2">
            La ruta que estás buscando no existe o fue movida.
        </p>

        <RouterLink to="/" class="btn btn-primary mt-6">
            Volver al inicio
        </RouterLink>
    </div>
</template>
