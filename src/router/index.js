// Composables
import { createRouter, createWebHistory } from 'vue-router'
// import { customStore } from '../store/store.js'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/LoginCard.vue'),   
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/RegisterCard.vue'),   
  }, 
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),   
    // meta: { requiresAuth: true },
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('@/views/ProfileView.vue'),   
    // meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !customStore.getters.isLoggedIn) {
//     // If the route requires authentication and the user is not authenticated, redirect to the login page
//     next({ name: 'login' })
//   } else {
//     // Otherwise, proceed to the next route
//     next()
//   }
// })

export default router
