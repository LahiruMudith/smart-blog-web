import {type FormEvent, useState} from "react";
import {register} from "../services/auth.ts";
import {useNavigate} from 'react-router-dom'

export default function Register(){
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("USER")

    const handelRegister = async (e: FormEvent) => {
        e.preventDefault()

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Please fill all the fields")
            return
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {
            const data = {
                firstname : firstName,
                lastname : lastName,
                email : email,
                password : password,
                role : role
            }
            const response = await register(data)
            console.log(response.data)

            alert(response.message)
            navigate("/login")

        }catch (err) {
            alert(err)
        }
    }

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', width:"500px", gap:"10px"}}>
                <h1>Register as User or Author</h1>
                <input type="text" placeholder="Frist Name" value={firstName} onChange={(e) => setFirstName((e.target.value))}/>
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName((e.target.value))}/>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="USER">User</option>
                    <option value="AUTHOR">Author</option>
                </select>
                <button onClick={handelRegister}>Register</button>
            </div>
        </>
    )
}

