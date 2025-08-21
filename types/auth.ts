// types/auth.ts
export interface User {
  id: string
  email: string
  fullName: string
  username: string
  phone: string
  role: 'admin' | 'user'
  isVerified: boolean
  createdAt: string
  updatedAt: string
  // Optional profile fields
  bio?: string
  avatar?: string
  address?: {
    country: string
    cityState: string
    postalCode: string
    taxId: string
    fullAddress?: string
  }
  socialLinks?: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
  }
}

export interface SignInCredentials {
  email: string // Có thể là email hoặc số điện thoại
  password: string
}

export interface SignUpCredentials {
  fullName: string
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthResponse {
  success: boolean
  data?: User
  message?: string
  errors?: Record<string, string[]>
}
