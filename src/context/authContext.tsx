import {createContext, useContext, useEffect, useState} from "react";
import {getMyDetails} from "../services/auth.ts";

const AuthContext = createContext<any>(null)

export const AuthProvider = ({children} : any) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token){
            getMyDetails().then((res => {
                setUser(res.data)
            })).catch((err) => {
                setUser(null)
                console.error(err)
            }).finally(() => {
                setLoading(false)
            })
        }else {
            setLoading(false)
        }
    },[])

    return<AuthContext.Provider value={{user, setUser, loading}}>
        {children}
    </AuthContext.Provider>
}

// {user, setUser}
export const UseAuth = () => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}