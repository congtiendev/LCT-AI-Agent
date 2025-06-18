<template>
    <button :class="[
        'px-4 py-2 rounded font-medium transition-colors',
        variantClasses[variant],
        { 'opacity-50 cursor-not-allowed': disabled }
    ]" :disabled="disabled" @click="$emit('click')">
        <slot />
    </button>
</template>

<script setup lang="ts">
interface Props {
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    disabled: false
})

defineEmits<{
    click: []
}>()

const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
}
</script>