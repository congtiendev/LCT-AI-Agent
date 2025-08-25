<!-- pages/ai-agent/index.vue - Clean View with Composable -->
<template>
    <!-- Breadcrumb -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            Agent Management
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
                    Agent Management
                </li>
            </ol>
        </nav>
    </div>

    <!-- Stats Cards -->
    <div class="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <div
            class="flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]">
            <div class="bg-brand-500/10 text-brand-500 inline-flex h-14 w-14 items-center justify-center rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-bot-icon lucide-bot">
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                </svg>
            </div>
            <div class="flex-1">
                <h3 class="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
                    {{ agents.length }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Total Agents
                </p>
            </div>
        </div>
        <div
            class="flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]">
            <div
                class="bg-warning-500/10 text-warning-500 inline-flex h-14 w-14 items-center justify-center rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-bot-message-square-icon lucide-bot-message-square">
                    <path d="M12 6V2H8" />
                    <path d="M15 11v2" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path
                        d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
                    <path d="M9 11v2" />
                </svg>
            </div>
            <div class="flex-1">
                <h3 class="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
                    {{agents.filter(agent => agent.published).length}}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Published Agents
                </p>
            </div>
        </div>
        <div
            class="flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]">
            <div
                class="bg-success-500/10 text-success-500 inline-flex h-14 w-14 items-center justify-center rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-bot-off-icon lucide-bot-off">
                    <path d="M13.67 8H18a2 2 0 0 1 2 2v4.33" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M22 22 2 2" />
                    <path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" />
                    <path d="M9 13v2" />
                    <path d="M9.67 4H12v2.33" />
                </svg>
            </div>
            <div class="flex-1">
                <h3 class="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
                    {{agents.filter(agent => !agent.published).length}}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Draft Agents
                </p>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-between">
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
        <div class="flex items-center gap-3">
            <div class="relative flex-1 max-w-md" v-if="tabView == 'card'">
                <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" placeholder="Search agents..."
                    class="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400" />
            </div>
            <!-- Create Agent Button -->
            <button v-if="tabView == 'table'"
                class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:w-auto">
                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                        fill=""></path>
                </svg>
                Create New Agent
            </button>
        </div>
    </div>


    <div v-if="tabView == 'card'">
        <!-- Agents Grid -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
                class="group  rounded-xl  border-dashed  border-gray-200 border-2 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03] p-6  transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 flex flex-col items-center justify-center">
                <button
                    class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:w-auto">
                    <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                            fill=""></path>
                    </svg>
                </button>
                <h1 class="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Create New Agent</h1>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">Start building your AI agent by clicking the
                    button above.</p>
            </div>
            <div v-for="agent in agents" :key="agent.id"
                class="group  rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                <!-- Agent Icon/Avatar -->
                <div class="flex align-items-center justify-between">
                    <div class="h-12 w-12 overflow-hidden rounded-full">
                        <img :src="'/images/avatars/chatbot.png'" alt="Agent Avatar"
                            class="w-full h-full object-cover" />
                    </div>
                    <div x-data="{openDropDown: false}" class="relative h-fit">

                        <UiDropdown>
                            <template #trigger="{ isOpen, toggle }">
                                <button @click="toggle" :class="[
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
                                <NuxtLink :to="'/ai-agent/detail?agent_id=' + agent.id" @click="close"
                                    class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                    View Details
                                </NuxtLink>
                                <button @click="handleDeleteAgent(agent)"
                                    class="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                    Delete
                                </button>
                            </template>
                        </UiDropdown>
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
                        <span>Created {{ formatDate(agent.created_at) }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- DataTable -->
    <DataTable v-if="tabView == 'table'" :data="agents" :columns="agentColumns" :loading="loading" :searchable="true"
        :selectable="true" :actions-column="{ label: 'Actions' } as const" :empty-state-text="{
            title: 'No agents found',
            description: 'Create your first agent to get started'
        }" search-placeholder="Search agents..." @update:selected="handleSelectionChange" @sort="handleSort">
        <template #cell-description="{ item }">
            <div>
                <p class="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                    {{ item.description }}
                </p>
            </div>
        </template>

        <!-- Custom cell for status with toggle -->
        <template #cell-published="{ item, value }">
            <div class="flex items-center gap-2">
                <StatusBadge :published="value" />
                <ToggleButton :published="value" @toggle="handleToggleStatus(item)" />
            </div>
        </template>

        <!-- Custom cell for created_at -->
        <template #cell-created_at="{ value }">
            <div class="text-sm text-gray-700 dark:text-gray-400">
                {{ formatDate(value) }}
            </div>
        </template>

        <!-- Custom cell for actions -->
        <template #cell-actions="{ item }">
            <div class="flex items-center justify-center gap-1">
                <button
                    class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    title="View Details">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                        </path>
                    </svg>
                </button>

                <NuxtLink :to="'/ai-agent/edit?agent_id=' + item.id" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90 p-1 rounded
                        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Edit">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                    </svg>
                </NuxtLink>

                <button @click="handleDeleteAgent(item)"
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
</template>

<script setup lang="ts">
import { ta } from 'zod/locales';

const {
    // Reactive state
    tabView,
    agents,
    loading,
    error,
    agentCount,
    publishedCount,
    draftCount,
    showCreateForm,
    editingAgent,

    // Configuration
    agentColumns,

    // Computed
    hasSelectedAgents,
    hasError,
    isEditing,
    formTitle,

    // Methods
    openCreateForm,
    openEditForm,
    closeForm,
    handleSubmitForm,
    handleDeleteAgent,
    handleToggleStatus,
    handleBulkDelete,
    handleSelectionChange,
    handleSort,
    viewAgentDetails,
    handleExport,
    dismissError,
    formatDate
} = useAgents()


useHead({
    title: 'AI Agent Management',
    meta: [
        { name: 'description', content: 'Trang quản lý AI Agent' }
    ]
})

</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>