<script setup lang="ts">
import HeaderDashboard from '@/components/ui/HeaderDashboard.vue';
import Bottom from '@/components/ui/navigation/bottom.vue';
import Menu from '@/components/ui/navigation/Menu.vue';

</script>

<template>
    <div>
        <HeaderDashboard/>
        <main class="lg:w-1/3 w-full mx-auto p-4">
            <Menu/>
            <slot></slot>
            <Bottom/>
        </main>
    </div>
</template>
