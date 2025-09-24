import { defineStore } from "pinia"
import { Preferences } from "@capacitor/preferences"
import { ref } from "vue"
import {profile} from "../lib/Api/Auth"
import api from "@/lib/services"
export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(false)
  const token = ref(null)
  const user = ref(null)

  // Set auth state + simpan ke Preferences
  async function setAuth(newToken, newUser) {
    isAuth.value = true
    token.value = newToken
    user.value = newUser
    window.localStorage.setItem("token", newToken)
    window.localStorage.setItem("user", JSON.stringify(newUser))
  }

  // Logout + hapus dari Preferences
  async function logout() {
    try{
        if(token.value){
            isAuth.value = false
            token.value = null
            user.value = null
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
        }
    }catch(e){
      return e;
    }
  }
  // Load auth saat app dibuka
  async function loadAuth() {
    const savedToken = window.localStorage.getItem("token")
    const savedUser = window.localStorage.getItem("user")
    if (savedToken) {
      token.value = savedToken
      isAuth.value = true
    }
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        user.value = null
      }
    }
  }

  return {
    isAuth,
    token,
    user,
    setAuth,
    logout,
    loadAuth,

  }
})
