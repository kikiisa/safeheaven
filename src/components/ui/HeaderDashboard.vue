<script setup>
import {computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {toast} from 'vue-sonner'
import { logout } from '@/lib/Api/Auth';
import { useRouter } from 'vue-router';
import { getInitials } from '@/lib/getInitials';


const router = useRouter();


const auth = useAuthStore();

// Dropdown state
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = async () => {
  // Handle logout logic here
  const token = auth.token;
  const res = await logout();
  if(res.status == 200) {
    auth.logout(token);
    toast.success(res.data.message);
    return router.push({name:"login"})

  }
  showDropdown.value = false
}



// Close dropdown when clicking outside
const closeDropdown = () => {
  showDropdown.value = false
};
const user = computed(() => auth.user ?? { name: "Guest", role: "Mahasiswa" })



</script>
<template>
  <header class="relative bg-gradient-to-r from-red-400 to-red-800 p-4 rounded-b-xl shadow-sm lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between">
      <!-- App Title & Welcome -->
       
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <h1 class="font-bold text-white text-xl">
            Safeheaven 
            <span class="text-xs text-green-100 font-normal ml-1">v.1.0</span>
          </h1>
          <!-- App Icon/Logo (optional) -->
          <div class="w-6 h-6 bg-opacity-20 rounded-full flex items-center justify-center">
            
          </div>
        </div>
        <p class="text-green-100 text-sm">Hi, Selamat Datang <span class="font-medium">{{ auth?.user?.full_name }}</span></p>
      </div>
      <!-- User Profile Section -->
      <div class="relative">
        <button 
          @click="toggleDropdown"
          class="flex items-center gap-3  bg-opacity-15 hover:bg-opacity-25 backdrop-blur-sm rounded-full p-2 pr-4 transition-all duration-200 active:scale-95"
        >
          <!-- Avatar -->
          <div class="relative">
            <!-- <img 
              :src="user.avatar" 
              :alt="user.name"
              class="w-10 h-10 rounded-full border-2 border-white border-opacity-30 object-cover"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            > -->
             <div class="w-10 h-10 flex items-center justify-center rounded-full bg-red-800 text-white font-bold">
                    {{ getInitials(auth?.user?.full_name) }}
                </div>
                
            <!-- Fallback avatar -->
            <div class="hidden w-10 h-10 rounded-full border-2 border-white border-opacity-30 bg-white bg-opacity-20 items-center justify-center">
              <span class="text-white font-medium text-sm">{{ auth?.user?.full_name }}</span>
            </div>
            <!-- Online indicator -->
            <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        
          <!-- Dropdown arrow -->
          <svg 
            :class="['w-4 h-4 text-white transition-transform duration-200', showDropdown ? 'rotate-180' : '']"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div 
            v-if="showDropdown"
            class="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
          >
            <!-- User info in dropdown (mobile) -->
           
            <!-- Menu items -->
            <RouterLink 
              :to="{ name: 'profile' }" 
              
              class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                 <div class="w-4 h-8 flex items-center justify-center rounded-full text-dark font-bold">
                    {{ getInitials(user.name) }}
                </div>

              </div>
              <div class="text-left">
                <p class="text-sm font-medium">Profile</p>
                <p class="text-xs text-gray-500">Manage your account</p>
              </div>
            </RouterLink>
            <div class="border-t border-gray-100 mt-2 pt-2">
              <button 
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 group"
              >
                <div class="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-full flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  
                </div>
                <div class="text-left">
                  <p class="text-sm font-medium">Logout</p>
                  <p class="text-xs text-red-400">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Click outside to close dropdown -->
    <div 
      v-if="showDropdown" 
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </header>
</template>

<style scoped>
/* Smooth gradient animation */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Glass effect for user button */
.backdrop-blur-sm {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Ripple effect */
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
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

button:active::before {
  width: 100px;
  height: 100px;
}

/* Enhanced shadow for dropdown */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04),
              0 0 0 1px rgba(0, 0, 0, 0.05);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .rounded-b-3xl {
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }
}

/* Status indicator pulse animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.bg-green-400 {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>