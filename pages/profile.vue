<template>
    <main class="p-4 mx-auto  md:p-6">
        <!-- Breadcrumb -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
                Profile
            </h2>
            <nav>
                <ol class="flex items-center gap-1.5">
                    <li>
                        <NuxtLink to="/"
                            class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                            Home
                            <svg class="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke-width="1.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </NuxtLink>
                    </li>
                    <li class="text-sm text-gray-800 dark:text-white/90">Profile</li>
                </ol>
            </nav>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                Profile
            </h3>

            <!-- Profile Header -->
            <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <!-- Avatar with Upload -->
                        <img :src="userAvatar"
                            class="w-14 h-14 object-cover transition-all duration-200 group-hover:brightness-75 rounded-full" />

                        <!-- User Info -->
                        <div class="order-3 xl:order-2">
                            <h4
                                class="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {{ userDisplayName }}
                            </h4>
                            <div class="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ userRole === 'admin' ? 'Administrator' : 'User' }}
                                </p>
                                <div class="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ userLocation }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button @click="openProfileModal" :disabled="isLoading"
                        class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white p-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-user-round-pen-icon lucide-user-round-pen">
                            <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                            <path
                                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                            <circle cx="10" cy="8" r="5" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Personal Information -->
            <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Personal Information
                        </h4>

                        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    First Name
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ firstName }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Last Name
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ lastName }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Email address
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.email || 'Not provided' }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Phone
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.phone || 'Not provided' }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Bio
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.bio || 'No bio provided' }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Username
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.username || 'Not provided' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button @click="openProfileModal" :disabled="isLoading"
                        class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white p-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-user-round-pen-icon lucide-user-round-pen">
                            <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                            <path
                                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                            <circle cx="10" cy="8" r="5" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Address Information -->
            <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Address
                        </h4>

                        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Country
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.address?.country || 'Not provided' }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    City/State
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.address?.cityState || 'Not provided' }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Postal Code
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.address?.postalCode || 'Not provided' }}
                                </p>
                            </div>

                            <div>
                                <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    TAX ID
                                </p>
                                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {{ user?.address?.taxId || 'Not provided' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button @click="openAddressModal" :disabled="isLoading"
                        class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white p-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-user-round-pen-icon lucide-user-round-pen">
                            <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                            <path
                                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                            <circle cx="10" cy="8" r="5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Profile Info Modal -->
        <ProfileInfoModal v-model:show="showProfileInfoModal" :profile-form="profileForm" :loading="isLoading"
            @save="saveProfileInfo" />

        <!-- Profile Address Modal -->
        <ProfileAddressModal v-model:show="showProfileAddressModal" :address-form="addressForm" :loading="isLoading"
            @save="saveAddressInfo" />
    </main>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
    middleware: 'auth'
})

// Use profile composable
const {
    // State
    profileForm,
    addressForm,
    showProfileInfoModal,
    showProfileAddressModal,

    // Computed
    user,
    isLoading,
    error,
    firstName,
    lastName,
    userAvatar,
    userDisplayName,
    userRole,
    userLocation,

    // Methods
    saveProfileInfo,
    saveAddressInfo,
    uploadAvatar,
    deleteAvatar,
    openProfileModal,
    openAddressModal,
} = useProfile()

// SEO
useSeoMeta({
    title: 'Profile - Your App',
    description: 'Manage your profile information and settings'
})
</script>
