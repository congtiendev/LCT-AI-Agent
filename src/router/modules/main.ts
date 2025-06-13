export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
    meta: { requiresAuth: true },
  },
];
