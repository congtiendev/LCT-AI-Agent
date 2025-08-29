<template>
    <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="px-4 py-4 sm:pl-6 sm:pr-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                    All Media
                </h3>

                <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div class="relative">
                        <button class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                    fill=""></path>
                            </svg>
                        </button>

                        <input type="text" placeholder="Search..."
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]">
                    </div>

                    <button
                        class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:w-auto">
                        <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                                fill=""></path>
                        </svg>

                        Upload File
                    </button>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                <!-- Media item-->
                <div v-for="file in documents" :key="file.id" @click="$emit('select-document', file)"
                    class="flex items-center justify-between rounded-2xl border border-gray-100 bg-white py-4 pl-4 pr-4 dark:border-gray-800 dark:bg-white/[0.03] xl:pr-5"
                    :class="selectedDocuments.includes(file) ? 'ring-primary-blue' : 'hover:shadow-lg cursor-pointer'">
                    <div class="flex items-center gap-4">
                        <div class="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gray-100">
                            <img :src="getFileIcon(file.filename)" alt="file icon" class="h-8 w-8 object-contain">
                        </div>
                        <div>
                            <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">
                                {{ file.filename }}
                            </h4>
                            <span class="block text-sm text-gray-500 dark:text-gray-400">
                                {{ file.description }}
                            </span>
                        </div>
                    </div>
                </div>
                <!-- Media item-->
            </div>
        </div>


        <div class="list__topics-selected p-4 border-t border-gray-200 px-5 py-4 dark:border-gray-800">
            <h3 class="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2">
                Selected Documents ({{ selectedDocuments.length }})
            </h3>
            <div class="flex flex-wrap gap-2 ">
                <span v-for="document in selectedDocuments" :key="document.id"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 py-1 pl-2.5 pr-2 text-sm font-medium text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-paperclip-icon lucide-paperclip">
                        <path
                            d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                    </svg>
                    {{ document.filename }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-x-icon lucide-x cursor-pointer"
                        @click="$emit('remove-document', document)">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { getFileIcon } = useConstants()
import type { Documents } from '~/types/documents'
interface Props {
    documents: Documents[]
    selectedDocuments: Documents[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
    'update:selected-documents': (documents: Documents[]) => void
    'upload-document': [event: Event]
    'select-document': [document: Documents]
    'remove-document': [document: Documents]
}>()
</script>