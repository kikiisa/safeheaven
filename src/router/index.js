import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import nProgress from 'nprogress'
import '../assets/nprogress.css'
import NotFound from '@/NotFound.vue'
import Dashboard from '@/views/Menu/Dashboard.vue'
import Index from '@/views/reading/Index.vue'
import { useAuthStore } from '@/stores/auth'
import Detail from '@/views/reading/Detail.vue'
import Sos from '@/views/sos/Sos.vue'
import Report from '@/views/report/Report.vue'
import Health from '@/views/health/Health.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/pendaftaran',
      name: 'pendaftaran',
      component:Register,
      meta: {
        layout: 'auth'
      }
    },

    {
      path:'/beranda',
      name:'beranda',
      component:Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:"/reading",
      name:"reading",
      component:Index,
      meta: {
        layout: 'default'
      },
    },
    {
      path:"/reading/:slug",
      name:"detailartikel",
      component:Detail,
      meta: {
        layout: 'default'
      },
    },
    {
      'path':'/health',
      name:'health',
      component:Health,
      meta: {
        layout: 'default'
      }
    },
    
    {
      path:"/report",
      name:"report",
      component:Report,
      meta: {
        layout: 'default'
      }
    },
    {
      path:"/sos",
      name:"sos",
      component:Sos,
      meta:{  
        layout: 'default'
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component:NotFound,
      meta: {
        layout: 'default'
      }
    }
  ],
})

router.beforeEach(async (to, from) => {
  nProgress.start();
  const auth = useAuthStore();

  // coba load auth dari storage kalau belum ada
  if (!auth.isAuth || !auth.token) {
    await auth.loadAuth();
  }

  // cek route yang butuh login
  if (to.meta.requiresAuth && !auth.isAuth) {
    return { name: "login" };
  }

  // kalau user sudah login & coba ke login lagi, redirect ke home/dashboard
  if (to.name === "login" && auth.isAuth) {
    return { name: "beranda" };
  }

  // default -> lanjut
  return true;
});

// Hentikan progress bar setelah selesai
router.afterEach(() => {
  nProgress.done()
})

export default router
