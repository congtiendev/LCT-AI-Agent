// middleware/auth.ts
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

  // Check if user is authenticated
  if (!authStore.checkAuth()) {
    // Store the intended destination for redirect after login
    const redirectTo = to.fullPath

    console.log(
      'Auth middleware: User not authenticated, redirecting to sign-in...',
      {
        intendedPath: redirectTo,
      }
    )

    // Redirect to sign-in page with return URL
    return navigateTo({
      path: '/sign-in',
      query: redirectTo !== '/sign-in' ? { redirect: redirectTo } : {},
    })
  }

  // Log for debugging
  console.log(
    'Auth middleware: User authenticated, allowing access to:',
    to.path,
    {
      user: authStore.user?.email,
    }
  )
})
