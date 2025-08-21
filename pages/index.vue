<!-- pages/index.vue -->
<template>
    <div class="p-5 mb-6 background-gradient-primary   rounded-2xl dark:border-gray-800 lg:p-6">
        <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
                <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                    <img src="/images/user/owner.jpg" alt="user">
                </div>
                <div class="order-3 xl:order-2">
                    <h4 class="mb-2 text-lg font-semibold text-center text-white dark:text-white/90 xl:text-left">
                        {{ $t('welcomeBack') }} , {{ userDisplayName }}!
                    </h4>
                    <div class="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                        <p class="text-sm text-gray-50 dark:text-gray-400">
                            {{ $t('base.appManagement') }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center w-full gap-3 xl:w-auto">
                <!-- Metric Item Start -->
                <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <p class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {{ $t('agent.activeAgents') }}
                    </p>

                    <div class="mt-3 flex items-end justify-between">
                        <div>
                            <h4 class="text-2xl font-bold text-gray-800 dark:text-white/90">
                                24.7K
                            </h4>
                        </div>
                    </div>
                </div>
                <!-- Metric Item End -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
const { user, isAuthenticated, userDisplayName, handleLogout } = useAuth()

// SEO
useHead({
    title: 'Dashboard',
    meta: [
        { name: 'description', content: 'Trang dashboard chính của ứng dụng' }
    ]
})

</script>