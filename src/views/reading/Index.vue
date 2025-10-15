<script setup>
import Badge from '@/components/ui/badge/Badge.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { Allartikel } from '@/lib/Api/Artikel';
import { useQuery } from '@tanstack/vue-query';
import Button from '@/components/ui/button/Button.vue';
import { RouterLink } from 'vue-router'; // Ensure RouterLink is imported or globally available

const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['artikel'],
    queryFn: Allartikel
})
const API_URL = import.meta.env.VITE_IMAGE_URL

</script>

<template>
    <section class="p-4 sm:p-6 md:p-8  min-h-screen">
        <div class="flex flex-col justify-center py-4 mb-4 bg-white rounded-xl shadow-sm">
            <h1 class="text-2xl font-bold text-center text-gray-900">Artikel Verbal 💬</h1>
            <span class="text-sm text-center text-gray-500 mt-1">Jelajahi wawasan, dan informasi terkini kami dari semua kategori verbal.</span>
        </div>

        <div v-if="isLoading" class="text-center py-10 text-gray-500">
            <div class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat artikel...
            </div>
        </div>

        <div v-else-if="isError" class="text-center py-10 text-red-500 border border-red-200 bg-red-50 rounded-lg p-4">
            <p class="font-semibold">⚠️ Terjadi kesalahan saat memuat data.</p>
            <Button @click="refetch" class="mt-2 bg-red-400 hover:bg-red-500">Coba Muat Ulang</Button>
        </div>

        <div class="list-artikel mt-6 space-y-6" v-else-if="data?.data?.data?.length">
            <Card class="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100" 
                  v-for="value in data.data.data" 
                  :key="value.id">

                <div class="w-full aspect-video overflow-hidden relative top-[-25px]">
                    <img class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                         :src="`${API_URL}data/artikel/${value.image}`" 
                         :alt="value.judul">
                </div>
                
                <CardHeader class="pt-4 pb-2">
                    <Badge variant="outline" class="bg-green-100 text-green-700 border-green-300 mb-2 w-fit cursor-pointer hover:bg-green-200">
                        <i class="pi pi-tag text-xs mr-1"></i> 
                        {{ value.categoryverbal.name }}
                    </Badge>

                    <CardTitle class="text-xl font-semibold text-gray-900 line-clamp-2">
                        {{ value.judul }}
                    </CardTitle>

                    <CardDescription class="text-sm text-gray-600 mt-2">
                        <div class="desc text-justify line-clamp-3">
                            {{ value.description }}
                        </div>
                    </CardDescription>
                </CardHeader>

                <CardFooter class="pt-0 pb-4">
                    <RouterLink :to="{ name: 'detailartikel', params: { slug: value.slug } }" class="w-full">
                        <Button class="w-full bg-red-500 hover:bg-red-800 transition-colors shadow-md">
                            <span class="font-semibold">Baca Selengkapnya </span> 
                            <i class="pi pi-arrow-right ml-2 text-sm"></i>
                        </Button>
                    </RouterLink>
                </CardFooter>
            </Card>
        </div>

        <div v-else class="text-center py-10 text-gray-500 border border-gray-200 bg-white rounded-lg p-4">
            <p>Tidak ada artikel yang tersedia saat ini.</p>
        </div>
    </section>
</template>

<style scoped>
/* No custom styles needed, all handled by Tailwind CSS */
</style>