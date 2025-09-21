<!-- src/App.vue -->
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { Toaster } from './components/ui/sonner'
import 'vue-sonner/style.css' // 
const route = useRoute()
const layout = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : DefaultLayout
})
</script>

<template>
  <component :is="layout">
    <router-view />
    <Toaster/>
  </component>
</template>
