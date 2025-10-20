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
import Profile from '@/views/profile/Profile.vue'
import Guiding from '@/views/Guiding/Guiding.vue'
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
        layout: 'default',
        requiresAuth: true
      },
    },
    {
      path:'/health',
      name:'health',
      component:Health,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path:"/profile",
      name:'profile',
      component:Profile,
      meta:{
        layout:"default",
        requiresAuth: true
      }
    },
    {
      path:"/report",
      name:"report",
      component:Report,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path:"/sos",
      name:"sos",
      component:Sos,
      meta:{  
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component:NotFound,
      meta: {
        layout: 'default'
      }
    },
    {
      path: "/guide-profile",
      name: "guide-profile",
      component: Guiding,
      meta: { requiresAuth: true,layout: 'auth' }
    }
  ],
})

router.beforeEach(async (to, from) => {
  nProgress.start();
  const auth = useAuthStore();
  
  if (!auth.isAuth || !auth.token) {
    await auth.loadAuth();
  }

  if (to.meta.requiresAuth && !auth.isAuth) {
    return { name: "login" };
  }

  if (to.name === "login" && auth.isAuth) {
    return { name: "beranda" };
  }

  // const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  // const user = storedUser;
  // const isProfileIncomplete = !user.desa_id || !user.jk;
  // if (auth.isAuth && isProfileIncomplete) {
  //   if (to.name !== "guide-profile" && to.name !== "profile") {
  //     // arahkan dulu ke halaman guide
  //     return { name: "guide-profile" };
  //   }
  // }

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const user = storedUser;
  const isProfileIncomplete = !user.desa_id || !user.jk;
  if (auth.isAuth && isProfileIncomplete) {
    if (to.name !== "guide-profile" && to.name !== "profile") {
      // arahkan dulu ke halaman guide
      return { name: "guide-profile" };
    }
  }
  return true;
});

// Hentikan progress bar setelah selesai
router.afterEach(() => {
  nProgress.done()
})

export default router
