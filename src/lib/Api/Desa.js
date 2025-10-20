import api from "../services"

export const Desa = async () => {
    const response = await api.get('desa')
    return response.data.data
}

export const DetailDesa = async () => {
    const response = await api.get(`desa-detail`)
    return response.data.data
}
