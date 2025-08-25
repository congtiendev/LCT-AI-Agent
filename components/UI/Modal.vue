<!-- components/ui/Modal.vue -->
<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto z-[9999]">
        <!-- Backdrop -->
        <div class="modal-close-btn fixed inset-0 h-full w-full backdrop-blur-xs" :class="backdropClass"
            @click="handleBackdropClick"></div>

        <!-- Modal Content -->
        <div class="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 border border-gray-200"
            :class="modalClass" :style="{ maxWidth: maxWidth }" @click.stop>
            <!-- Close Button -->
            <button v-if="showCloseButton" @click="close"
                class="transition-color absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
                <CloseIcon />
            </button>

            <!-- Header -->
            <div v-if="title || subtitle || $slots.header" class="px-2" :class="showCloseButton ? 'pr-14' : ''">
                <slot name="header">
                    <h4 v-if="title" class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {{ title }}
                    </h4>
                    <p v-if="subtitle" class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        {{ subtitle }}
                    </p>
                </slot>
            </div>

            <!-- Body -->
            <div class="px-2">
                <div v-if="scrollable" class="custom-scrollbar overflow-y-auto" :style="{ height: scrollHeight }">
                    <slot />
                </div>
                <div v-else>
                    <slot />
                </div>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-2 mt-6">
                <slot name="footer" :close="close" :loading="loading" />
            </div>

            <!-- Default Footer -->
            <div v-else-if="showDefaultFooter" class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <button @click="close" type="button"
                    class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                    {{ cancelText }}
                </button>
                <button v-if="confirmText" @click="handleConfirm" type="button" :disabled="loading"
                    class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 sm:w-auto">
                    <span v-if="loading" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ loadingText }}
                    </span>
                    <span v-else>{{ confirmText }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    show: boolean
    title?: string
    subtitle?: string
    maxWidth?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
    scrollable?: boolean
    scrollHeight?: string
    showCloseButton?: boolean
    showDefaultFooter?: boolean
    cancelText?: string
    confirmText?: string
    loadingText?: string
    loading?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    modalClass?: string
    backdropClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    maxWidth: '',
    size: 'lg',
    scrollable: false,
    scrollHeight: '450px',
    showCloseButton: true,
    showDefaultFooter: true,
    cancelText: 'Close',
    confirmText: '',
    loadingText: 'Loading...',
    loading: false,
    closeOnBackdrop: true,
    closeOnEscape: true,
    modalClass: '',
    backdropClass: ''
})

const emit = defineEmits<{
    'update:show': [value: boolean]
    'close': []
    'confirm': []
}>()

// Computed max width based on size
const maxWidth = computed(() => {
    if (props.maxWidth) return props.maxWidth

    const sizes = {
        sm: '400px',
        md: '500px',
        lg: '700px',
        xl: '800px',
        '2xl': '900px',
        '3xl': '1000px',
        '4xl': '1100px',
        '5xl': '1200px',
        '6xl': '1300px',
        '7xl': '1400px'
    }

    return sizes[props.size]
})

// Methods
const close = () => {
    emit('update:show', false)
    emit('close')
}

const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        close()
    }
}

const handleConfirm = () => {
    emit('confirm')
}

// Close modal with ESC key
onMounted(() => {
    const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && props.show && props.closeOnEscape) {
            close()
        }
    }

    document.addEventListener('keydown', handleEsc)

    onUnmounted(() => {
        document.removeEventListener('keydown', handleEsc)
    })
})

// Prevent body scroll when modal is open
watch(() => props.show, (isVisible) => {
    if (typeof document !== 'undefined') {
        if (isVisible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
})

// Close Icon Component
const CloseIcon = h('svg', {
    class: 'fill-current',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none'
}, [
    h('path', {
        'fill-rule': 'evenodd',
        'clip-rule': 'evenodd',
        d: 'M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z'
    })
])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.7);
}
</style>