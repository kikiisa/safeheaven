import api
from "../services"

export const categoryVerbal = async () => {
    try {
        const response = await api.get('category-verbal')
        return response.data.data
    } catch(error) 
    {
        return error
    }
}
