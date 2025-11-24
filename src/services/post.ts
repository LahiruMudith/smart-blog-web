import api from "./api.ts";


export const createPost = async (data:any) => {
    const response = await api.post("/post/create", data)
    return response.data
}

export const getAllPost = async (page:number, limit:number) => {
    const response = await api.get(`/post/?page=${page}&limit=${limit}`)
    return response.data
}

export const getMyPost = async (page:number, limit:number) => {
    const response = await api.get(`/post/?page=${page}&limit=${limit}`)
    return response.data
}

