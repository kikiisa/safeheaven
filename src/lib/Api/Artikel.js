import api from "../services";


export const Allartikel = async () => {
    const response = await api.get('artikel')
    return response.data
}

export const Detailartikel = async (id) => {
    const response = await api.get(`artikel/${id}`)
    return response.data
}