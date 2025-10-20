import api from "../services"

export const Desa = async () => {
    const response = await api.get('desa')
    return response.data.data
}
