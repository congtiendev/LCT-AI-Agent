<template>
    <div ref="dropdownRef" class="relative h-fit">
        <!-- Trigger Slot -->
        <slot name="trigger" :is-open="isOpen" :toggle="toggle" :open="open" :close="close" />

        <!-- Dropdown Content -->
        <Transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-show="isOpen" :class="[
                'absolute z-40 rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark p-2',
                positionClasses,
                widthClass,
                customClass
            ]" @click.stop>
                <slot name="content" :is-open="isOpen" :close="close" :toggle="toggle" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
interface Props {
    // Vị trí horizontal
    horizontalPosition?: 'left' | 'right' | 'center'
    // Vị trí vertical  
    verticalPosition?: 'top' | 'bottom'
    // Offset custom
    offsetX?: string
    offsetY?: string
    // Width
    width?: string
    // Custom class
    customClass?: string
    // Behaviors
    closeOnClickOutside?: boolean
    closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    offsetX: '0',
    offsetY: '0',
    width: 'w-40',
    customClass: '',
    closeOnClickOutside: true,
    closeOnEscape: true
})

const emit = defineEmits<{
    open: []
    close: []
    toggle: [isOpen: boolean]
}>()

// State
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

// Computed
const widthClass = computed(() => props.width)

const positionClasses = computed(() => {
    const classes: string[] = []

    // Vertical position
    if (props.verticalPosition === 'top') {
        classes.push('bottom-full')
    } else {
        classes.push('top-full')
    }

    // Horizontal position
    switch (props.horizontalPosition) {
        case 'left':
            classes.push('left-0')
            break
        case 'center':
            classes.push('left-1/2 -translate-x-1/2')
            break
        case 'right':
        default:
            classes.push('right-0')
            break
    }

    // Custom offsets
    if (props.offsetX !== '0') {
        classes.push(`translate-x-[${props.offsetX}]`)
    }
    if (props.offsetY !== '0') {
        classes.push(`translate-y-[${props.offsetY}]`)
    }

    return classes.join(' ')
})

// Methods
const toggle = () => {
    isOpen.value = !isOpen.value
    emit('toggle', isOpen.value)
    if (isOpen.value) {
        emit('open')
    } else {
        emit('close')
    }
}

const open = () => {
    if (!isOpen.value) {
        isOpen.value = true
        emit('open')
        emit('toggle', true)
    }
}

const close = () => {
    if (isOpen.value) {
        isOpen.value = false
        emit('close')
        emit('toggle', false)
    }
}

// Click outside using Vue's onClickOutside
onClickOutside(dropdownRef, () => {
    if (props.closeOnClickOutside && isOpen.value) {
        close()
    }
})

// Keyboard support using Vue's onKeyStroke
onKeyStroke('Escape', () => {
    if (props.closeOnEscape && isOpen.value) {
        close()
    }
})

// Expose methods
defineExpose({
    isOpen: readonly(isOpen),
    open,
    close,
    toggle
})
</script>