<script setup>
import { useRoute } from 'vue-router';


const route = useRoute();

</script>
<template>
    <section>
        <div class="main-menu left-0 w-full rounded-2xl bg-white shadow-sm z-50">
            <div class="flex justify-around items-center h-16">
                <RouterLink :to="{ name: 'reading' }" :class="[
                    'flex flex-col items-center transition-colors duration-300',
                    route.name === 'reading' ? 'text-[#541212]' : 'text-gray-500 hover:text-[#541212]'
                ]">

                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.253v13m0-13C10.835 5.485 9.299 5 8 5H6c-2.21 0-4 1.79-4 4v10c0 2.21 1.79 4 4 4h2c1.299 0 2.835-.485 4-1.253m0-13C13.165 5.485 14.701 5 16 5h2c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4h-2c-1.299 0-2.835-.485-4-1.253m-4.253-15.5c-.753-.484-1.57-.753-2.427-.753s-1.674.269-2.427.753" />
                    </svg>
                    <span class="text-xs mt-1">Reading</span>
                </RouterLink>

                <RouterLink :to="{ name: 'sos' }"
                :class="[
                    'flex flex-col items-center transition-colors duration-300',
                    route.name === 'sos' ? 'text-[#541212]' : 'text-gray-500 hover:text-[#541212]'
                ]"
                   >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span class="text-xs mt-1">SOS</span>
                </RouterLink>
                <RouterLink :to="{ name: 'report' }"
                :class="[
                    'flex flex-col items-center transition-colors duration-300',
                    route.name === 'report' ? 'text-[#541212]' : 'text-gray-500 hover:text-[#541212]'
                ]"    
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0a2 2 0 110-4 2 2 0 010 4zm2 2h.01M12 21h.01" />
                    </svg>
                    <span class="text-xs mt-1">Report</span>
                </RouterLink>

                <RouterLink :to="{ name: 'health' }"
                    :class="[
                        'flex flex-col items-center transition-colors duration-300',
                        route.name === 'health' ? 'text-[#541212]' : 'text-gray-500 hover:text-[#541212]'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

                    <span class="text-xs mt-1">Heal</span>
                </RouterLink>
            </div>
        </div>
    </section>
</template>