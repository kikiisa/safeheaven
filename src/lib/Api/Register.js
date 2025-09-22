import api from "../services"
export const register = (data) => {
    try {
        const reponse = api.post('register', data)
        return reponse
    } catch(error) {
        return error
    }
}