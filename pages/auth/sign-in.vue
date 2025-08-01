<template>
    <SignInForm />
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent, nextTick, watch, computed } from 'vue'
const SignInForm = defineAsyncComponent(() => import('@/components/auth/SignInForm.vue'))
</script>