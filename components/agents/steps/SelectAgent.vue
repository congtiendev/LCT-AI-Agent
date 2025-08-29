<template>
    <div v-if="createType === 'template'">
        <div v-if="!selectedAgent" class=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            py-8">
            <div v-for="agent in agents" :key="agent.id" @click="$emit('selectAgentTemplate', agent)"
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
    </div>

    <div v-if="createType === 'custom' && !selectedAgent">
        <div class="grid-col-10 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
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
                            <input type="text" placeholder="Enter agent name" v-model="agentName"
                                class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                        </div>

                        <div class="w-full px-2.5">
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Description
                            </label>
                            <textarea placeholder="Enter description" rows="6" v-model="agentDescription"
                                class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"></textarea>
                        </div>

                        <div class="w-full px-2.5">
                            <button type="button" @click="$emit('createAgent', agentName, agentDescription)"
                                class="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium text-white transition-colors">
                                Save Agent
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="icon-arrow-right">
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

    <div v-if="selectedAgent" class="mx-auto">
        <div
            class="group  rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <!-- Agent Icon/Avatar -->
            <div class="flex align-items-center justify-between">
                <div class="h-12 w-12 overflow-hidden rounded-full">
                    <img :src="'/images/avatars/chatbot.png'" alt="Agent Avatar" class="w-full h-full object-cover" />
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    title="Unselect Agent" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" @click="$emit('unselectAgentTemplate', selectedAgent)"
                    class="icon-trash text-red-600  hover:cursor-pointer">
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
                        {{ selectedAgent.name }}
                    </h3>
                    <StatusBadge :published="selectedAgent.published" />
                </div>

                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {{ selectedAgent.description }}
                </p>
            </div>

            <!-- selectedAgent Metadata -->
            <div class="mb-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center gap-1">
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                        </path>
                    </svg>
                    <span>Created {{ selectedAgent.created_at }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Agent } from '~/types/agents'

interface Props {
    agents: Agent[]
    createType: string
    selectedAgent: Agent | null
}
defineProps<Props>()
defineEmits<{
    selectAgentTemplate: [agent: Agent]
    unselectAgentTemplate: [agent: Agent]
    createAgent: [agentName: string, agentDescription: string]
    'update:selectedAgent': [agent: Agent | null]
    'update:createType': [type: string],
}>()
const agentName = ref('')
const agentDescription = ref('')

</script>