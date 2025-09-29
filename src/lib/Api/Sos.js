import api from "../services"
export const Sos = async (value) => {
    try {
        const response = await api.post('sos/store',value,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response;
    } catch(error) {
        return error
    }
}