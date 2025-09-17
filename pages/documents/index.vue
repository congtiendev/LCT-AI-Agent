<!-- pages/files/index.vue -->
<template>
    <!-- Breadcrumb -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            Document Management
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
                    Document Management
                </li>
            </ol>
        </nav>
    </div>
    <div class=" h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5  dark:bg-gray-900 mb-5">
        <button @click="tabView = 'card'" :class="tabView === 'card' ? 'bg-white' : ''"
            class="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white shadow-theme-xs text-gray-900 dark:text-white  dark:bg-gray-800">
            <svg class="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                width="24" height="24" viewBox="0 0 24 24" fill="none" data-v-433a9abd="">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z"
                    fill=""></path>
            </svg>
        </button>
        <button @click="tabView = 'table'" :class="tabView === 'table' ? 'bg-white' : ''"
            class="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="menu-item-icon-inactive">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.25 5.5C3.25 4.25736 4.25736 3.25 5.5 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V18.5C20.75 19.7426 19.7426 20.75 18.5 20.75H5.5C4.25736 20.75 3.25 19.7426 3.25 18.5V5.5ZM5.5 4.75C5.08579 4.75 4.75 5.08579 4.75 5.5V8.58325L19.25 8.58325V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H5.5ZM19.25 10.0833H15.416V13.9165H19.25V10.0833ZM13.916 10.0833L10.083 10.0833V13.9165L13.916 13.9165V10.0833ZM8.58301 10.0833H4.75V13.9165H8.58301V10.0833ZM4.75 18.5V15.4165H8.58301V19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5ZM10.083 19.25V15.4165L13.916 15.4165V19.25H10.083ZM15.416 19.25V15.4165H19.25V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15.416Z"
                    fill="currentColor"></path>
            </svg>
        </button>
    </div>
    <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="px-4 py-4 sm:pl-6 sm:pr-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                    All Documents ({{ files.length }})
                </h3>

                <div class="flex items-center gap-5">
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div class="relative" v-if="tabView == 'card'">
                            <button class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                <svg class="fill-current" width="18" height="18" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                        fill=""></path>
                                </svg>
                            </button>

                            <input type="text" placeholder="Search..."
                                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]">
                        </div>

                        <button @click="showAddEditFileModal = true; currentFile = null"
                            class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:w-auto">
                            <svg class="fill-current" width="18" height="18" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                                    fill=""></path>
                            </svg>

                            Upload File
                        </button>
                        <button v-if="hasSelection" @click="bulkDelete"
                            class="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 hover:bg-red-400 px-4 py-3 text-sm font-medium text-white shadow-theme-xs  sm:w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2">
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                <path d="M3 6h18" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            Delete Selected
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div class="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
            <div v-if="tabView == 'card'" class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                <div v-for="file in files" :key="file.id" @click=toggleSelection(file.id)
                    :class="isSelected(file.id) ? 'ring-2 ring-offset-2 ring-brand-500' : ''"
                    class="flex  justify-between rounded-2xl border border-gray-100 bg-white py-4 pl-4 pr-4 dark:border-gray-800 dark:bg-white/[0.03] xl:pr-5 hover:shadow-lg transition-shadow duration-200">
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
                            <span class="block text-xs text-gray-500 dark:text-gray-400">
                                {{ file.created_at }}
                            </span>
                            <div class="flex items-center mt-1" v-if="file.agent_related && file.agent_related.length">
                                <div class="flex -space-x-2">
                                    <div v-for="(agency, index) in file.agent_related" :key="index" :title="agency"
                                        class="w-8 h-8 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                                        @click="listAgentsDetail = file.agent_related; showListAgentsDetail = true">
                                        <img src="/images/avatars/chatbot.png" alt="user">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UiDropdown>
                        <template #trigger="{ isOpen, toggle }">
                            <button @click.stop="toggle" :class="[
                                'transition-colors duration-200',
                                isOpen
                                    ? 'text-gray-700 dark:text-white'
                                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-white'
                            ]">
                                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                                        fill="" />
                                </svg>
                            </button>
                        </template>

                        <template #content="{ close }">
                            <button @click="currentFile = file; showAddEditFileModal = true; close()"
                                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil">
                                    <path
                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                    <path d="m15 5 4 4" />
                                </svg>
                                Edit
                            </button>
                            <button @click="deleteFile(file.id); close()"
                                class="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-red-500 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2">
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                                Delete
                            </button>
                        </template>
                    </UiDropdown>
                </div>
            </div>
            <DataTable v-if="tabView == 'table'" :data="files" :columns="columns as any" :searchable="true"
                :selectable="true" :actions-column="{ label: 'Actions' } as const"
                :empty-state-text="{ title: 'No files found', description: 'Upload your first file to get started' }"
                search-placeholder="Search files..." @update:selected="handleSelectionChange">
                <template #cell-description="{ item }">
                    <div>
                        <p class="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                            {{ item.description }}
                        </p>
                    </div>
                </template>
                <template #cell-agent_related="{ item }">
                    <div class="flex items-center justify-center"
                        v-if="item.agent_related && item.agent_related.length">
                        <div class="flex -space-x-2">
                            <div v-for="(agency, index) in item.agent_related" :key="index" :title="agency"
                                class="w-8 h-8 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                                @click="listAgentsDetail = item.agent_related; showListAgentsDetail = true">
                                <img src="/images/avatars/chatbot.png" alt="user">
                            </div>
                        </div>
                    </div>
                </template>
                <template #cell-actions="{ item }">
                    <div class="flex items-center justify-center gap-1">
                        <button
                            class="text-blue-600 hover:text-blue-800 dark:text-brand-400 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen">
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path
                                    d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                            </svg>
                        </button>
                        <button @click="deleteFile(item.id)"
                            class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>
                            </svg>
                        </button>
                    </div>
                </template>
            </DataTable>
        </div>
    </div>

    <UiModal v-model:show="showListAgentsDetail" title="List of Related Agents"
        subtitle="These are the agents related to this document." size="lg" :scrollable="true" :show-close-button="true"
        :show-default-footer="false" confirm-text="Submit">
        <!-- Custom content for the modal body -->
        <template #default>
            <button v-for="(agent, index) in listAgentsDetail" :key="index"
                class="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <img class="w-10 h-10 rounded-full" src="/images/avatars/chatbot.png" alt="user">
                {{ agent }}
            </button>
        </template>
    </UiModal>
    <UiModal v-model:show="showAddEditFileModal" :title="currentFile ? 'Edit File' : 'Add New File'"
        subtitle="Fill in the details below." size="xl" :scrollable="true" :show-close-button="true"
        :show-default-footer="false" confirm-text="Submit">
        <template #default>
            <div class="p-2 flex flex-col gap-4">
                <FileDropzone :accept="'image/*'" :multiple="true" :max-file-size="5 * 1024 * 1024"
                    title="Upload Images" description="Drag your images here or click to browse"
                    @files-selected="handleFiles" @error="handleError" />
                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        File name
                    </label>
                    <input type="text" placeholder="Enter file name"
                        class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                </div>
                <MultiSelectSearch v-model="selectedValues" :options="subjectOptions" label="Select Agent"
                    placeholder="Choose subjects..." :max-display-tags="2" @change="handleChange" />
            </div>
        </template>
    </UiModal>
</template>

<script setup lang="ts">
const {
    files,
    loading,
    error,
    selectedFiles,
    currentFile,
    hasSelection,
    columns,
    tabView,
    showListAgentsDetail,
    showAddEditFileModal,
    listAgentsDetail,
    fetchFiles,
    deleteFile,
    bulkDelete,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
    applyFilters: applyFiltersComposable,
    clearFilters,
    getFileTypes,
    getAgents,
    formatAgents,
} = useDocuments()
const { getFileIcon } = useConstants()
const searchFilename = ref('')
const filterType = ref('')
const filterAgent = ref('')

// Get filter options
const fileTypes = ref<string[]>([])
const agents = ref<string[]>([])
const selectedValues = ref<string[]>([])
const subjectOptions = [
    { value: 'math', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'art', label: 'Art & Design' },
    { value: 'music', label: 'Music' },
    { value: 'pe', label: 'Physical Education' }
];
// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        applyFilters()
    }, 500)
}

const applyFilters = async () => {
    await applyFiltersComposable({
        filename: searchFilename.value || undefined,
        filetype: filterType.value || undefined,
        agent_related: filterAgent.value || undefined
    })
}

const clearAllFilters = async () => {
    searchFilename.value = ''
    filterType.value = ''
    filterAgent.value = ''
    await clearFilters()
}

const handleSelectionChange = (selected: (string | number)[]): void => {
    selectedFiles.value = selected as number[]
}

// Initialize data
onMounted(async () => {
    await fetchFiles()
    fileTypes.value = getFileTypes()
    agents.value = getAgents()
})

// Meta tags
definePageMeta({
    title: 'Document Management'
})

// SEO
useSeoMeta({
    title: 'Document Management',
    description: 'Manage your uploaded files and documents'
})
</script>