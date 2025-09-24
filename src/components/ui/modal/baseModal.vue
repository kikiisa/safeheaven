<!-- src/components/BaseModal.vue -->
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

defineProps<{
  title?: string
  description?: string,
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger class="w-full">
      <slot name="trigger">
        <!-- Default trigger kalau tidak diisi -->
        <button class="px-3 py-2 rounded bg-primary text-white">
          Open Modal
        </button>
      </slot>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <div class="py-2">
        <slot />
      </div>
    </DialogContent>
  </Dialog>
</template>
