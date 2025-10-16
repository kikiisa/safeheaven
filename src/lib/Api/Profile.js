import api from "../services"

export const profile = async () => {
    const response = await api.get('member')
    return response
}



export const updateProfile = async (data) => {
    const response = await api.put('profile', data)
    return response
}