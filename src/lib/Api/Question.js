import api from "../services"

export const Question = async () => 
{
    const response = await api.get('question')
    return response
}


export const createReportQuestion = async (data) => {
    const response = await api.post("send-laporan",data)
    return response
}
