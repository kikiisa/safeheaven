import api from "../services"

export const ResultReport = async (data) => {
    const response = await api.post('result-report',data)
    return response
}
