<template>
    <div class=" ">
        <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {{ label }}
        </label>

        <div class="relative z-20 bg-transparent">
            <!-- Main input/display area -->
            <div @click="toggleDropdown"
                class="dark:bg-dark-900 shadow-theme-xs focus-within:border-brand-300 focus-within:ring-brand-500/10 dark:focus-within:border-brand-800 relative h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm focus-within:ring-3 dark:border-gray-700 dark:bg-gray-900"
                :class="{ 'border-brand-300 ring-3 ring-brand-500/10 dark:border-brand-800': isOpen }">
                <!-- Selected items display -->
                <div v-if="selectedOptions.length > 0" class="flex flex-wrap items-center gap-1 pr-8">
                    <div v-for="(option, index) in selectedOptions.slice(0, maxDisplayTags)" :key="option.value"
                        class="inline-flex items-center gap-1 rounded-md bg-brand-100 dark:bg-brand-900/30 px-2 py-0.5 text-xs font-medium text-brand-700 dark:text-brand-300">
                        <span>{{ option.label }}</span>
                        <button @click.stop="removeOption(index)"
                            class="hover:text-brand-900 dark:hover:text-brand-100 transition-colors">
                            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Show count if more items selected -->
                    <div v-if="selectedOptions.length > maxDisplayTags"
                        class="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                        +{{ selectedOptions.length - maxDisplayTags }} more
                    </div>
                </div>

                <!-- Placeholder when nothing selected -->
                <div v-else class="text-gray-400 dark:text-white/30">
                    {{ placeholder }}
                </div>

                <!-- Dropdown arrow -->
                <span
                    class="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': isOpen }">
                    <svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </div>

            <!-- Dropdown menu -->
            <div v-if="isOpen"
                class="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 z-50">
                <!-- Search input -->
                <div class="sticky top-0 bg-white dark:bg-gray-900 p-2 border-b border-gray-200 dark:border-gray-700">
                    <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search options..."
                        class="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-1 focus:ring-brand-500/10 dark:border-gray-600 dark:text-white dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        @keydown.escape="closeDropdown" @keydown.enter.prevent="selectFirstFiltered"
                        @keydown.arrow-down.prevent="highlightNext" @keydown.arrow-up.prevent="highlightPrevious" />
                </div>

                <!-- Options list -->
                <div class="py-1">
                    <!-- Select/Deselect all -->
                    <div v-if="filteredOptions.length > 1"
                        class="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800"
                        @click="toggleSelectAll">
                        <div class="flex items-center gap-2">
                            <div class="flex h-4 w-4 items-center justify-center rounded border border-gray-300 dark:border-gray-600"
                                :class="{ 'bg-brand-500 border-brand-500': allFilteredSelected }">
                                <svg v-if="allFilteredSelected" class="h-3 w-3 text-white" fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <span class="font-medium text-brand-600 dark:text-brand-400">
                                {{ allFilteredSelected ? 'Deselect All' : 'Select All' }}
                            </span>
                        </div>
                    </div>

                    <!-- Options -->
                    <div v-for="(option, index) in filteredOptions" :key="option.value"
                        class="cursor-pointer px-4 py-2 text-sm text-gray-800 dark:text-white/90 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        :class="{
                            'bg-brand-50 dark:bg-brand-900/20': highlightedIndex === index,
                            'font-medium text-brand-600 dark:text-brand-400': isSelected(option)
                        }" @click="toggleOption(option)" @mouseenter="highlightedIndex = index">
                        <div class="flex items-center gap-2">
                            <!-- Checkbox -->
                            <div class="flex h-4 w-4 items-center justify-center rounded border border-gray-300 dark:border-gray-600 transition-colors"
                                :class="{ 'bg-brand-500 border-brand-500': isSelected(option) }">
                                <svg v-if="isSelected(option)" class="h-3 w-3 text-white" fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>

                            <!-- Option label with search highlight -->
                            <span v-html="highlightMatch(option.label)"></span>
                        </div>
                    </div>

                    <!-- No options found -->
                    <div v-if="filteredOptions.length === 0" class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        No options found
                    </div>
                </div>

                <!-- Selected count footer -->
                <div v-if="selectedOptions.length > 0"
                    class="sticky bottom-0 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                    {{ selectedOptions.length }} {{ selectedOptions.length === 1 ? 'item' : 'items' }} selected
                </div>
            </div>
        </div>

        <!-- Clear all button (outside dropdown) -->
        <div v-if="selectedOptions.length > 0 && showClearAll" class="mt-2">
            <button @click="clearAll"
                class="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors">
                Clear all selections
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

// Types
interface Option {
    value: string | number
    label: string
    disabled?: boolean
}

interface Props {
    options: Option[]
    modelValue?: (string | number)[]
    label?: string
    placeholder?: string
    maxDisplayTags?: number
    showClearAll?: boolean
    searchable?: boolean
}

// Props với default values
const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    label: 'Select options',
    placeholder: 'Choose options...',
    maxDisplayTags: 3,
    showClearAll: true,
    searchable: true
})

// Emits
const emit = defineEmits<{
    'update:modelValue': [value: (string | number)[]]
    'change': [value: (string | number)[], selectedOptions: Option[]]
}>()

// Refs
const isOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement>()
const highlightedIndex = ref(-1)

// Computed
const selectedValues = computed(() => props.modelValue || [])

const selectedOptions = computed(() => {
    return props.options.filter(option => selectedValues.value.includes(option.value))
})

const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options

    return props.options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const allFilteredSelected = computed(() => {
    return filteredOptions.value.length > 0 &&
        filteredOptions.value.every(option => selectedValues.value.includes(option.value))
})

// Methods
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        nextTick(() => {
            searchInput.value?.focus()
        })
    }
}

const closeDropdown = () => {
    isOpen.value = false
    searchQuery.value = ''
    highlightedIndex.value = -1
}

const isSelected = (option: Option): boolean => {
    return selectedValues.value.includes(option.value)
}

const toggleOption = (option: Option) => {
    if (option.disabled) return

    const newValues = [...selectedValues.value]
    const index = newValues.indexOf(option.value)

    if (index === -1) {
        newValues.push(option.value)
    } else {
        newValues.splice(index, 1)
    }

    emit('update:modelValue', newValues)
    emit('change', newValues, props.options.filter(opt => newValues.includes(opt.value)))
}

const removeOption = (index: number) => {
    const optionToRemove = selectedOptions.value[index]
    toggleOption(optionToRemove)
}

const toggleSelectAll = () => {
    const filteredValues = filteredOptions.value.map(option => option.value)

    if (allFilteredSelected.value) {
        // Deselect all filtered options
        const newValues = selectedValues.value.filter(value => !filteredValues.includes(value))
        emit('update:modelValue', newValues)
        emit('change', newValues, props.options.filter(opt => newValues.includes(opt.value)))
    } else {
        // Select all filtered options
        const newValues = [...new Set([...selectedValues.value, ...filteredValues])]
        emit('update:modelValue', newValues)
        emit('change', newValues, props.options.filter(opt => newValues.includes(opt.value)))
    }
}

const clearAll = () => {
    emit('update:modelValue', [])
    emit('change', [], [])
}

const selectFirstFiltered = () => {
    if (filteredOptions.value.length > 0) {
        toggleOption(filteredOptions.value[0])
    }
}

const highlightNext = () => {
    if (highlightedIndex.value < filteredOptions.value.length - 1) {
        highlightedIndex.value++
    }
}

const highlightPrevious = () => {
    if (highlightedIndex.value > 0) {
        highlightedIndex.value--
    }
}

const highlightMatch = (text: string): string => {
    if (!searchQuery.value) return text

    const regex = new RegExp(`(${searchQuery.value})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
}

// Click outside handler
const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative.z-20')) {
        closeDropdown()
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>