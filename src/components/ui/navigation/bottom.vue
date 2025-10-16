<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// Active tab state
const activeTab = useRoute()
</script>
<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-pb lg:w-1/3 mx-auto rounded-t-xl">
    <div class="flex justify-around items-center px-2 py-1">
      <RouterLink :to="{ name: 'profile' }" 
      
      :class="[
          'flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors duration-200',
          activeTab.name === 'profile' ? 'text-red-400' : 'text-gray-500 hover:text-gray-700'
        ]"
        class="group"
        >
        <div class="relative">
          <!-- Profile Icon -->
          <svg 
          class="w-6 h-6 mb-1 transition-transform duration-200 group-active:scale-95" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <!-- Active indicator dot -->
        <div 
        v-if="activeTab === 'profile'" 
        class="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
        ></div>
      </div>
      <span class="text-xs font-medium truncate">Profile</span>
      </RouterLink>
    
    <RouterLink 
      :to="{ name: 'beranda' }" 
      :class="[
        'flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors duration-200',
        activeTab.name === 'beranda' ? 'text-red-400' : 'text-gray-500 hover:text-gray-700'
      ]"
      class="group"
    >
      <div class="relative">
        <!-- Home Icon -->
        <svg 
          class="w-6 h-6 mb-1 transition-transform duration-200 group-active:scale-95" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <!-- Active indicator dot -->
        <div 
          v-if="activeTab === 'home'" 
          class="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
        ></div>
      </div>
      <span class="text-xs font-medium truncate">Home</span>
    </RouterLink>
      <!-- Logout Tab (dengan style berbeda) -->
      <button 
        :class="[
          'flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors duration-200',
          activeTab.name === 'logout' ? 'text-red-400' : 'text-gray-500 hover:text-red-500'
        ]"
        class="group"
      >
        <div class="relative">
          <!-- Logout Icon -->
          <svg 
            class="w-6 h-6 mb-1 transition-transform duration-200 group-active:scale-95" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          <!-- Active indicator dot -->
          <div 
            v-if="activeTab === 'logout'" 
            class="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
          ></div>
        </div>
        <span class="text-xs font-medium truncate">Logout</span>
      </button>
    </div>
  </nav>

  <div class="h-16 w-full"></div>
</template>

<style scoped>

.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom, 0);
}

@media (hover: hover) {
  button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

button:active {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Smooth transitions */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ripple effect (optional) */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

button:active::before {
  width: 100px;
  height: 100px;
}
</style>