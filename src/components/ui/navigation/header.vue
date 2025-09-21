<script setup>
    const props = defineProps({
        title:String
    });
</script>
<template>
    <div class="bg-slate-200">
        {{ title }}
    </div>
</template>