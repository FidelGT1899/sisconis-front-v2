import AdminLayout from '@/sections/shared/AdminLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/sections/users/HomeView.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/sections/users/DashboardView.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/sections/users/UsersView.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/sections/shared/NotFound.vue'),
        },
      ],
    },
  ],
});

export default router;
