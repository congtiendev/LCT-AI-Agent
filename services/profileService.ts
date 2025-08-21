// services/profileService.ts
import type { User } from '~/types/auth'

// Profile interfaces
export interface ProfileUpdateData {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio?: string // Make bio optional
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

export interface AddressUpdateData {
  country: string
  cityState: string
  postalCode: string
  taxId: string
  fullAddress?: string
}

export interface SocialLinksData {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

// API Response types
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export class ProfileService {
  // Update basic profile information
  static async updateProfile(
    userId: string,
    profileData: ProfileUpdateData
  ): Promise<ApiResponse<User>> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation
      if (!profileData.firstName?.trim()) {
        return {
          success: false,
          message: 'First name is required',
          errors: { firstName: ['First name cannot be empty'] },
        }
      }

      if (!profileData.email?.trim()) {
        return {
          success: false,
          message: 'Email is required',
          errors: { email: ['Email cannot be empty'] },
        }
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(profileData.email)) {
        return {
          success: false,
          message: 'Invalid email format',
          errors: { email: ['Please enter a valid email address'] },
        }
      }

      // Phone validation (Vietnamese format)
      if (
        profileData.phone &&
        !profileData.phone.match(/^(0[3|5|7|8|9])\d{8}$/)
      ) {
        return {
          success: false,
          message: 'Invalid phone format',
          errors: { phone: ['Please enter a valid Vietnamese phone number'] },
        }
      }

      // Mock updated user data
      const updatedUser: User = {
        id: userId,
        fullName: `${profileData.firstName} ${profileData.lastName}`.trim(),
        username:
          profileData.firstName.toLowerCase() +
          Math.random().toString(36).substring(2, 5),
        email: profileData.email,
        phone: profileData.phone || '',
        role: 'user', // Keep existing role
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      return {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile',
      }
    }
  }

  // Update address information
  static async updateAddress(
    userId: string,
    addressData: AddressUpdateData
  ): Promise<ApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (!addressData.country?.trim()) {
        return {
          success: false,
          message: 'Country is required',
          errors: { country: ['Please select a country'] },
        }
      }

      if (!addressData.cityState?.trim()) {
        return {
          success: false,
          message: 'City/State is required',
          errors: { cityState: ['City/State cannot be empty'] },
        }
      }

      // In real app, you would save to database
      // For now, we'll return success with the data
      return {
        success: true,
        data: addressData,
        message: 'Address updated successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update address',
      }
    }
  }

  // Update social media links
  static async updateSocialLinks(
    userId: string,
    socialData: SocialLinksData
  ): Promise<ApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Validate URLs if provided
      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

      const errors: Record<string, string[]> = {}

      if (socialData.facebook && !urlRegex.test(socialData.facebook)) {
        errors.facebook = ['Please enter a valid Facebook URL']
      }

      if (socialData.twitter && !urlRegex.test(socialData.twitter)) {
        errors.twitter = ['Please enter a valid Twitter URL']
      }

      if (socialData.linkedin && !urlRegex.test(socialData.linkedin)) {
        errors.linkedin = ['Please enter a valid LinkedIn URL']
      }

      if (socialData.instagram && !urlRegex.test(socialData.instagram)) {
        errors.instagram = ['Please enter a valid Instagram URL']
      }

      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          message: 'Please check your social media URLs',
          errors,
        }
      }

      return {
        success: true,
        data: socialData,
        message: 'Social links updated successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update social links',
      }
    }
  }

  // Upload avatar
  static async uploadAvatar(
    userId: string,
    file: File
  ): Promise<ApiResponse<{ avatarUrl: string }>> {
    try {
      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ]
      if (!allowedTypes.includes(file.type)) {
        return {
          success: false,
          message:
            'Invalid file type. Please upload an image file (JPEG, PNG, GIF, WebP)',
          errors: { avatar: ['Invalid file type'] },
        }
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        return {
          success: false,
          message: 'File too large. Please upload an image smaller than 5MB',
          errors: { avatar: ['File size exceeds limit'] },
        }
      }

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock uploaded avatar URL
      const avatarUrl = `https://api.yourapp.com/avatars/${userId}/${Date.now()}-${file.name}`

      return {
        success: true,
        data: { avatarUrl },
        message: 'Avatar uploaded successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to upload avatar',
      }
    }
  }

  // Get user profile data (extended)
  static async getProfile(userId: string): Promise<
    ApiResponse<{
      user: User
      address: AddressUpdateData
      socialLinks: SocialLinksData
      bio: string
    }>
  > {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock profile data
      const profileData = {
        user: {
          id: userId,
          fullName: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          phone: '0987654321',
          role: 'user' as const,
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        address: {
          country: 'Vietnam',
          cityState: 'Ho Chi Minh City, Vietnam',
          postalCode: '70000',
          taxId: 'VN123456789',
          fullAddress: '123 Nguyen Hue Street, District 1, Ho Chi Minh City',
        },
        socialLinks: {
          facebook: 'https://facebook.com/johndoe',
          twitter: 'https://twitter.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          instagram: 'https://instagram.com/johndoe',
        },
        bio: 'Full-stack developer passionate about creating amazing web experiences.',
      }

      return {
        success: true,
        data: profileData,
        message: 'Profile loaded successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to load profile',
      }
    }
  }

  // Update complete profile (all in one)
  static async updateCompleteProfile(
    userId: string,
    profileData: ProfileUpdateData,
    addressData: AddressUpdateData,
    socialData: SocialLinksData
  ): Promise<ApiResponse<User>> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update profile
      const profileResult = await this.updateProfile(userId, profileData)
      if (!profileResult.success) {
        return profileResult
      }

      // Update address
      const addressResult = await this.updateAddress(userId, addressData)
      if (!addressResult.success) {
        return {
          success: false,
          message: 'Profile updated but address update failed',
        }
      }

      // Update social links
      const socialResult = await this.updateSocialLinks(userId, socialData)
      if (!socialResult.success) {
        return {
          success: false,
          message: 'Profile and address updated but social links update failed',
        }
      }

      return {
        success: true,
        data: profileResult.data,
        message: 'Complete profile updated successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update complete profile',
      }
    }
  }

  // Delete avatar
  static async deleteAvatar(userId: string): Promise<ApiResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message: 'Avatar deleted successfully',
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete avatar',
      }
    }
  }
}
