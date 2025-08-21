// types/profile.ts
export interface UserAddress {
  country: string
  cityState: string
  postalCode: string
  taxId: string
  fullAddress?: string
}

export interface UserSocialLinks {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

export interface UserProfile {
  bio?: string
  address?: UserAddress
  socialLinks?: UserSocialLinks
  avatar?: string
}

// Form interfaces for UI
export interface ProfileFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
}

export interface AddressFormData {
  country: string
  cityState: string
  postalCode: string
  taxId: string
  fullAddress: string
}

// API interfaces
export interface ProfileUpdateRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio?: string
}

export interface AddressUpdateRequest {
  country: string
  cityState: string
  postalCode: string
  taxId: string
  fullAddress?: string
}

export interface SocialLinksUpdateRequest {
  facebook?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}
