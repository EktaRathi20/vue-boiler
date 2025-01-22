import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes } from './auth-routes'
import { userRoutes } from './user-routes';

import documentation from '@/views/documentation.vue';

import auth from '@/layouts/auth.vue';
import user from '@/layouts/user.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Documentation',
      component: documentation,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: auth,
      children: [
        ...authRoutes
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: user,
      children: [
        ...userRoutes
      ]
    }
  ],
})

export default router