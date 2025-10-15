<script setup>
import { Detailartikel } from '@/lib/Api/Artikel';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const API_URL = import.meta.env.VITE_IMAGE_URL

import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';

const route = useRoute()
const { isLoading, data, isError } = useQuery({
    queryKey: ['artikel', route.params.slug], // lebih aman: tambahin slug di queryKey
    queryFn: () => Detailartikel(route.params.slug)
})
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <div class="py-8">
        <span class="pi pi-spin pi-spinner"></span>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="isError || !data?.data">
      <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-4xl mt-8">404</h1>
        <p class="text-2xl">Artikel Tidak Ditemukan</p>
      </div>
    </div>

    <!-- Success -->
    <div class="list-artikel mt-4" v-else>
      <Card class="rounded-3xl">
        <img
          v-if="data?.data?.image"
          class="relative top-[-25px] p-2 rounded-3xl"
          height="200px"
          :src="`${API_URL}data/artikel/${data.data.image}`"
          alt="artikel"
        />
       <div class=""v-else>
        <h1>404</h1>
       </div>

        <CardHeader>
          <CardTitle>{{ data.data.judul }}</CardTitle>
          <CardDescription class="flex flex-col gap-3">
            <Badge
              v-if="data?.data?.categoryverbal"
              class="bg-green-400 cursor-pointer hover:bg-slate-800"
            >
              <i class="pi pi-tag"></i> {{ data.data.categoryverbal.name }}
            </Badge>

            <div class="text-justify" v-html="data.data.body" />
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>
