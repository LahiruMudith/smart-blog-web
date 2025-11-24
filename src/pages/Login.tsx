import {useNavigate} from "react-router-dom";
import {type FormEvent, useState} from "react";
import {getMyDetails, login} from "../services/auth.ts";
import {UseAuth} from "../context/authContext.tsx";

export default function Login(){
    const navigate = useNavigate()

    const {setUser} = UseAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handelLogin = async (e:FormEvent) => {
        e.preventDefault()

        if (!email || !password){
            alert("Please fill all the fields")
            return
        }

        try{
            const res = await login(email, password)

            if (!res.token){
                alert("Login Fail")
                return
            }

            localStorage.setItem("token", res.token)
            localStorage.setItem("refreshToken", res.refreshToken)

            const userDetails = await getMyDetails()


            setUser(userDetails)

            alert(res.message)
            navigate("/home")
        }catch (e) {
            console.error(e)
        }
    }

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', width:"500px", gap:"10px"}}>
                <h1>Register as User or Author</h1>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handelLogin}>Login</button>
            </div>
        </>
    )
}

