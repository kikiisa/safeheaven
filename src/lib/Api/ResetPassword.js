import api from "../services"

export const sendLinkReset = async (data) => {
    const response = await api.post('forgot-password', data)
    return response
}


export const updatePassword = async (data) => 
{
    const response = await api.post('reset-password', data)
    return response
}