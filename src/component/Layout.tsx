import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

export default function Layout(){
    return(
        <div className={"min-h-screen flex flex-col bg-gray-100"}>
            <Header/>
            <main className={"flex-1"}>
                <Outlet/>
            </main>
        </div>
    )
}