<template>
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <!-- Header -->
        <div @click="toggle"
            class="flex items-center justify-between py-3 pl-6 pr-3 cursor-pointer transition-colors duration-200"
            :class="isOpen ? 'bg-gray-50 dark:bg-white/[0.03]' : 'hover:bg-gray-25 dark:hover:bg-white/[0.01]'">
            <h4 class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ title }}
            </h4>

            <button :class="[
                'flex h-12 w-full max-w-12 items-center justify-center rounded-full bg-gray-100 duration-200 ease-linear dark:bg-white/[0.03] transition-all',
                isOpen
                    ? 'text-gray-800 dark:text-white/90 rotate-180'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            ]" :aria-expanded="isOpen" :aria-label="isOpen ? 'Collapse section' : 'Expand section'">
                <svg class="stroke-current transition-transform duration-200" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.75 8.875L12 15.125L18.25 8.875" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>

        <!-- Content -->
        <Transition name="accordion" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave"
            @after-leave="afterLeave">
            <div v-show="isOpen" class="accordion-content overflow-hidden">
                <div class="px-6 pb-3">
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                        <slot>
                            <p>{{ content }}</p>
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
interface Props {
    title: string
    content?: string
    isActive?: boolean
    itemId?: string | number
    activeItem?: string | number | null
}

const props = withDefaults(defineProps<Props>(), {
    content: '',
    isActive: false,
    itemId: '',
    activeItem: null
})

// Emits
const emit = defineEmits<{
    toggle: [id: string | number, isOpen: boolean]
    open: [id: string | number]
    close: [id: string | number]
}>()

// State
const isOpen = ref(props.isActive)

// Watch for external control (accordion group)
watch(() => props.activeItem, (newActiveItem) => {
    if (props.itemId !== undefined && props.itemId !== null) {
        isOpen.value = newActiveItem === props.itemId
    }
})

// Methods
const toggle = () => {
    isOpen.value = !isOpen.value

    if (props.itemId !== undefined && props.itemId !== null) {
        emit('toggle', props.itemId, isOpen.value)
    }

    if (isOpen.value) {
        emit('open', props.itemId || 0)
    } else {
        emit('close', props.itemId || 0)
    }
}

// Smooth collapse animation methods
const enter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = '0'
    element.style.paddingTop = '0'
    element.style.paddingBottom = '0'
    element.style.overflow = 'hidden'
    element.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)'

    // Force reflow
    element.offsetHeight

    element.style.height = `${element.scrollHeight}px`
    element.style.paddingTop = ''
    element.style.paddingBottom = ''
}

const afterEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = 'auto'
    element.style.overflow = 'visible'
    element.style.transition = ''
    element.style.paddingTop = ''
    element.style.paddingBottom = ''
}

const beforeLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = `${element.scrollHeight}px`
    element.style.overflow = 'hidden'
}

const leave = (el: Element) => {
    const element = el as HTMLElement
    element.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)'

    // Force reflow
    element.offsetHeight

    element.style.height = '0'
    element.style.paddingTop = '0'
    element.style.paddingBottom = '0'
}

const afterLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.height = ''
    element.style.paddingTop = ''
    element.style.paddingBottom = ''
    element.style.overflow = ''
    element.style.transition = ''
}

// Expose methods for parent component
defineExpose({
    toggle,
    isOpen: readonly(isOpen)
})
</script>

<style scoped>
.accordion-enter-from,
.accordion-leave-to {
    height: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    overflow: hidden !important;
}

/* Smooth button rotation */
.rotate-180 {
    transform: rotate(180deg);
}

button svg {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover improvements */
.cursor-pointer {
    transition: background-color 0.2s ease;
}

/* Ensure content doesn't jump during animation */
.accordion-content {
    will-change: height;
}

/* Dark mode improvements */
@media (prefers-color-scheme: dark) {
    .hover\:bg-gray-25:hover {
        background-color: rgba(255, 255, 255, 0.01);
    }
}

/* Custom cubic-bezier for natural accordion movement */
.accordion-smooth {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>