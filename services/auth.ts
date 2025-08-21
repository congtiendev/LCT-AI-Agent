// services/authService.ts
import type { User, SignInCredentials, SignUpCredentials } from '~/types/auth'
import { getInputType } from '~/utils/validation'

// Mock database
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    fullName: 'Admin User',
    username: 'admin',
    phone: '0987654321',
    role: 'admin',
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@example.com',
    fullName: 'Regular User',
    username: 'user',
    phone: '0123456789',
    role: 'user',
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'test@gmail.com',
    fullName: 'Test User',
    username: 'testuser',
    phone: '0909123456',
    role: 'user',
    isVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// API Response types
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

// Auth Service
export class AuthService {
  // Sign in with email or phone
  static async signIn(
    credentials: SignInCredentials
  ): Promise<ApiResponse<User>> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const { email: emailOrPhone, password } = credentials
      const inputType = getInputType(emailOrPhone)

      // Find user by email or phone
      let user: User | undefined

      if (inputType === 'email') {
        user = MOCK_USERS.find((u) => u.email === emailOrPhone)
      } else if (inputType === 'phone') {
        user = MOCK_USERS.find((u) => u.phone === emailOrPhone)
      } else {
        // Try both email and phone if input type is unclear
        user = MOCK_USERS.find(
          (u) => u.email === emailOrPhone || u.phone === emailOrPhone
        )
      }

      if (!user) {
        return {
          success: false,
          message: 'Email/Số điện thoại không tồn tại trong hệ thống',
        }
      }

      // Mock password check (in real app, this would be handled by backend)
      if (password !== '0123456789') {
        return {
          success: false,
          message: 'Mật khẩu không chính xác',
        }
      }

      // Simulate additional checks
      if (!user.isVerified && user.role !== 'admin') {
        return {
          success: false,
          message: 'Tài khoản chưa được xác thực. Vui lòng kiểm tra email.',
        }
      }

      return {
        success: true,
        data: user,
        message: 'Đăng nhập thành công',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Đã xảy ra lỗi trong quá trình đăng nhập',
      }
    }
  }

  // Sign up
  static async signUp(
    credentials: SignUpCredentials
  ): Promise<ApiResponse<User>> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const { email, username, phone } = credentials

      // Check if email already exists
      const emailExists = MOCK_USERS.some((u) => u.email === email)
      if (emailExists) {
        return {
          success: false,
          message: 'Email đã được sử dụng',
        }
      }

      // Check if username already exists
      const usernameExists = MOCK_USERS.some((u) => u.username === username)
      if (usernameExists) {
        return {
          success: false,
          message: 'Tên đăng nhập đã được sử dụng',
        }
      }

      // Check if phone already exists
      const phoneExists = MOCK_USERS.some((u) => u.phone === phone)
      if (phoneExists) {
        return {
          success: false,
          message: 'Số điện thoại đã được sử dụng',
        }
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        fullName: credentials.fullName,
        username: credentials.username,
        phone: credentials.phone,
        role: 'user',
        isVerified: false, // Require email verification
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add to mock database
      MOCK_USERS.push(newUser)

      return {
        success: true,
        data: newUser,
        message: 'Đăng ký thành công',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Đã xảy ra lỗi trong quá trình đăng ký',
      }
    }
  }

  // Google OAuth
  static async signInWithGoogle(): Promise<ApiResponse<User>> {
    try {
      // Simulate Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock Google user data
      const googleUser: User = {
        id: 'google_' + Date.now(),
        email: 'google.user@gmail.com',
        fullName: 'Google User',
        username: 'googleuser' + Date.now(),
        phone: '0900000000',
        role: 'user',
        isVerified: true, // Google accounts are pre-verified
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return {
        success: true,
        data: googleUser,
        message: 'Đăng nhập Google thành công',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Đăng nhập Google thất bại',
      }
    }
  }

  // Get user by ID (for token validation)
  static async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      const user = MOCK_USERS.find((u) => u.id === id)

      if (!user) {
        return {
          success: false,
          message: 'Người dùng không tồn tại',
        }
      }

      return {
        success: true,
        data: user,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Không thể lấy thông tin người dùng',
      }
    }
  }

  // Refresh token (mock)
  static async refreshToken(
    token: string
  ): Promise<ApiResponse<{ token: string; user: User }>> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Extract user ID from mock token
      const userId = token.replace('mock_token_', '')
      const userResponse = await this.getUserById(userId)

      if (!userResponse.success || !userResponse.data) {
        return {
          success: false,
          message: 'Token không hợp lệ',
        }
      }

      return {
        success: true,
        data: {
          token: 'mock_token_' + userResponse.data.id,
          user: userResponse.data,
        },
      }
    } catch (error) {
      return {
        success: false,
        message: 'Không thể làm mới token',
      }
    }
  }

  // Logout (can be used for API cleanup)
  static async logout(): Promise<ApiResponse> {
    try {
      // In real app, this might invalidate tokens on server
      await new Promise((resolve) => setTimeout(resolve, 200))

      return {
        success: true,
        message: 'Đăng xuất thành công',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi đăng xuất',
      }
    }
  }
}
