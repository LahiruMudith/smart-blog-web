import {UseAuth} from "../context/authContext.tsx";


export default function Home(){
    const { user } = UseAuth()
    console.log(user)
    console.log(user.email)

    return(
        <>
            <h1>{user.email}</h1>
        </>
    )
}