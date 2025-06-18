<template>
    <div class="border rounded p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center space-x-4">
            <img :src="user.avatar" :alt="user.name" class="w-12 h-12 rounded-full">
            <div class="flex-1">
                <h3 class="font-semibold">{{ user.name }}</h3>
                <p class="text-gray-600">{{ user.email }}</p>
                <span class="text-sm px-2 py-1 rounded"
                    :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'">
                    {{ user.role }}
                </span>
            </div>
            <button @click="$emit('delete', user.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface User {
    id: string
    name: string
    email: string
    avatar: string
    role: string
}

defineProps<{
    user: User
}>()

defineEmits<{
    delete: [id: string]
}>()
</script>