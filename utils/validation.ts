// utils/validation.ts
import { z } from 'zod'
import type { SignInCredentials, SignUpCredentials } from '~/types/auth'

// Helper để check email hoặc phone
const emailOrPhoneSchema = z.string().refine(
  (value) => {
    // Check if it's a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check if it's a valid Vietnamese phone number
    const phoneRegex = /^(0[3|5|7|8|9])\d{8}$/

    return emailRegex.test(value) || phoneRegex.test(value)
  },
  {
    message: 'Vui lòng nhập email hợp lệ hoặc số điện thoại (VD: 0987654321)',
  }
)

// Sign In Schema
const signInSchema = z.object({
  email: emailOrPhoneSchema,
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
})

// Phone number schema
const phoneSchema = z
  .string()
  .regex(/^(0[3|5|7|8|9])\d{8}$/, 'Số điện thoại không hợp lệ (VD: 0987654321)')

// Email schema
const emailSchema = z
  .string()
  .email('Email không hợp lệ')
  .min(1, 'Email là bắt buộc')

// Sign Up Schema
const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Họ tên phải có ít nhất 2 ký tự')
      .max(50, 'Họ tên không được vượt quá 50 ký tự')
      .regex(
        /^[a-zA-ZÀ-ỹ\s]+$/,
        'Họ tên chỉ được chứa chữ cái và khoảng trắng'
      ),
    username: z
      .string()
      .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
      .max(20, 'Tên đăng nhập không được vượt quá 20 ký tự')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới'
      ),
    email: emailSchema,
    phone: phoneSchema,
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(50, 'Mật khẩu không được vượt quá 50 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
      ),
    confirmPassword: z.string(),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, 'Bạn phải đồng ý với điều khoản sử dụng'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

// Validation functions
export const validateSignIn = (data: SignInCredentials) => {
  return signInSchema.safeParse(data)
}

export const validateSignUp = (data: SignUpCredentials) => {
  return signUpSchema.safeParse(data)
}

// Format Zod errors for easier consumption
export const formatZodErrors = (
  error: z.ZodError
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {}

  error.issues.forEach((err) => {
    const path = err.path.join('.')
    if (!errors[path]) {
      errors[path] = []
    }
    errors[path].push(err.message)
  })

  return errors
}

// Utility functions for checking input type
export const isEmail = (input: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(input)
}

export const isPhone = (input: string): boolean => {
  const phoneRegex = /^(0[3|5|7|8|9])\d{8}$/
  return phoneRegex.test(input)
}

export const getInputType = (input: string): 'email' | 'phone' | 'unknown' => {
  if (isEmail(input)) return 'email'
  if (isPhone(input)) return 'phone'
  return 'unknown'
}
