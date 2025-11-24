import axios, {type AxiosError} from "axios";
import {refreshTokens} from "./auth.ts";

const api = axios.create({
    baseURL: "http://smart-blog-be-fzj8.vercel.app/api/v1"
})

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"]

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

    if (token && !isPublic){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (err:AxiosError) => {
        const originalRequest:any = err.config

        const isPublic = PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url))

        if (err.response?.status === 401 && !isPublic && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshToken = localStorage.getItem("refreshToken")
                if (!refreshToken){
                    throw new Error("Refresh token not found")
                }
                const res = await refreshTokens(refreshToken)
                localStorage.setItem("token", res.accessToken)

                originalRequest.headers.Authorization = `Bearer ${res.accessToken}`
                return axios(originalRequest)
            }catch (e) {
                console.error(e)
                localStorage.removeItem("token")
                localStorage.removeItem("refreshToken")
                window.location.href = "/login"
            }
        }
        return Promise.reject(err)
    }
)
export default api

