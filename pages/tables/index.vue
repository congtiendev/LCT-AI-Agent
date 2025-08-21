<!-- pages/tables/index.vue -->
<template>
    <div class="mx-auto max-w-screen-2xl p-4 md:p-6">
        <!-- Breadcrumb -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
                Data Tables
            </h2>
            <nav>
                <ol class="flex items-center gap-1.5">
                    <li>
                        <NuxtLink to="/"
                            class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                            Home
                            <svg class="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" stroke-width="1.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </NuxtLink>
                    </li>
                    <li class="text-sm text-gray-800 dark:text-white/90">
                        Data Tables
                    </li>
                </ol>
            </nav>
        </div>

        <div class="space-y-5 sm:space-y-6">
            <!-- DataTable 1 -->
            <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="px-5 py-4 sm:px-6 sm:py-5">
                    <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
                        Datatable 1
                    </h3>
                </div>
                <div class="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <DataTableOne />
                </div>
            </div>

            <!-- DataTable 2 -->
            <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="px-5 py-4 sm:px-6 sm:py-5">
                    <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
                        Datatable 2
                    </h3>
                </div>
                <div class="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <DataTableTwo />
                </div>
            </div>

            <!-- DataTable 3 -->
            <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div class="px-5 py-4 sm:px-6 sm:py-5">
                    <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
                        Datatable 3
                    </h3>
                </div>
                <div class="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <DataTableThree />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// SEO Meta
definePageMeta({
    title: 'Data Tables',
    description: 'Advanced data tables with sorting, filtering, and pagination'
})

useHead({
    title: 'Data Tables - Admin Dashboard',
    meta: [
        {
            name: 'description',
            content: 'Advanced data tables with sorting, filtering, and pagination functionality'
        }
    ]
})
</script>