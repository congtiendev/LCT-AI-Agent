<template>
    <img alt="Logo" :class="logoClass" :src="url" @click="redirectHome()" />
</template>

<script setup lang="ts">

defineProps({
    logoClass: {
        type: String,
    },
    url: {
        type: String,
    },
});
const router = useRouter();
const redirectHome = () => {
    router.push({ name: 'home' });
};
</script>