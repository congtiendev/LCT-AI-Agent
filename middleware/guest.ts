// middleware/guest.ts
// This middleware redirects authenticated users away from guest-only pages
// like sign-in, sign-up pages
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // Always initialize auth state first
  if (process.server) {
    await authStore.initializeAuth()
  }

  if (process.client) {
    // Always initialize on client side to ensure fresh state
    await authStore.initializeAuth()

    // Wait for next tick to ensure state is fully updated
    await nextTick()
  }

  // If user is authenticated, redirect away from guest pages
  if (authStore.checkAuth()) {
    // Check if there's a redirect query parameter
    const redirectTo = to.query.redirect as string

    console.log('Guest middleware: User is authenticated, redirecting...', {
      user: authStore.user?.email,
      redirectTo,
      currentPath: to.path,
    })

    // Redirect to intended destination or default to home
    return navigateTo(redirectTo && redirectTo !== to.path ? redirectTo : '/')
  }

  // Log for debugging
  console.log(
    'Guest middleware: User not authenticated, allowing access to:',
    to.path
  )
})
