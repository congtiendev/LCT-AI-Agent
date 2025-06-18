<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6 text-[yellow]">Users Management (Static)</h1>

        <!-- Search input (chỉ UI) -->
        <div class="mb-4">
            <input v-model="search" type="text" placeholder="Search users..." class="border rounded px-3 py-2 w-64">
        </div>

        <!-- Add user form -->
        <div class="bg-white p-4 rounded border mb-6">
            <h2 class="text-xl font-semibold mb-4">Add New User</h2>
            <div class="grid grid-cols-2 gap-4">
                <input v-model="newUser.name" type="text" placeholder="Name" class="border rounded px-3 py-2">
                <input v-model="newUser.email" type="email" placeholder="Email" class="border rounded px-3 py-2">
            </div>
            <button @click="addUser" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add User
            </button>
        </div>

        <!-- Loading state (fake) -->
        <div v-if="usersStore.loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p class="mt-2">Loading...</p>
        </div>

        <!-- Users list -->
        <div v-else class="grid gap-4">
            <div v-for="user in filteredUsers" :key="user.id"
                class="border rounded p-4 flex items-center justify-between hover:bg-gray-50">
                <div class="flex items-center space-x-4">
                    <img :src="user.avatar" :alt="user.name" class="w-12 h-12 rounded-full">
                    <div>
                        <h3 class="font-semibold">{{ user.name }}</h3>
                        <p class="text-gray-600">{{ user.email }}</p>
                        <span class="text-sm bg-blue-100 px-2 py-1 rounded">{{ user.role }}</span>
                    </div>
                </div>
                <button @click="removeUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredUsers.length === 0" class="text-center py-8 text-gray-500">
            No users found
        </div>
    </div>
</template>

<script setup lang="ts">
const usersStore = useUsersStore()
const search = ref('')
const newUser = ref({ name: '', email: '' })

// Computed for filtering (client-side only)
const filteredUsers = computed(() => {
    if (!search.value) return usersStore.users

    return usersStore.users.filter(user =>
        user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase())
    )
})

// UI actions - không có API calls
const addUser = () => {
    if (newUser.value.name && newUser.value.email) {
        // Fake loading
        usersStore.setLoading(true)

        setTimeout(() => {
            usersStore.addUser({
                ...newUser.value,
                avatar: 'https://via.placeholder.com/150',
                role: 'user'
            })

            // Reset form
            newUser.value = { name: '', email: '' }
            usersStore.setLoading(false)
        }, 500)
    }
}

const removeUser = (id: string) => {
    usersStore.setLoading(true)

    setTimeout(() => {
        usersStore.removeUser(id)
        usersStore.setLoading(false)
    }, 300)
}
</script>