import api from "../services"

export const login = async (data) => {
    try {
        const response = await api.post('login', data)
        if(response.status == 200)
        {
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        }
        return response
    } catch(error) 
    {
        return error
    }
}

export const logout = async () => {
    try {
        const reponse = await api.post('logout')
        return reponse
    } catch(error) 
    {
        return error
    }
}

export const profile = async () => {
    try {
        const reponse = await api.get('me')
        return reponse
    } catch(error) 
    {
        return error
    }
}
