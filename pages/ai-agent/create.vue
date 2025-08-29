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

    <!-- Set create type -->
    <div class="grid grid-cols-2 gap-4 justify-center max-w-5xl mx-auto" v-if="!selectedAgent">
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

    <!-- Progress Bar -->
    <div class="w-full  mx-auto my-5" v-if="selectedAgent || createType === 'custom'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 ">
            <div class="flex justify-between items-center px-5 py-3">
                <h1 class=" font-semibold text-gray-900">
                    Advanced Setup Progress
                </h1>
                <span class="text-sm text-gray-500">
                    Step {{ currentStep }} of {{ totalSteps }}
                </span>
            </div>
            <!-- Progress Steps -->
            <div class="relative">
                <div class="grid grid-cols-4 gap-2 mb-4 relative">
                    <!-- Background Line - positioned to connect step centers -->
                    <div class="progress-line absolute top-4 h-1 bg-gray-200 rounded-full"
                        style="left: calc(12.5% + 16px); right: calc(12.5% + 16px);">
                        <div class="progress-fill h-full rounded-full transition-all duration-500"
                            :style="{ width: progressPercentage + '%' }"></div>
                    </div>

                    <div v-for="(step, index) in stepLabels" :key="index + 1"
                        class="flex flex-col items-center cursor-pointer relative z-10" @click="setStep(index + 1)">
                        <div :class="getStepClass(index + 1)"
                            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105 mb-2 border-2 border-white">
                            <span>{{ index + 1 }}</span>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-gray-600 leading-tight">
                                {{ step.label }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex gap-4">
        <aside
            class="p-4 w-1/6 flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
            v-if="selectedAgent || createType === 'custom'">
            <span class="menu-item group cursor-pointer" v-for="(step, index) in stepLabels" :key="index + 1"
                :class="currentStep >= index + 1 ? 'menu-item-active' : 'border border-gray-100 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white'"
                @click="setStep(index + 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    v-html="step.icon" :class="currentStep !== index + 1 ? 'text-gray-500 dark:text-white' : ''">
                </svg>
                <span class="menu-item-text " :class="currentStep !== index + 1 ? 'text-gray-600 dark:text-white' : ''">
                    {{ step.label }}
                </span>
            </span>
        </aside>

        <article class="h-screen flex-1">
            <SelectAgent v-if="currentStep == 1" :agents="agents" v-model:create-type="createType"
                v-model:selected-agent="selectedAgent" @create-agent="createAgent"
                @select-agent-template="selectAgentTemplate" @unselect-agent-template="unselectAgentTemplate" />
            <Topics v-if="currentStep == 2" :topics="topics" v-model:selected-topics="selectedTopics"
                @add-topic="addTopic" @remove-topic="removeTopic" />
            <Documents v-if="currentStep == 3" :documents="documents" v-model:selectedDocuments="selectedDocuments"
                @upload-document="uploadDocument" @select-document="selectDocument" @remove-document="removeDocument" />

            <Preview v-if="currentStep == 4" />
            <div class="next-prev flex items-center justify-between mt-4" v-if="selectedAgent">
                <button @click="setStep(currentStep - 1)" :disabled="currentStep === 1"
                    class="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-arrow-left-icon lucide-arrow-left">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Previous
                </button>

                <button
                    class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    @click="setStep(currentStep + 1)">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-arrow-right-icon lucide-arrow-right">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </button>
            </div>
        </article>
    </div>
</template>
<script setup lang="ts">
import { useCreateUpdateAgent } from '~/composables/ai-agent/useCreateUpdateAgent'
const {
    agents,
    topics,
    documents,
    selectedAgent,
    selectedTopics,
    selectedDocuments,
    fileTypes,
    fileAccept,

    uploadDocument,
    selectDocument,
    removeDocument,
    loading,
    error,
    agentCount,
    publishedCount,
    draftCount,
    createType,
    currentStep,
    totalSteps,
    stepLabels,
    progressPercentage,
    createAgent,
    fetchAgents,
    changeCreateType,
    initializeStore,
    storeCreateAgent,
    storeUpdateAgent,
    storeDeleteAgent,
    storeToggleStatus,
    selectAgentTemplate,
    unselectAgentTemplate,
    addTopic,
    removeTopic,
    setStep,
    getStepClass,
    clearError,
} = useCreateUpdateAgent()
useHead({
    title: 'Create Agent',
    meta: [
        {
            name: 'description',
            content: 'Create a new AI agent'
        }
    ]
})
await fetchAgents()
</script>
<style scoped>
.gradient-bg {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
}

.step-active {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
    color: white;
}

.step-completed {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
    color: white;
}

.step-pending {
    background: white;
    color: #6b7280;
    border: 2px solid #d1d5db !important;
}

.progress-line {
    height: 4px;
    background: #e5e7eb;
    position: absolute;
    top: 16px;
    z-index: 1;
}

.progress-fill {
    background: linear-gradient(135deg,
            #4a90e2 0%,
            #6b73d9 20%,
            #8b5fbf 40%,
            #a8508a 60%,
            #c54756 80%,
            #e53e3e 100%);
}
</style>