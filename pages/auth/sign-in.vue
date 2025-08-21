<template>
    <AuthSignInForm />
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'guest',
})
</script>