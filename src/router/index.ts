import AdminLayout from '@/sections/shared/layouts/AdminLayout.vue';
import AuthLayout from '@/sections/shared/layouts/AuthLayout.vue';
import UsersLayout from '@/sections/users/layouts/UsersLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
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
          component: UsersLayout,
          children: [
            {
              path: '',
              name: 'users',
              component: () => import('@/sections/users/UsersView.vue'),
            },
            {
              path: 'profile',
              name: 'profile',
              component: () => import('@/sections/users/ProfileView.vue'),
            }
          ]
        },
        {
          path: ':pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/sections/shared/NotFound.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/sections/auth/LoginView.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/sections/auth/ForgotPasswordView.vue'),
        },
      ]
    }
  ],
});

export default router;
