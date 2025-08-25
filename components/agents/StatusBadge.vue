<!-- components/StatusBadge.vue -->
<template>
    <span :class="badgeClass" class="px-2 py-1 text-xs font-medium rounded-full">
        {{ statusText }}
    </span>
</template>

<script setup lang="ts">
interface Props {
    published: boolean
}

const props = defineProps<Props>()

const badgeClass = computed(() =>
    props.published
        ? 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400'
)

const statusText = computed(() => props.published ? 'Published' : 'Draft')
</script>