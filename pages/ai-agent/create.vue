<template>
    <!-- Breadcrumb -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            Create Agent
        </h2>
        <nav>
            <ol class="flex items-center gap-1.5">
                <li>
                    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        Home
                        <svg class="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" stroke-width="1.2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </NuxtLink>
                </li>
                <li class="text-sm text-gray-800 dark:text-white/90">
                    Create Agent
                </li>
            </ol>
        </nav>
    </div>

    <div class="grid grid-cols-2 gap-4 justify-center max-w-5xl mx-auto">
        <section
            class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 text-center"
            :class="{ 'ring-2 ring-primary-blue': createType === 'template' }" @click="changeCreateType('template')">
            <div
                class="mx-auto mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-primary-blue  text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-layout-template-icon lucide-layout-template">
                    <rect width="18" height="7" x="3" y="3" rx="1" />
                    <rect width="9" height="7" x="3" y="14" rx="1" />
                    <rect width="5" height="7" x="16" y="14" rx="1" />
                </svg>
            </div>
            <h4 class="text-title-xs font-bold text-gray-800 dark:text-white/90 ">
                From Template
            </h4>
            <p class="text-theme-sm text-gray-500 dark:text-gray-400 my-3">
                Start with a pre-built template and customize it for your needs
            </p>
            <button
                class="w-full text-center flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg  bg-primary-blue shadow-theme-xs hover:bg-brand-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-circle-plus-icon lucide-circle-plus">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                </svg>
                Quick Start
            </button>
        </section>

        <section
            class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 text-center"
            :class="{ 'ring-2 ring-primary-purple': createType === 'custom' }" @click="changeCreateType('custom')">
            <div
                class="mx-auto mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-primary-purple text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-cog-icon lucide-cog">
                    <path d="M11 10.27 7 3.34" />
                    <path d="m11 13.73-4 6.93" />
                    <path d="M12 22v-2" />
                    <path d="M12 2v2" />
                    <path d="M14 12h8" />
                    <path d="m17 20.66-1-1.73" />
                    <path d="m17 3.34-1 1.73" />
                    <path d="M2 12h2" />
                    <path d="m20.66 17-1.73-1" />
                    <path d="m20.66 7-1.73 1" />
                    <path d="m3.34 17 1.73-1" />
                    <path d="m3.34 7 1.73 1" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="12" r="8" />
                </svg>
            </div>
            <h4 class="text-title-xs font-bold text-gray-800 dark:text-white/90 ">
                Custom Build
            </h4>
            <p class="text-theme-sm text-gray-500 dark:text-gray-400 my-3">
                Build from scratch with full control over capabilities and behavior
            </p>
            <button
                class="w-full text-center flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-primary-purple shadow-theme-xs hover:bg-brand-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-hammer-icon lucide-hammer">
                    <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
                    <path d="m18 15 4-4" />
                    <path
                        d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
                </svg>
                Build Custom
            </button>
        </section>


    </div>
    <section id="agent__template" v-if="createType === 'template'" class="h-screen">
        <div v-if="!selectedAgentTemplate" class=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            py-8">
            <div v-for="agent in agents" :key="agent.id" @click="selectAgentTemplate(agent)"
                class="group  rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 hover:cursor-pointer">
                <!-- Agent Icon/Avatar -->
                <div class="flex align-items-center justify-between">
                    <div class="h-12 w-12 overflow-hidden rounded-full">
                        <img :src="'/images/avatars/chatbot.png'" alt="Agent Avatar"
                            class="w-full h-full object-cover" />
                    </div>
                </div>

                <!-- Agent Info -->
                <div class="my-4 space-y-2">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {{ agent.name }}
                        </h3>
                        <StatusBadge :published="agent.published" />
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {{ agent.description }}
                    </p>
                </div>

                <!-- Agent Metadata -->
                <div class="mb-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-1">
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                        <span>Created {{ agent.created_at }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="max-w-4xl mx-auto mt-5">
            <div
                class="group  rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                <!-- Agent Icon/Avatar -->
                <div class="flex align-items-center justify-between">
                    <div class="h-12 w-12 overflow-hidden rounded-full">
                        <img :src="'/images/avatars/chatbot.png'" alt="Agent Avatar"
                            class="w-full h-full object-cover" />
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        title="Unselect Agent" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-trash2-icon lucide-trash-2 text-red-600  hover:cursor-pointer"
                        @click="unselectAgentTemplate">
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </div>

                <!-- Agent Info -->
                <div class="my-4 space-y-2">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {{ selectedAgentTemplate.name }}
                        </h3>
                        <StatusBadge :published="selectedAgentTemplate.published" />
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {{ selectedAgentTemplate.description }}
                    </p>
                </div>

                <!-- selectedAgentTemplate Metadata -->
                <div class="mb-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-1">
                        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                        <span>Created {{ selectedAgentTemplate.created_at }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="agent__custom-build" v-if="createType === 'custom'" class="h-screen mt-10">
        <div class="flex gap-4">
            <div class="w-1/6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <!-- Nội dung cột 1 (1/6 = 2/12) -->
            </div>
            <div class="flex-1 ">
                <div
                    class="grid-col-10 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div class="px-5 py-4 sm:px-6 sm:py-5">
                        <h3 class="text-base font-bold text-gray-800 dark:text-white/90">
                            Agent Configuration
                        </h3>
                    </div>
                    <div class="space-y-6 border-t border-gray-100 p-5 sm:p-6 dark:border-gray-800">
                        <form>
                            <div class="-mx-2.5 flex flex-wrap gap-y-5">
                                <div class="w-full px-2.5 xl:w-1/2">
                                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Agent Name
                                    </label>
                                    <input type="text" placeholder="Enter agent name"
                                        class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                                </div>

                                <div class="w-full px-2.5">
                                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Description
                                    </label>
                                    <textarea placeholder="Enter description" rows="6"
                                        class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"></textarea>
                                </div>

                                <div class="w-full px-2.5">
                                    <button type="submit"
                                        class="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium text-white transition-colors">
                                        Save & Continue
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-arrow-right-icon lucide-arrow-right">
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCreateUpdateAgent } from '~/composables/ai-agent/useCreateUpdateAgent'
const {
    agents,
    selectedAgentTemplate,
    loading,
    createType,
    initializeStore,
    fetchAgents,
    storeCreateAgent,
    storeUpdateAgent,
    changeCreateType,
    selectAgentTemplate,
    unselectAgentTemplate
} = useCreateUpdateAgent()

await fetchAgents()
</script>