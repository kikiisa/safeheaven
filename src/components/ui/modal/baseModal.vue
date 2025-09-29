<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
defineProps<{
  title?: string
  description?: string,
  open:boolean
}>()
</script>

<template>
  <AlertDialog :open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div class="py-2">
        <slot/>
      </div>
        <button @click="$emit('close')" class="absolute top-3 right-3 cursor-pointer"><i class="pi pi-times"></i></button>
    </AlertDialogContent>
  </AlertDialog>
</template>