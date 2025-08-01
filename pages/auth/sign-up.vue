<template>
    <SignUpForm />
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent, nextTick, watch, computed } from 'vue'
const SignUpForm = defineAsyncComponent(() => import('@/components/auth/SignUpForm.vue'))
</script>