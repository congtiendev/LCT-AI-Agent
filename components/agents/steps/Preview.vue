<template>
    <section>
        <div class=" space-y-6 ">
            <div class="grid lg:grid-cols-3 gap-6">
                <!-- Main Panel -->
                <div class="lg:col-span-2 space-y-3 h-full">
                    <div v-if="selectedAgent"
                        class="group  rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]  shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
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
                    <!-- Topics -->
                    <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div class="flex items-center justify-between">
                            <h3 class="text-base font-medium text-gray-800 dark:text-white/90 p-4">
                                Topics
                            </h3>
                            <span
                                class="inline-flex items-center mx-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{{
                                    selectedTopics.length }}</span>
                        </div>

                        <div class="border-t border-gray-100 p-4 dark:border-gray-800">
                            <div v-for="topic in selectedTopics" :key="topic.id"
                                class="w-full hover:bg-gray-100 dark:hover:bg-gray-800/50 relative group transition-all duration-200 rounded-lg"
                                @mouseenter="hoveredTopicId = topic.id" @mouseleave="hoveredTopicId = null">
                                <AccordionItem :title="topic.name" :content="topic.description" />

                                <!-- Delete Button - Vue Approach -->
                                <Transition name="delete-fade">
                                    <button v-show="hoveredTopicId === topic.id" @click="$emit('remove-topic', topic)"
                                        class="absolute top-0 right-0 p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 transition-all duration-200 shadow-sm hover:shadow-md z-10"
                                        title="Remove topic">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M10 11v6" />
                                            <path d="M14 11v6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                            <path d="M3 6h18" />
                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </Transition>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Sidebar -->
                <div class=" space-y-6">
                    <!-- Input Files & Links -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium text-gray-900">
                                    Documents
                                </h3>
                                <span
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{{
                                        selectedDocuments.length }}</span>
                            </div>
                        </div>
                        <div class="p-4 space-y-2">
                            <div class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 card-hover"
                                v-for="file in selectedDocuments" :key="file.id">
                                <div class="flex items-center justify-between w-full">
                                    <div class="flex items-center gap-1">
                                        <img :src="getFileIcon(file.filename)" alt="file icon"
                                            class="h-6 w-6 object-contain">
                                        <span class="text-sm text-gray-700 truncate">{{ file.filename }}</span>
                                        </img>
                                    </div>
                                    <button class="text-gray-400 hover:text-red-500 transition-colors"
                                        @click="$emit('remove-document', file)">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Channels -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium text-gray-900">Channels</h3>
                                <span
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">2</span>
                            </div>
                        </div>
                        <div class="p-4 space-y-3">
                            <div
                                class="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 card-hover">
                                <div class="flex items-center space-x-3">
                                    <div class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                        <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">
                                            LinhNHMtest1
                                        </p>
                                        <div class="flex items-center space-x-1">
                                            <div class="w-1.5 h-1.5 bg-green-500 rounded-full agent-status">
                                            </div>
                                            <span class="text-xs text-gray-500">Connected</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="text-gray-400 hover:text-red-500 transition-colors">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>

                            <div
                                class="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 card-hover">
                                <div class="flex items-center space-x-3">
                                    <div class="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                                        <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Web chee</p>
                                        <div class="flex items-center space-x-1">
                                            <div class="w-1.5 h-1.5 bg-green-500 rounded-full agent-status">
                                            </div>
                                            <span class="text-xs text-gray-500">Active</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="text-gray-400 hover:text-red-500 transition-colors">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div class="flex justify-center custom-scrollbar  overflow-x-auto pb-3 sm:pb-0">
                <div class="min-w-[393px] mx-auto">
                    <div class="inline-flex items-center shadow-theme-xs">
                        <button type="button"
                            class="inline-flex items-center gap-2 bg-[#4a90e2] px-4 py-3 text-sm font-medium text-white  transition first:rounded-l-lg last:rounded-r-lg hover:bg-[#6b73d9]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                            Publish Agent
                        </button>
                        <button type="button" @click="$emit('update:showChatWithAgent', true)"
                            class="-ml-px inline-flex items-center gap-2 bg-[#8b5fbf] px-4 py-3 text-sm font-medium text-white first:rounded-l-lg last:rounded-r-lg hover:bg-[#a8508a] hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-message-circle-code-icon lucide-message-circle-code">
                                <path d="m10 9-3 3 3 3" />
                                <path d="m14 15 3-3-3-3" />
                                <path
                                    d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                            </svg>
                            Conversation Preview
                        </button>
                        <button type="button"
                            class="-ml-px inline-flex items-center gap-2 bg-[#c54756] px-4 py-3 text-sm font-medium text-white first:rounded-l-lg last:rounded-r-lg hover:bg-[#e53e3e] ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-ban-icon lucide-ban">
                                <path d="M4.929 4.929 19.07 19.071" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <InsightProcess v-if="showChatWithAgent" />
    <ChatBox v-if="showChatWithAgent" :initial-x="400" :initial-y="200" :initial-width="350" :initial-height="550"
        :min-width="300" :min-height="200" :max-width="600" :max-height="800" :agent-id="selectedAgent?.id || ''"
        :user-id="currentUser.id" @close="emit('update:showChatWithAgent', false)" />
    {{ currentUser }}
</template>

<script setup lang="ts">
import type { Agent } from '~/types/agents'
import type { Topics } from '~/types/topics'
import type { Documents } from '~/types/documents'

interface Props {
    showChatWithAgent: boolean
    selectedAgent: Agent | null
    selectedTopics: Topics[]
    selectedDocuments: Documents[]
}
defineProps<Props>()
const emit = defineEmits<{
    'update:showChatWithAgent': [type: boolean],
    'remove-topic': [topic: Topics],
    'remove-document': [document: Documents]
}>()
const { getFileIcon } = useConstants()
const authStore = useAuthStore()
const currentUser = computed(() => authStore.user!)
const hoveredTopicId = ref<number | string | null>(null)
</script>

<style scoped>
/* Delete button transition */
.delete-fade-enter-active,
.delete-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.delete-fade-enter-from,
.delete-fade-leave-to {
    opacity: 0;
    transform: translateX(8px) scale(0.8);
}

.delete-fade-enter-to,
.delete-fade-leave-from {
    opacity: 1;
    transform: translateX(0) scale(1);
}

/* Hover improvements */
.group:hover {
    background-color: rgba(243, 244, 246, 0.5);
}

/* Z-index to ensure delete button appears above accordion */
.z-10 {
    z-index: 10;
}
</style>