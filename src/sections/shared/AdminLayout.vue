<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import Navbar from "./AppNavbar.vue";
import Sidebar from "./AppSidebar.vue";

const isSidebarPinned = ref(true); // abierto/expandido por defecto
</script>

<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content">
            <Navbar @toggle-sidebar-pinned="isSidebarPinned = !isSidebarPinned" />
            <div class="p-4">
                <RouterView />
            </div>
        </div>

        <Sidebar :pinned="isSidebarPinned" />
    </div>
</template>
