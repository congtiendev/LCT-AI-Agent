// stores/auth.ts
import { defineStore } from 'pinia'
import type {
  User,
  AuthState,
  SignInCredentials,
  SignUpCredentials,
} from '~/types/auth'
import { AuthService } from '~/services/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.user,
    userRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === 'admin',
    userDisplayName: (state) =>
      state.user?.fullName || state.user?.username || 'User',

    // Profile getters
    userAvatar: (state) => state.user?.avatar || '/images/avatars/chatbot.png',
    userBio: (state) => state.user?.bio || '',
    userAddress: (state) => state.user?.address || null,
    userSocialLinks: (state) => state.user?.socialLinks || null,

    formattedAddress: (state) => {
      if (!state.user?.address) return 'Location not set'
      const addr = state.user.address
      return `${addr.cityState}, ${addr.country} ${addr.postalCode || ''}`.trim()
    },

    socialLinksArray: (state) => {
      if (!state.user?.socialLinks) return []

      return [
        {
          name: 'Facebook',
          url: state.user.socialLinks.facebook,
          icon: 'facebook',
        },
        {
          name: 'Twitter',
          url: state.user.socialLinks.twitter,
          icon: 'twitter',
        },
        {
          name: 'LinkedIn',
          url: state.user.socialLinks.linkedin,
          icon: 'linkedin',
        },
        {
          name: 'Instagram',
          url: state.user.socialLinks.instagram,
          icon: 'instagram',
        },
      ].filter((link) => link.url)
    },

    hasCompleteProfile: (state) => {
      return !!(
        state.user &&
        state.user.address &&
        state.user.socialLinks &&
        state.user.bio
      )
    },
  },

  actions: {
    // Basic state management
    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    clearError() {
      this.error = null
    },

    // User management
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user

      // Persist to cookies
      if (user) {
        const tokenCookie = useCookie('auth_token', {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: 'lax',
        })
        const userCookie = useCookie('auth_user', {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: 'lax',
        })

        tokenCookie.value = 'mock_token_' + user.id
        userCookie.value = JSON.stringify(user)
      } else {
        const tokenCookie = useCookie('auth_token')
        const userCookie = useCookie('auth_user')
        tokenCookie.value = null
        userCookie.value = null
      }
    },

    // Initialize auth state from cookies
    async initializeAuth(): Promise<void> {
      try {
        const userCookie = useCookie('auth_user')
        const tokenCookie = useCookie('auth_token')

        if (userCookie.value && tokenCookie.value) {
          const user =
            typeof userCookie.value === 'string'
              ? (JSON.parse(userCookie.value) as User)
              : (userCookie.value as User)

          this.user = user
          this.isAuthenticated = true
        } else {
          this.user = null
          this.isAuthenticated = false
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        this.logout()
      }
    },

    // Authentication methods
    async signIn(credentials: SignInCredentials): Promise<boolean> {
      this.setLoading(true)
      this.clearError()

      try {
        const response = await AuthService.signIn(credentials)

        if (response.success && response.data) {
          this.setUser(response.data)
          return true
        } else {
          this.setError(response.message || 'Đăng nhập thất bại')
          return false
        }
      } catch (error) {
        this.setError('Đã xảy ra lỗi trong quá trình đăng nhập')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async signUp(credentials: SignUpCredentials): Promise<boolean> {
      this.setLoading(true)
      this.clearError()

      try {
        const response = await AuthService.signUp(credentials)

        if (response.success && response.data) {
          this.setUser(response.data)
          return true
        } else {
          this.setError(response.message || 'Đăng ký thất bại')
          return false
        }
      } catch (error) {
        this.setError('Đã xảy ra lỗi trong quá trình đăng ký')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async signInWithGoogle(): Promise<boolean> {
      this.setLoading(true)
      this.clearError()

      try {
        const response = await AuthService.signInWithGoogle()

        if (response.success && response.data) {
          this.setUser(response.data)
          return true
        } else {
          this.setError(response.message || 'Đăng nhập Google thất bại')
          return false
        }
      } catch (error) {
        this.setError('Đăng nhập Google thất bại')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    logout() {
      this.setUser(null)

      if (process.client) {
        navigateTo('/sign-in')
      }
    },

    checkAuth(): boolean {
      return this.isAuthenticated && !!this.user
    },

    // Profile methods
    async updateProfile(profileData: {
      firstName: string
      lastName: string
      email: string
      phone: string
      bio?: string
    }): Promise<boolean> {
      if (!this.user?.id) return false

      this.setLoading(true)
      this.clearError()

      try {
        const { ProfileService } = await import('~/services/profileService')
        const response = await ProfileService.updateProfile(
          this.user.id,
          profileData
        )

        if (response.success && response.data) {
          // Update user data
          this.user = {
            ...response.data,
            // Keep profile data
            bio: profileData.bio || this.user.bio,
            address: this.user.address,
            socialLinks: this.user.socialLinks,
            avatar: this.user.avatar,
          }

          // Update cookie
          const userCookie = useCookie('auth_user')
          userCookie.value = JSON.stringify(this.user)

          return true
        } else {
          this.setError(response.message || 'Failed to update profile')
          return false
        }
      } catch (error) {
        this.setError('Network error while updating profile')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async updateAddress(addressData: {
      country: string
      cityState: string
      postalCode: string
      taxId: string
      fullAddress?: string
    }): Promise<boolean> {
      if (!this.user?.id) return false

      this.setLoading(true)
      this.clearError()

      try {
        const { ProfileService } = await import('~/services/profileService')
        const response = await ProfileService.updateAddress(
          this.user.id,
          addressData
        )

        if (response.success) {
          // Update user address
          this.user = {
            ...this.user,
            address: addressData,
          }

          // Update cookie
          const userCookie = useCookie('auth_user')
          userCookie.value = JSON.stringify(this.user)

          return true
        } else {
          this.setError(response.message || 'Failed to update address')
          return false
        }
      } catch (error) {
        this.setError('Network error while updating address')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async updateSocialLinks(socialData: {
      facebook?: string
      twitter?: string
      linkedin?: string
      instagram?: string
    }): Promise<boolean> {
      if (!this.user?.id) return false

      this.setLoading(true)
      this.clearError()

      try {
        const { ProfileService } = await import('~/services/profileService')
        const response = await ProfileService.updateSocialLinks(
          this.user.id,
          socialData
        )

        if (response.success) {
          // Update user social links
          this.user = {
            ...this.user,
            socialLinks: socialData,
          }

          // Update cookie
          const userCookie = useCookie('auth_user')
          userCookie.value = JSON.stringify(this.user)

          return true
        } else {
          this.setError(response.message || 'Failed to update social links')
          return false
        }
      } catch (error) {
        this.setError('Network error while updating social links')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async uploadAvatar(file: File): Promise<boolean> {
      if (!this.user?.id) return false

      this.setLoading(true)
      this.clearError()

      try {
        const { ProfileService } = await import('~/services/profileService')
        const response = await ProfileService.uploadAvatar(this.user.id, file)

        if (response.success && response.data) {
          // Update user avatar
          this.user = {
            ...this.user,
            avatar: response.data.avatarUrl,
          }

          // Update cookie
          const userCookie = useCookie('auth_user')
          userCookie.value = JSON.stringify(this.user)

          return true
        } else {
          this.setError(response.message || 'Failed to upload avatar')
          return false
        }
      } catch (error) {
        this.setError('Network error while uploading avatar')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async deleteAvatar(): Promise<boolean> {
      if (!this.user?.id) return false

      this.setLoading(true)
      this.clearError()

      try {
        const { ProfileService } = await import('~/services/profileService')
        const response = await ProfileService.deleteAvatar(this.user.id)

        if (response.success) {
          // Remove avatar from user
          this.user = {
            ...this.user,
            avatar: undefined,
          }

          // Update cookie
          const userCookie = useCookie('auth_user')
          userCookie.value = JSON.stringify(this.user)

          return true
        } else {
          this.setError(response.message || 'Failed to delete avatar')
          return false
        }
      } catch (error) {
        this.setError('Network error while deleting avatar')
        return false
      } finally {
        this.setLoading(false)
      }
    },

    async refreshUser(): Promise<void> {
      if (!this.user) return

      try {
        this.setLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 500))

        const updatedUser = {
          ...this.user,
          updatedAt: new Date().toISOString(),
        }

        this.setUser(updatedUser)
      } catch (error) {
        console.error('Error refreshing user:', error)
        this.setError('Không thể cập nhật thông tin người dùng')
      } finally {
        this.setLoading(false)
      }
    },
  },
})
