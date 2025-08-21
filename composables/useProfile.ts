// composables/useProfile.ts
export interface ProfileForm {
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

export interface AddressForm {
  country: string
  cityState: string
  postalCode: string
  taxId: string
  fullAddress: string
}

export const useProfile = () => {
  const authStore = useAuthStore()

  // Profile form data
  const profileForm = ref<ProfileForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  })

  // Address form data
  const addressForm = ref<AddressForm>({
    country: '',
    cityState: '',
    postalCode: '',
    taxId: '',
    fullAddress: '',
  })

  // Modal states
  const showProfileInfoModal = ref(false)
  const showProfileAddressModal = ref(false)

  // Computed from auth store
  const user = computed(() => authStore.user)
  const isLoading = computed(() => authStore.isLoading)
  const isProfileLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)
  const profileError = computed(() => authStore.error)

  // User computed properties
  const firstName = computed(() => {
    const fullName = user.value?.fullName || ''
    return fullName.split(' ')[0] || 'N/A'
  })

  const lastName = computed(() => {
    const fullName = user.value?.fullName || ''
    const parts = fullName.split(' ')
    return parts.slice(1).join(' ') || 'N/A'
  })

  const userAvatar = computed(() => authStore.userAvatar)
  const userDisplayName = computed(() => authStore.userDisplayName)
  const userRole = computed(() => authStore.userRole)
  const userLocation = computed(() => authStore.formattedAddress)
  const socialLinks = computed(() => authStore.socialLinksArray)
  const hasCompleteProfile = computed(() => authStore.hasCompleteProfile)

  // Methods
  const openSocialLink = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const saveProfileInfo = async (formData: Partial<ProfileForm>) => {
    if (!user.value?.id) {
      showNotification('User not found', 'error')
      return false
    }

    try {
      // Update local form
      Object.assign(profileForm.value, formData)

      // Prepare basic profile data with safe bio
      const basicProfileData = {
        firstName: formData.firstName || profileForm.value.firstName,
        lastName: formData.lastName || profileForm.value.lastName,
        email: formData.email || profileForm.value.email,
        phone: formData.phone || profileForm.value.phone,
        bio: formData.bio || profileForm.value.bio || '', // Ensure bio is never undefined
      }

      // Update profile
      const success = await authStore.updateProfile(basicProfileData)

      if (success) {
        // Update social links separately if provided
        const hasSocialData =
          formData.facebook ||
          formData.twitter ||
          formData.linkedin ||
          formData.instagram

        if (hasSocialData) {
          const socialData = {
            facebook: formData.facebook || '',
            twitter: formData.twitter || '',
            linkedin: formData.linkedin || '',
            instagram: formData.instagram || '',
          }

          await authStore.updateSocialLinks(socialData)
        }

        showProfileInfoModal.value = false
        showNotification('Profile updated successfully!', 'success')
        return true
      } else {
        showNotification(error.value || 'Failed to update profile', 'error')
        return false
      }
    } catch (err) {
      console.error('Error saving profile:', err)
      showNotification('Error updating profile', 'error')
      return false
    }
  }

  const saveAddressInfo = async (formData: Partial<AddressForm>) => {
    if (!user.value?.id) {
      showNotification('User not found', 'error')
      return false
    }

    try {
      Object.assign(addressForm.value, formData)

      const success = await authStore.updateAddress({
        country: formData.country || addressForm.value.country,
        cityState: formData.cityState || addressForm.value.cityState,
        postalCode: formData.postalCode || addressForm.value.postalCode,
        taxId: formData.taxId || addressForm.value.taxId,
        fullAddress: formData.fullAddress || addressForm.value.fullAddress,
      })

      if (success) {
        showProfileAddressModal.value = false
        showNotification('Address updated successfully!', 'success')
        return true
      } else {
        showNotification(error.value || 'Failed to update address', 'error')
        return false
      }
    } catch (err) {
      console.error('Error saving address:', err)
      showNotification('Error updating address', 'error')
      return false
    }
  }

  const uploadAvatar = async (file: File) => {
    const success = await authStore.uploadAvatar(file)

    if (success) {
      showNotification('Avatar uploaded successfully!', 'success')
      return true
    } else {
      showNotification(error.value || 'Failed to upload avatar', 'error')
      return false
    }
  }

  const deleteAvatar = async () => {
    if (!user.value?.id) {
      showNotification('User not found', 'error')
      return false
    }

    try {
      // Show confirmation dialog
      const { showDeleteConfirm } = useNotification()
      const result = await showDeleteConfirm('ảnh đại diện của bạn')

      if (!result.isConfirmed) {
        return false
      }

      // Use auth store method
      const success = await authStore.deleteAvatar()

      if (success) {
        showNotification('Ảnh đại diện đã được xóa thành công!', 'success')
        return true
      } else {
        showNotification(error.value || 'Lỗi khi xóa ảnh đại diện', 'error')
        return false
      }
    } catch (err) {
      console.error('Error deleting avatar:', err)
      showNotification('Lỗi khi xóa ảnh đại diện', 'error')
      return false
    }
  }

  // Initialize form data from user
  const initializeFormData = () => {
    if (user.value) {
      profileForm.value = {
        firstName: firstName.value === 'N/A' ? '' : firstName.value,
        lastName: lastName.value === 'N/A' ? '' : lastName.value,
        email: user.value.email || '',
        phone: user.value.phone || '',
        bio: user.value.bio || '',
        facebook: user.value.socialLinks?.facebook || '',
        twitter: user.value.socialLinks?.twitter || '',
        linkedin: user.value.socialLinks?.linkedin || '',
        instagram: user.value.socialLinks?.instagram || '',
      }

      addressForm.value = {
        country: user.value.address?.country || '',
        cityState: user.value.address?.cityState || '',
        postalCode: user.value.address?.postalCode || '',
        taxId: user.value.address?.taxId || '',
        fullAddress: user.value.address?.fullAddress || '',
      }
    }
  }

  // Modal controls
  const openProfileModal = () => {
    initializeFormData() // Refresh form data when opening
    showProfileInfoModal.value = true
  }

  const closeProfileModal = () => {
    showProfileInfoModal.value = false
  }

  const openAddressModal = () => {
    initializeFormData() // Refresh form data when opening
    showProfileAddressModal.value = true
  }

  const closeAddressModal = () => {
    showProfileAddressModal.value = false
  }

  const showNotification = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    if (process.client) {
      const { showNotification: showSwal } = useNotification()
      return showSwal(message, type)
    }
  }

  // Initialize form data when user changes
  watch(
    user,
    (newUser) => {
      if (newUser) {
        initializeFormData()
      }
    },
    { immediate: true, deep: true }
  )

  return {
    // State
    profileForm,
    addressForm,
    showProfileInfoModal,
    showProfileAddressModal,

    // Computed from auth store
    user,
    isLoading,
    isProfileLoading,
    error,
    profileError,
    hasCompleteProfile,

    // User computed
    firstName,
    lastName,
    userAvatar,
    userDisplayName,
    userRole,
    userLocation,
    socialLinks,

    // Methods
    openSocialLink,
    saveProfileInfo,
    saveAddressInfo,
    uploadAvatar,
    deleteAvatar,
    initializeFormData,

    // Modal controls
    openProfileModal,
    closeProfileModal,
    openAddressModal,
    closeAddressModal,

    // Utilities
    showNotification,
  }
}
