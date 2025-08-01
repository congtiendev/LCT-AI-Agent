export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.layout !== undefined && to.meta.layout !== 'default') {
    return
  }
  if (
    to.path.startsWith('/sign-in') ||
    to.path.startsWith('/sign-up') ||
    to.path.startsWith('/auth/')
  ) {
    setPageLayout('auth')
  } else {
    setPageLayout('default')
  }
})
