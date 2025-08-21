// composables/useAuth.ts
import type { SignInCredentials, SignUpCredentials } from '~/types/auth'
import {
  validateSignIn,
  validateSignUp,
  formatZodErrors,
} from '~/utils/validation'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // Reactive form data
  const signInForm = ref<SignInCredentials>({
    email: '', // Có thể nhập email hoặc số điện thoại
    password: '',
  })

  const signUpForm = ref<SignUpCredentials>({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  // Form errors
  const signInErrors = ref<Record<string, string[]>>({})
  const signUpErrors = ref<Record<string, string[]>>({})

  // Form states
  const isSignInValid = computed(
    () => Object.keys(signInErrors.value).length === 0
  )
  const isSignUpValid = computed(
    () => Object.keys(signUpErrors.value).length === 0
  )

  // Notification system with SweetAlert
  const showNotification = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    if (process.client) {
      const { showNotification: showSwal } = useNotification()
      return showSwal(message, type)
    }
  }

  // Validate sign in form
  const validateSignInForm = () => {
    const result = validateSignIn(signInForm.value)

    if (result.success) {
      signInErrors.value = {}
      return true
    } else {
      signInErrors.value = formatZodErrors(result.error)
      return false
    }
  }

  // Validate sign up form
  const validateSignUpForm = () => {
    const result = validateSignUp(signUpForm.value)

    if (result.success) {
      signUpErrors.value = {}
      return true
    } else {
      signUpErrors.value = formatZodErrors(result.error)
      return false
    }
  }

  // Clear specific field error
  const clearFieldError = (form: 'signIn' | 'signUp', field: string) => {
    if (form === 'signIn') {
      delete signInErrors.value[field]
    } else {
      delete signUpErrors.value[field]
    }
  }

  // Handle sign in - using store action directly
  const handleSignIn = async () => {
    // Clear previous errors
    authStore.clearError()

    // Validate form
    if (!validateSignInForm()) {
      return false
    }

    // Attempt sign in using store action
    const success = await authStore.signIn(signInForm.value)

    if (success) {
      showNotification('Đăng nhập thành công!', 'success')

      // Get redirect URL from query params
      const route = useRoute()
      const redirectTo = (route.query.redirect as string) || '/'

      await router.push(redirectTo)
      return true
    } else {
      showNotification(authStore.error || 'Đăng nhập thất bại', 'error')
      return false
    }
  }

  // Handle sign up - using store action directly
  const handleSignUp = async () => {
    // Clear previous errors
    authStore.clearError()

    // Validate form
    if (!validateSignUpForm()) {
      return false
    }

    // Attempt sign up using store action
    const success = await authStore.signUp(signUpForm.value)

    if (success) {
      showNotification('Đăng ký thành công!', 'success')

      // Redirect to dashboard or redirect URL
      const route = useRoute()
      const redirectTo = (route.query.redirect as string) || '/'

      await router.push(redirectTo)
      return true
    } else {
      showNotification(authStore.error || 'Đăng ký thất bại', 'error')
      return false
    }
  }

  // Handle logout - using store action directly
  const handleLogout = async () => {
    try {
      authStore.logout()
      showNotification('Đăng xuất thành công!', 'success')
    } catch (error) {
      showNotification('Đã xảy ra lỗi khi đăng xuất', 'error')
    }
  }

  // Handle Google sign in - using store action
  const handleGoogleSignIn = async () => {
    const success = await authStore.signInWithGoogle()

    if (success) {
      showNotification('Đăng nhập Google thành công!', 'success')

      // Get redirect URL from query params
      const route = useRoute()
      const redirectTo = (route.query.redirect as string) || '/'

      await router.push(redirectTo)
      return true
    } else {
      showNotification(authStore.error || 'Đăng nhập Google thất bại', 'error')
      return false
    }
  }

  // Reset forms
  const resetSignInForm = () => {
    signInForm.value = {
      email: '', // Clear email/phone field
      password: '',
    }
    signInErrors.value = {}
    authStore.clearError()
  }

  const resetSignUpForm = () => {
    signUpForm.value = {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    }
    signUpErrors.value = {}
    authStore.clearError()
  }

  // Get field error helper
  const getFieldError = (
    form: 'signIn' | 'signUp',
    field: string
  ): string | undefined => {
    const errors = form === 'signIn' ? signInErrors.value : signUpErrors.value
    return errors[field]?.[0]
  }

  // Check if field has error
  const hasFieldError = (form: 'signIn' | 'signUp', field: string): boolean => {
    const errors = form === 'signIn' ? signInErrors.value : signUpErrors.value
    return !!errors[field]?.length
  }

  return {
    // Store state (computed for reactivity) - now includes profile data
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isLoading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),
    isLoggedIn: computed(() => authStore.isLoggedIn),
    userRole: computed(() => authStore.userRole),
    isAdmin: computed(() => authStore.isAdmin),
    userDisplayName: computed(() => authStore.userDisplayName),

    // Profile data from auth store
    userAvatar: computed(() => authStore.userAvatar),
    hasCompleteProfile: computed(() => authStore.hasCompleteProfile),
    formattedAddress: computed(() => authStore.formattedAddress),
    socialLinksArray: computed(() => authStore.socialLinksArray),

    // Form data
    signInForm,
    signUpForm,

    // Form errors
    signInErrors: readonly(signInErrors),
    signUpErrors: readonly(signUpErrors),

    // Form validation
    isSignInValid,
    isSignUpValid,
    validateSignInForm,
    validateSignUpForm,

    // Actions
    handleSignIn,
    handleSignUp,
    handleLogout,
    handleGoogleSignIn,

    // Utilities
    clearFieldError,
    resetSignInForm,
    resetSignUpForm,
    getFieldError,
    hasFieldError,

    // Store actions (direct access) - only include existing methods
    initializeAuth: authStore.initializeAuth,
    refreshUser: authStore.refreshUser,
    checkAuth: authStore.checkAuth,

    // Profile methods from auth store
    updateProfile: authStore.updateProfile,
    updateAddress: authStore.updateAddress,
    updateSocialLinks: authStore.updateSocialLinks,
    uploadAvatar: authStore.uploadAvatar,
    deleteAvatar: authStore.deleteAvatar,
  }
}
