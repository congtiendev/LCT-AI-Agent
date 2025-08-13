// composables/useUser.ts
export interface UserProfile {
  id: string | number
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'moderator' | 'guest'
  status: 'active' | 'inactive' | 'suspended'
  lastLogin?: Date
  createdAt: Date
  preferences: UserPreferences
  permissions: readonly string[]
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  emailNotifications: boolean
  pushNotifications: boolean
  twoFactorEnabled: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UpdateProfileData {
  name?: string
  email?: string
  avatar?: string
  preferences?: Partial<UserPreferences>
}

export interface UserState {
  user: Ref<UserProfile | null>
  isAuthenticated: Ref<boolean>
  isLoading: Ref<boolean>
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: UpdateProfileData) => Promise<void>
  refreshUser: () => Promise<void>
  hasPermission: (permission: string) => boolean
  hasRole: (role: UserProfile['role']) => boolean
}

export const useUser = (): UserState => {
  const user = ref<UserProfile | null>(null)
  const isLoading = ref<boolean>(false)

  const isAuthenticated = computed<boolean>(() => user.value !== null)

  // Initialize with mock user data
  const initializeUser = (): void => {
    user.value = {
      id: 1,
      name: 'Musharof Chowdhury',
      email: 'musharof@example.com',
      avatar: '/images/user/owner.jpg',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(),
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
      preferences: {
        theme: 'system',
        language: 'en',
        timezone: 'UTC+7',
        emailNotifications: true,
        pushNotifications: false,
        twoFactorEnabled: false,
      },
      permissions: [
        'read:dashboard',
        'write:projects',
        'delete:users',
        'admin:settings',
      ],
    }
  }

  const login = async (credentials: LoginCredentials): Promise<void> => {
    isLoading.value = true

    try {
      // Simulate API login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      if (credentials.email && credentials.password) {
        initializeUser()

        // Save to localStorage if remember me is checked
        if (credentials.rememberMe && process.client) {
          localStorage.setItem('user', JSON.stringify(user.value))
          localStorage.setItem('authToken', 'mock-jwt-token')
        }

        // Redirect to dashboard
        await navigateTo('/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    isLoading.value = true

    try {
      // Simulate API logout
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Clear user data
      user.value = null

      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')

        // Clear any other user-specific data
        const keysToRemove = ['darkMode', 'sidebarState', 'recentSearches']
        keysToRemove.forEach((key) => {
          localStorage.removeItem(key)
        })
      }

      // Redirect to login page
      await navigateTo('/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (data: UpdateProfileData): Promise<void> => {
    if (!user.value) {
      throw new Error('User not authenticated')
    }

    isLoading.value = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update user data
      user.value = {
        ...user.value,
        ...data,
        preferences: {
          ...user.value.preferences,
          ...data.preferences,
        },
      }

      // Save to localStorage
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const refreshUser = async (): Promise<void> => {
    if (!isAuthenticated.value) return

    isLoading.value = true

    try {
      // Simulate API call to refresh user data
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In real app, fetch fresh user data from API
      // const response = await $fetch('/api/user/me')
      // user.value = response.user
    } catch (error) {
      console.error('Refresh user error:', error)
      // If refresh fails, user might need to login again
      await logout()
    } finally {
      isLoading.value = false
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user.value) return false
    return user.value.permissions.includes(permission)
  }

  const hasRole = (role: UserProfile['role']): boolean => {
    if (!user.value) return false
    return user.value.role === role
  }

  // Auto-refresh user data periodically
  let refreshInterval: NodeJS.Timeout | null = null

  const startAutoRefresh = (): void => {
    if (process.client && !refreshInterval) {
      refreshInterval = setInterval(
        () => {
          if (isAuthenticated.value) {
            refreshUser()
          }
        },
        15 * 60 * 1000
      ) // Refresh every 15 minutes
    }
  }

  const stopAutoRefresh = (): void => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }

  // Initialize user from localStorage on app start
  const initializeFromStorage = (): void => {
    if (process.client) {
      try {
        const storedUser = localStorage.getItem('user')
        const authToken = localStorage.getItem('authToken')

        if (storedUser && authToken) {
          user.value = JSON.parse(storedUser)
          // Convert date strings back to Date objects
          if (user.value) {
            user.value.lastLogin = user.value.lastLogin
              ? new Date(user.value.lastLogin)
              : undefined
            user.value.createdAt = new Date(user.value.createdAt)
          }
          startAutoRefresh()
        }
      } catch (error) {
        console.warn('Failed to initialize user from storage:', error)
        // Clear corrupted data
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      }
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    initializeFromStorage()
  })

  onUnmounted(() => {
    stopAutoRefresh()
  })

  // Watch for authentication changes
  watch(isAuthenticated, (authenticated) => {
    if (authenticated) {
      startAutoRefresh()
    } else {
      stopAutoRefresh()
    }
  })

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    logout,
    updateProfile,
    refreshUser,
    hasPermission,
    hasRole,
  }
}
