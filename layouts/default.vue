<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="container mx-auto px-4 py-4">
                <h1 class="text-2xl font-bold text-gray-800">My Nuxt App</h1>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-8">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-4 mt-auto">
            <div class="container mx-auto px-4 text-center">
                <p>&copy; 2024 My Nuxt App</p>
            </div>
        </footer>
    </div>
</template>