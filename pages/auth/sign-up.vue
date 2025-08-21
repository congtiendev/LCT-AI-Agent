<!-- pages/sign-up.vue -->
<template>
    <AuthSignUpForm />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'guest',
})
</script>