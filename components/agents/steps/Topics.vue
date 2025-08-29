<template>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div
            class="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Add Topics
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Choose the specific tasks and capabilities the bot can perform
                </p>
            </div>
            <div class="flex gap-3 sm:justify-between">
                <div class="relative flex-1 sm:flex-auto">
                    <span class="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                fill=""></path>
                        </svg>
                    </span>
                    <input type="text" placeholder="Search..."
                        class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden sm:w-[300px] sm:min-w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                </div>
                <a href="add-product.html"
                    class="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10.0002H15.0006M10.0002 5V15.0006" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Add Custom Topic
                </a>
            </div>
        </div>

        <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
                <!--  Item Start -->
                <div v-for="topic in topics" :key="topic.id" @click="$emit('add-topic', topic)"
                    class="rounded-2xl border border-gray-200 bg-white px-6 pb-5 pt-6 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-lg cursor-pointer"
                    :class="selectedTopics.includes(topic) ? 'ring-primary-blue' : ''">
                    <div class="flex items-center gap-3">
                        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text">
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                <path d="M10 9H8" />
                                <path d="M16 13H8" />
                                <path d="M16 17H8" />
                            </svg>
                        </div>
                        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
                            {{ topic.name }}
                        </h3>
                    </div>
                    <p class="block text-theme-xs text-gray-500 dark:text-gray-400 mt-1">
                        {{ topic.description }}
                    </p>

                    <div class="flex flex-wrap gap-2 pt-2">
                        <span v-for="action in topic.actions" :key="action"
                            class="rounded-full bg-brand-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
                            {{ action }}
                        </span>
                    </div>
                </div>
                <!--  Item End -->
            </div>
        </div>


        <div class="list__topics-selected p-4">
            <h3 class="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2">
                Selected Topics ({{ selectedTopics.length }})
            </h3>
            <div class="flex flex-wrap gap-2 ">
                <span v-for="topic in selectedTopics" :key="topic.id"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 py-0.5 pl-2.5 pr-2 text-sm font-medium text-white">
                    {{ topic.name }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-x-icon lucide-x cursor-pointer" @click="$emit('remove-topic', topic)">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Topics } from '~/types/topics'
interface Props {
    topics: Topics[]
    selectedTopics: Topics[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
    'update:selected-topics': (topics: Topics[]) => void
    'add-topic': [topic: Topics]
    'remove-topic': [topic: Topics]
}>()
</script>