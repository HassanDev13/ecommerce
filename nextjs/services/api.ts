import api from "./axios";


export const registerUser = async (userData: any) => {
    const { data } = await api.post('/register', userData);
    return data;
};