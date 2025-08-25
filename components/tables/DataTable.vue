<template>
    <div
        class="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <!-- Table Controls -->
        <div class="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
                <span class="text-gray-500 dark:text-gray-400">Show</span>
                <div class="relative z-20 bg-transparent">
                    <select v-model="internalPerPage"
                        class="h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none py-2 pl-3 pr-8 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                        <option v-for="option in perPageOptions" :key="option" :value="option"
                            class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                            {{ option }}
                        </option>
                    </select>
                    <span class="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <svg class="stroke-current" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165" stroke="" stroke-width="1.2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>
                <span class="text-gray-500 dark:text-gray-400">entries</span>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <!-- Search -->
                <div v-if="searchable" class="relative">
                    <button class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                fill="" />
                        </svg>
                    </button>
                    <input v-model="internalSearch" type="text" :placeholder="searchPlaceholder"
                        class="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]" />
                </div>

                <!-- Custom Header Actions Slot -->
                <slot name="header-actions" :selected-rows="selectedRows">
                    <button v-if="exportable"
                        class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto"
                        @click="handleExport">
                        Download
                        <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                                fill="" />
                        </svg>
                    </button>
                </slot>
            </div>
        </div>

        <!-- Table -->
        <div class="max-w-full overflow-x-auto">
            <div class="min-w-[800px]">
                <!-- Table Header -->
                <div class="grid border-t border-gray-200 dark:border-gray-800"
                    :style="{ gridTemplateColumns: gridTemplateColumns }">
                    <!-- Checkbox Column Header -->
                    <div v-if="selectable"
                        class="flex items-center justify-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
                        <label
                            class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700 dark:text-gray-400">
                            <span class="relative">
                                <input type="checkbox" class="sr-only" v-model="selectAll" @change="toggleSelectAll" />
                                <span
                                    :class="selectAll ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                                    class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                    <span :class="selectAll ? '' : 'opacity-0'">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </label>
                    </div>

                    <!-- Column Headers -->
                    <div v-for="(column, index) in visibleColumns" :key="column.key" :class="[
                        'flex items-center px-4 py-3',
                        index < visibleColumns.length - 1 ? 'border-r border-gray-200 dark:border-gray-800' : ''
                    ]">
                        <div v-if="column.sortable !== false"
                            class="flex w-full cursor-pointer items-center justify-between" @click="sortBy(column.key)">
                            <p class="text-xs font-medium text-gray-700 dark:text-gray-400">{{ column.label }}</p>
                            <span class="flex flex-col gap-0.5">
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                        fill="" />
                                </svg>
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                        fill="" />
                                </svg>
                            </span>
                        </div>
                        <p v-else class="text-xs font-medium text-gray-700 dark:text-gray-400"
                            :class="column.key === 'actions' ? 'text-center w-full' : ''">
                            {{ column.label }}
                        </p>
                    </div>
                </div>

                <!-- Table Body -->
                <div v-for="(item, itemIndex) in paginatedData" :key="getItemId(item, itemIndex)" :class="[
                    'grid border-t border-gray-100 dark:border-gray-800',
                    selectedRows.includes(getItemId(item, itemIndex)) ? 'bg-gray-50 dark:bg-gray-900' : ''
                ]" :style="{ gridTemplateColumns: gridTemplateColumns }">
                    <!-- Checkbox Column -->
                    <div v-if="selectable"
                        class="flex items-center justify-center border-r border-gray-100 px-4 py-3 dark:border-gray-800">
                        <label class="flex cursor-pointer select-none items-center">
                            <span class="relative">
                                <input type="checkbox" class="sr-only" :value="getItemId(item, itemIndex)"
                                    v-model="selectedRows" />
                                <span
                                    :class="selectedRows.includes(getItemId(item, itemIndex)) ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                                    class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                    <span :class="selectedRows.includes(getItemId(item, itemIndex)) ? '' : 'opacity-0'">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                            </span>
                        </label>
                    </div>

                    <!-- Data Columns -->
                    <div v-for="(column, colIndex) in visibleColumns" :key="column.key" :class="[
                        'flex items-center px-4 py-3',
                        colIndex < visibleColumns.length - 1 ? 'border-r border-gray-100 dark:border-gray-800' : ''
                    ]">
                        <slot :name="`cell-${column.key}`" :item="item" :value="getNestedValue(item, column.key)"
                            :column="column" :index="itemIndex">
                            <p class="text-sm text-gray-700 dark:text-gray-400">
                                {{ formatCellValue(getNestedValue(item, column.key), column) }}
                            </p>
                        </slot>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedData.length === 0" class="text-center py-12">
            <slot name="empty-state">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                </svg>
                <p class="text-gray-500 text-lg mb-2">{{ emptyStateText.title }}</p>
                <p class="text-gray-400">{{ emptyStateText.description }}</p>
            </slot>
        </div>

        <!-- Pagination -->
        <div v-if="paginated && paginatedData.length > 0"
            class="border-t border-gray-100 py-4 pl-[18px] pr-4 dark:border-gray-800">
            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <p
                    class="border-b border-gray-100 pb-3 text-center text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                    Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries
                </p>

                <div class="flex items-center justify-center gap-0.5 pt-3 xl:justify-end xl:pt-0">
                    <button @click="prevPage" :disabled="internalCurrentPage === 1"
                        class="mr-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Previous
                    </button>

                    <button @click="goToPage(1)"
                        :class="internalCurrentPage === 1 ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                        1
                    </button>

                    <span v-if="internalCurrentPage > 3"
                        class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                        ...
                    </span>

                    <button v-for="page in pagesAroundCurrent" :key="page" @click="goToPage(page)"
                        :class="internalCurrentPage === page ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                        {{ page }}
                    </button>

                    <span v-if="internalCurrentPage < totalPages - 2"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                        ...
                    </span>

                    <button @click="nextPage" :disabled="internalCurrentPage === totalPages"
                        class="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Column {
    key: string
    label: string
    sortable?: boolean
    type?: 'string' | 'number' | 'date' | 'boolean'
    formatter?: (value: any) => string
}

interface Props {
    data: readonly any[]
    columns: Column[]
    loading?: boolean
    searchable?: boolean
    searchPlaceholder?: string
    selectable?: boolean
    paginated?: boolean
    perPageOptions?: number[]
    defaultPerPage?: number
    exportable?: boolean
    emptyStateText?: { title: string; description: string }
    itemKey?: string
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    searchable: true,
    searchPlaceholder: 'Search...',
    selectable: false,
    paginated: true,
    perPageOptions: () => [5, 8, 10, 20],
    defaultPerPage: 10,
    exportable: false,
    emptyStateText: () => ({ title: 'No data found', description: 'There are no items to display' }),
    itemKey: 'id'
})

const emit = defineEmits<{
    'update:selected': [selectedRows: (string | number)[]]
    'update:search': [search: string]
    'update:page': [page: number]
    'update:perPage': [perPage: number]
    'sort': [column: string, direction: 'asc' | 'desc']
    'export': []
}>()

// Internal reactive state
const internalSearch = ref('')
const internalCurrentPage = ref(1)
const internalPerPage = ref(props.defaultPerPage)
const sortColumn = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const selectedRows = ref<(string | number)[]>([])
const selectAll = ref(false)

// Computed properties
const visibleColumns = computed(() => props.columns)

const gridTemplateColumns = computed(() => {
    let columns = []

    if (props.selectable) {
        columns.push('48px') // Fixed width for checkbox alignment
    }

    // Calculate responsive widths based on content type
    visibleColumns.value.forEach((col, index) => {
        switch (col.key) {
            case 'name':
            case 'title':
                columns.push('minmax(150px, 200px)') // Name column - moderate width
                break
            case 'description':
                columns.push('minmax(200px, 3fr)') // Description gets most space
                break
            case 'status':
            case 'published':
                columns.push('minmax(100px, 150px)') // Status column fixed range
                break
            case 'created_at':
            case 'updated_at':
            case 'date':
                columns.push('minmax(120px, 160px)') // Date column fixed range
                break
            case 'actions':
                columns.push('minmax(120px, 150px)') // Actions column fixed range
                break
            default:
                columns.push('minmax(100px, 1fr)') // Default responsive
        }
    })

    return columns.join(' ')
})

const filteredData = computed(() => {
    let result = [...props.data] // Convert readonly to mutable array

    // Apply search filter
    if (internalSearch.value && props.searchable) {
        const searchLower = internalSearch.value.toLowerCase()
        result = result.filter(item => {
            return props.columns.some(column => {
                const value = getNestedValue(item, column.key)
                return String(value || '').toLowerCase().includes(searchLower)
            })
        })
    }

    // Apply sorting
    if (sortColumn.value) {
        result.sort((a, b) => {
            const modifier = sortDirection.value === 'asc' ? 1 : -1
            const aVal = getNestedValue(a, sortColumn.value)
            const bVal = getNestedValue(b, sortColumn.value)

            if (aVal == null && bVal == null) return 0
            if (aVal == null) return 1 * modifier
            if (bVal == null) return -1 * modifier
            if (aVal < bVal) return -1 * modifier
            if (aVal > bVal) return 1 * modifier
            return 0
        })
    }

    return result
})

const paginatedData = computed(() => {
    if (!props.paginated) return filteredData.value

    const start = (internalCurrentPage.value - 1) * internalPerPage.value
    const end = start + internalPerPage.value
    return filteredData.value.slice(start, end)
})

const totalEntries = computed(() => filteredData.value.length)
const startEntry = computed(() => (internalCurrentPage.value - 1) * internalPerPage.value + 1)
const endEntry = computed(() => {
    const end = internalCurrentPage.value * internalPerPage.value
    return end > totalEntries.value ? totalEntries.value : end
})
const totalPages = computed(() => Math.ceil(filteredData.value.length / internalPerPage.value))

const pagesAroundCurrent = computed(() => {
    const pages: number[] = []
    const startPage = Math.max(2, internalCurrentPage.value - 2)
    const endPage = Math.min(totalPages.value - 1, internalCurrentPage.value + 2)
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }
    return pages
})

// Methods
const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
}

const getItemId = (item: any, index: number): string | number => {
    return getNestedValue(item, props.itemKey) || index
}

const formatCellValue = (value: any, column: Column): string => {
    if (column.formatter) {
        return column.formatter(value)
    }

    if (value == null) return ''

    switch (column.type) {
        case 'date':
            return value instanceof Date
                ? value.toLocaleDateString()
                : new Date(value).toLocaleDateString()
        case 'boolean':
            return value ? 'Yes' : 'No'
        case 'number':
            return Number(value).toLocaleString()
        default:
            return String(value)
    }
}

const sortBy = (columnKey: string) => {
    if (sortColumn.value === columnKey) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortDirection.value = 'asc'
        sortColumn.value = columnKey
    }
    emit('sort', columnKey, sortDirection.value)
}

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        internalCurrentPage.value = page
        emit('update:page', page)
    }
}

const nextPage = () => {
    if (internalCurrentPage.value < totalPages.value) {
        internalCurrentPage.value++
        emit('update:page', internalCurrentPage.value)
    }
}

const prevPage = () => {
    if (internalCurrentPage.value > 1) {
        internalCurrentPage.value--
        emit('update:page', internalCurrentPage.value)
    }
}

const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedRows.value = paginatedData.value.map(item => getItemId(item, paginatedData.value.indexOf(item)))
    } else {
        selectedRows.value = []
    }
    emit('update:selected', selectedRows.value)
}

const handleExport = () => {
    emit('export')
}

// Watchers
watch([internalSearch, internalPerPage], () => {
    internalCurrentPage.value = 1
    emit('update:page', 1)
})

watch(internalSearch, (newValue) => {
    emit('update:search', newValue)
})

watch(internalPerPage, (newValue) => {
    emit('update:perPage', newValue)
})

watch(selectedRows, (newValue) => {
    selectAll.value = newValue.length === paginatedData.value.length && paginatedData.value.length > 0
    emit('update:selected', newValue)
}, { deep: true })
</script>