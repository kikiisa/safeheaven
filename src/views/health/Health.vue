<script setup>
import { Health } from '@/lib/Api/Health'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue' // 'watch' is added for the page reset
import Button from '@/components/ui/button/Button.vue' // Assuming this is your custom Button component


const API_URL = import.meta.env.VITE_IMAGE_URL

const page = ref(1)
const searchQuery = ref('') 
watch(searchQuery, () => {
  page.value = 1
})

const {data, isLoading, isError} = useQuery({
  
    queryKey:['agent', page, searchQuery],
  
    queryFn:()=>  Health(page.value, searchQuery.value),
  
    keepPreviousData: true
})
const nextPage = () => {
    
    if(page.value < data.value?.data?.last_page){
        page.value++
    }    
}

const prevPage = () => {

    if(page.value > 1){
        page.value--
    }    
}
</script>

<template>
  <section class="min-h-screen p-4">
    <div class="flex flex-col justify-center py-4 bg-white rounded-lg shadow-md mb-6">
      <h1 class="text-2xl font-bold text-center text-gray-800">Fitur Health</h1>
      <span class="text-sm text-center text-gray-500 mt-1">Dapatkan informasi Psikolog dan Dokter terdekat.</span>
    </div>
    <div class="mb-6">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        
        <input
          type="text"
          @keypress=""
          v-model="searchQuery" placeholder="Cari nama, spesialisasi, atau lokasi..."
          class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 transition duration-150 ease-in-out shadow-sm"
        />
      </div>
    </div>

    <div class="text-center py-8" v-if="isLoading">
        <p> <span class="pi pi-spinner"></span> Memuat data...</p>
    </div>

    <div v-else-if="isError" class="text-center py-10 text-gray-500 border border-gray-200 bg-white rounded-lg p-4">
            <p>Tidak ada Agent Health yang tersedia saat ini Hubungi Admin.</p>
    </div>

    <div 
        class="text-center py-8 text-gray-500" 
        v-else-if="searchQuery && data?.data?.data?.length === 0"
    >
        <p>Tidak ada hasil yang ditemukan untuk "{{ searchQuery }}".</p>
    </div>

    <div class="space-y-4" v-else> <div 
        v-for="agent in  data?.data?.data" 
        :key="agent.id"
        class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col sm:flex-row gap-4"
      >
        <div class="flex items-start gap-4 w-full">
          <img 
            :src="`${API_URL}data/agent/${agent.avatar}`" 
            alt="avatar"
            class="w-16 h-16 rounded-full object-cover border-2 border-blue-500 flex-shrink-0"
          />
          <div class="flex flex-col">
            <h2 class="text-lg font-semibold text-gray-900">{{ agent.name }}</h2>
            <p class="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full self-start mt-1">
              {{ agent.category }}
            </p>
          </div>
        </div>

        <div class="flex flex-col w-full pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-4">
            <p class="text-sm text-gray-600 mb-2 line-clamp-2" v-html="agent.description"></p>

            <div class="flex items-center text-sm text-gray-500 mb-1">
                <svg class="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span class="truncate">{{ agent.alamat }}</span>
            </div>

            <div class="mt-3 flex gap-3">
                <a :href="`tel:${agent.phone}`" class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Telepon
                </a>
                <a :href="`https://wa.me/${agent.whatsapps}`" target="_blank" class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.04 2C7.03 2 3 6.03 3 11.04c0 1.76.51 3.48 1.48 4.96L3.5 20.5l5.05-1.39a8.97 8.97 0 004.09 1.05c5.01 0 9.04-4.03 9.04-9.04S17.05 2 12.04 2zM17.5 15.5c-.17.26-.95.63-1.37.69-.4.07-.8.04-1.12-.04-.32-.08-1.04-.32-2.07-.95-1.33-.84-2.2-2.26-2.46-2.68-.25-.41-.02-.63.19-.84.18-.18.4-.44.59-.66.18-.21.24-.34.33-.56.08-.22.04-.41-.02-.56-.05-.15-.42-1.01-.58-1.35-.16-.33-.33-.28-.56-.28-.21 0-.44-.02-.68-.02-.24 0-.63.09-.95.42-.32.33-1.22 1.2-1.22 2.92s1.25 3.4 1.42 3.63c.17.22 2.41 3.68 5.86 4.97.88.33 1.62.53 2.18.66.86.2 1.65.17 2.27.1c.6-.07 1.83-.75 2.08-1.48.25-.73.25-1.35.17-1.48-.08-.13-.3-.21-.63-.38z"/></svg>
                    WhatsApp
                </a>
            </div>

        </div>
      </div>
      
      <div class="paginations flex flex-row gap-4 justify-center">
          <Button 
            class="bg-gray-500 hover:bg-gray-600 transition-colors" 
            @click="prevPage" 
            :disabled="page === 1 || isLoading"
          >
            Previous
          </Button>
          
          <Button 
            class="bg-red-500 hover:bg-red-800 transition-colors" 
            @click="nextPage"
            :disabled="page === data?.data?.last_page || isLoading"
          >
            Next
          </Button>
      </div>
    </div>
  </section>
</template>