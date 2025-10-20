<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleContinue = () => {
  router.push({ name: "profile" });
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fadeIn"
  >
    <h1 class="text-2xl font-bold mb-4 animate-slideUp">
      Selamat Datang Di
    </h1>

    <img
      src="../../assets/logo.png"
      alt="logo"
      class=" mb-4 animate-zoomIn"
    />

    <p class="mb-6 text-gray-600 animate-slideUp delay-200">
      Sebelum melanjutkan, lengkapi profil anda agar kami bisa memberikan layanan yang lebih baik.
    </p>

    <button
      class="px-6 py-2 bg-red-500 text-white rounded-lg  animate-bounceIn delay-500"
      @click="handleContinue"
    >
      Lanjutkan ke Profil
    </button>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-zoomIn {
  animation: zoomIn 0.8s ease-out forwards;
}

.animate-bounceIn {
  animation: bounceIn 0.6s ease-out forwards;
}
</style>
