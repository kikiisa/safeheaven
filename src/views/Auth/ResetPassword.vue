<script setup>
    import ResetForm from '@/components/ResetForm.vue';
    import router from '@/router';
    import FormPassword from '@/components/FormPassword.vue';
    import { computed } from 'vue';
    const showResetForm = computed(() => !router.currentRoute.value.query.token)
</script>
<template>
    <ResetForm v-if="showResetForm" />
    <FormPassword v-else :token="router.currentRoute.value.query.token" />
</template>
