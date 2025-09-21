<script setup>
    import LoginForm from '@/components/LoginForm.vue';
    import AuthLayout from '@/layouts/AuthLayout.vue';
    defineOptions({
        name: 'Login',
        layout: AuthLayout
    })
    document.title = 'Login | Safeheaven';
</script>
<template>
    <LoginForm />
</template>