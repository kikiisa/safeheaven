import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Request interceptor: inject access token
api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default api
