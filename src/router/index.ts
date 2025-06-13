import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const routeModules: Record<string, RouteRecordRaw[]> = {};

Object.entries(modules).forEach(([path, module]: [string, any]) => {
  if (module.default) {
    const moduleName = path.split('/').pop()?.replace('.ts', '') || 'unknown';
    routeModules[moduleName] = module.default;
  }
});

const routes: RouteRecordRaw[] = [
  ...routeModules['auth'],
  ...routeModules['bot'],
  ...routeModules['main'],
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/errors/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   // Load user from localStorage if not already loaded
//   if (!authStore.user) {
//     authStore.loadUserFromLocalStorage();
//   }

//   const isAuthenticated = !!authStore.user;

//   // Nếu route yêu cầu xác thực và người dùng chưa đăng nhập
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return next({ name: 'sign-in' });
//   }

//   // Nếu route chỉ dành cho khách và người dùng đã đăng nhập
//   if (to.meta.requiresGuest && isAuthenticated) {
//     return next({ name: 'home' });
//   }

//   next();
// });

export default router;
