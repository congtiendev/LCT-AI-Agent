<!-- pages/index.vue -->
<template>
    <div class="p-5 mb-6 background-gradient-primary   rounded-2xl dark:border-gray-800 lg:p-6">
        <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex flex-col items-center w-full gap-6 xl:flex-row">
                <div class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                    <img src="/public/images/avatars/chatbot.png" alt="user">
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

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <!-- Active Agents Section -->
        <div class="xl:col-span-2">
            <div class="p-6 mb-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                            Active Agents
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Your currently running AI agents
                        </p>
                    </div>
                    <button
                        class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        View All
                    </button>
                </div>

                <!-- Agents List -->
                <div class="space-y-4">
                    <!-- Peter PM Agent -->
                    <div class="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <div
                                    class="w-12 h-12 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                                    <div
                                        class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                        PP
                                    </div>
                                </div>
                                <div
                                    class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900">
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white/90">Peter PM</h4>
                                    <span
                                        class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                        ACTIVE
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Project Manager Assistant
                                </p>
                                <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Tasks: 47</span>
                                    <span>Success: 96%</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Monitor
                            </button>
                            <button
                                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Configure
                            </button>
                            <button
                                class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Chat
                            </button>
                        </div>
                    </div>

                    <!-- Sarah CS Agent -->
                    <div class="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <div
                                    class="w-12 h-12 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                                    <div
                                        class="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                                        SC
                                    </div>
                                </div>
                                <div
                                    class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900">
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white/90">Sarah CS</h4>
                                    <span
                                        class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                        ACTIVE
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Customer Success Agent
                                </p>
                                <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Conversations: 23</span>
                                    <span>Rating: 4.8/5</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Monitor
                            </button>
                            <button
                                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Configure
                            </button>
                            <button
                                class="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Chat
                            </button>
                        </div>
                    </div>

                    <!-- Alex Dev Agent (Paused) -->
                    <div
                        class="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl opacity-75">
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                <div
                                    class="w-12 h-12 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                                    <div
                                        class="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-semibold text-sm">
                                        AD
                                    </div>
                                </div>
                                <div
                                    class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white dark:border-gray-900">
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="font-semibold text-gray-800 dark:text-white/90">Alex Dev</h4>
                                    <span
                                        class="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full">
                                        PAUSED
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Development Assistant
                                </p>
                                <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Reviews: 12</span>
                                    <span>Quality: 9.2/10</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Monitor
                            </button>
                            <button
                                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                Configure
                            </button>
                            <button
                                class="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
            <!-- Recent Activity -->
            <div class="p-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                    Recent Activity
                </h3>

                <div class="space-y-4">
                    <!-- Activity Item 1 -->
                    <div class="flex items-start gap-3">
                        <div
                            class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div class="w-2 h-2 bg-blue-600 dark:text-blue-400 rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-800 dark:text-white/90">
                                <span class="font-medium">Peter PM</span> completed daily standup
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {{ formatTimeAgo(activities.daily.timestamp) }}
                            </p>
                        </div>
                    </div>

                    <!-- Activity Item 2 -->
                    <div class="flex items-start gap-3">
                        <div
                            class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div class="w-2 h-2 bg-green-600 dark:text-green-400 rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-800 dark:text-white/90">
                                <span class="font-medium">Sarah CS</span> achieved 95% satisfaction
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {{ formatTimeAgo(activities.satisfaction.timestamp) }}
                            </p>
                        </div>
                    </div>

                    <!-- Activity Item 3 -->
                    <div class="flex items-start gap-3">
                        <div
                            class="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div class="w-2 h-2 bg-purple-600 dark:text-purple-400 rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-800 dark:text-white/90">
                                New integration: <span class="font-medium">Microsoft Teams</span>
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {{ formatTimeAgo(activities.integration.timestamp) }}
                            </p>
                        </div>
                    </div>

                    <!-- Activity Item 4 -->
                    <div class="flex items-start gap-3">
                        <div
                            class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div class="w-2 h-2 bg-orange-600 dark:text-orange-400 rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-800 dark:text-white/90">
                                <span class="font-medium">Alex Dev</span> paused for maintenance
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {{ formatTimeAgo(activities.maintenance.timestamp) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Performance Section -->
            <div class="p-6 bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                    Performance
                </h3>

                <!-- Success Rate -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Success Rate
                        </span>
                        <span class="text-sm font-semibold text-gray-800 dark:text-white/90">
                            {{ performance.successRate }}%
                        </span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-300"
                            :style="{ width: `${performance.successRate}%` }"></div>
                    </div>
                </div>

                <!-- Response Time -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Response Time
                        </span>
                        <span class="text-sm font-semibold text-gray-800 dark:text-white/90">
                            {{ performance.responseTime }}ms
                        </span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            :style="{ width: `${Math.min(performance.responseTime / 10, 100)}%` }"></div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-2 gap-3">
                    <button
                        class="p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors group">
                        <div
                            class="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 mx-auto mb-2">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span
                            class="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 font-medium">Settings</span>
                    </button>
                    <button
                        class="p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors group">
                        <div
                            class="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 mx-auto mb-2">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <span
                            class="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 font-medium">Analytics</span>
                    </button>
                </div>
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
// Interfaces
interface Activity {
    id: string
    type: 'completion' | 'achievement' | 'integration' | 'maintenance'
    user: string
    message: string
    timestamp: Date
}

interface Performance {
    successRate: number
    responseTime: number
    uptime: number
}

// Reactive data
const activities = ref({
    daily: { timestamp: new Date(Date.now() - 2 * 60 * 1000) }, // 2 minutes ago
    satisfaction: { timestamp: new Date(Date.now() - 15 * 60 * 1000) }, // 15 minutes ago
    integration: { timestamp: new Date(Date.now() - 60 * 60 * 1000) }, // 1 hour ago
    maintenance: { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) } // 2 hours ago
})

const performance = ref<Performance>({
    successRate: 94,
    responseTime: 230,
    uptime: 99.8
})

// Methods
const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
}
</script>