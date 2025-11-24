import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {lazy, type ReactNode, Suspense} from "react";
import {ThreeDot} from "react-loading-indicators";
import {UseAuth} from "../context/authContext.tsx";
import Layout from "../component/Layout.tsx";

type RequireAuthTypes = {children : ReactNode, roles?: string[]}

const RequireAuth = ( {children, roles} : RequireAuthTypes) => {
    const {user, loading} = UseAuth()

    if (loading){
        return <div  className="flex justify-center items-center w-full h-screen">
            <ThreeDot color="#32cd32" size="medium" text="" textColor=""/>
        </div>
    }

    if (!user){
        return <Navigate to="/login" replace={true}/>
    }
    if (roles && !roles.some((role) => user.roles?.includes(role))){
        return <div className={"text-center py-20"}>
            <h2 className={"text-xl font-bold mb-2"}>Access Denied</h2>
            <p>You do not have permission to view this page</p>
        </div>
    }

    return<>{children}</>
}

export default function Router() {

    const Home = lazy(() => import("../pages/Home"))
    const Login = lazy(() => import('../pages/Login'))
    const Welcome = lazy(() => import('../pages/Welcome'))
    const Register = lazy(() => import('../pages/Register'))
    const Post = lazy(() => import('../pages/Post'))
    const MyPost = lazy(() => import('../pages/MyPost.tsx'))

    return (
        <>
            <BrowserRouter>
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center w-full h-screen">
                            <ThreeDot color="#32cd32" size="medium" text="" textColor=""/>
                        </div>
                    }
                >
                    <Routes>
                        <Route>
                            <Route path="" element={<Welcome />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                             <Route element={
                                 <RequireAuth>
                                     <Layout/>
                                 </RequireAuth>
                             }>
                                 <Route path="/home" element={<Home/>} />
                                 <Route path="/post" element={<Post />} />

                                 <Route path="/my-post" element={<RequireAuth roles={["ADMIN"]}><MyPost/></RequireAuth>} />
                             </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

