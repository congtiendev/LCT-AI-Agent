<template>
    <AuthLayout>
        <SignInForm />
    </AuthLayout>
</template>
<script setup lang="ts">
import { ref, defineAsyncComponent, nextTick, watch, computed } from 'vue'
const AuthLayout = defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
const SignInForm = defineAsyncComponent(() => import('@/components/auth/SignInForm.vue'))
</script>