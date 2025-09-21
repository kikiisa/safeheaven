import api from "../services"

export const login = async (data) => {
    try {
        const reponse = await api.post('login', data)
        return reponse
    } catch(error) 
    {
        return error
    }
}

export const logout = async (token) => {
    try {
        const reponse = await api.post('logout', {},{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return reponse
    } catch(error) 
    {
        return error
    }
}

export const me = async () => {
    try {
        const reponse = await api.get('me')
        return reponse
    } catch(error) 
    {
        return error
    }
}
