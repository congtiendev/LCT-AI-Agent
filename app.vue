<template>
  <div id="app" :class="{ 'bg-gray-900': darkMode }" class="relative">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Meta configuration
useHead({
  title: 'Sign In | TailAdmin - Tailwind CSS Admin Dashboard Template',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Sign in to TailAdmin - Free and Open-Source Tailwind CSS Admin Dashboard Template' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

// Reactive state
const darkMode = ref(false)
onMounted(() => {
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme) {
    darkMode.value = JSON.parse(savedTheme)
  } else {
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})

// Watch dark mode changes
watch(darkMode, (newValue) => {
  localStorage.setItem('darkMode', JSON.stringify(newValue))
})

// Methods
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

</script>
