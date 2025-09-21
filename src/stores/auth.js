import { defineStore } from "pinia"
import { Preferences } from "@capacitor/preferences"
import { ref } from "vue"
import {logout} from "@/lib/Api/Auth"

export const useAuthStore = defineStore("auth", () => {
  const isAuth = ref(false)
  const token = ref(null)
  const user = ref(null)

  // Set auth state + simpan ke Preferences
  async function setAuth(newToken, newUser) {
    isAuth.value = true
    token.value = newToken
    user.value = newUser
    await Preferences.set({ key: "token", value: newToken })
    await Preferences.set({ key: "user", value: JSON.stringify(newUser) })
  }

  // Logout + hapus dari Preferences
  async function logout() {
    try{
        if(token.value){
            isAuth.value = false
            token.value = null
            user.value = null
            await Preferences.remove({ key: "token" })
            await Preferences.remove({ key: "user" })
        }
    }catch(e){
      return e;
    }

  }

  // Load auth saat app dibuka
  async function loadAuth() {
    const { value: savedToken } = await Preferences.get({ key: "token" })
    const { value: savedUser } = await Preferences.get({ key: "user" })

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
    loadAuth
  }
})
