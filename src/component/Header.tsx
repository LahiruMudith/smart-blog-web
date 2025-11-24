// Header.jsx
import {Link} from "react-router-dom";
import {UseAuth} from "../context/authContext.tsx";

export default function Header() {
    const {user} = UseAuth()
    console.log(user)

    const handelLogOut = ()=> {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
    }

    return (
        <header className="bg-blue-950 text-orange-50 flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-bold">Smart Blog</h2>

            <nav className="flex items-center gap-6">
                <div className="flex gap-4">
                    <Link to="/home" className="hover:text-orange-300 transition">Home</Link>
                    <Link to="/post" className="hover:text-orange-300 transition">Post</Link>
                    {(user.roles?.includes("ADMIN") || user.roles?.includes("AUTHOR")) &&(
                        <Link to="/my-post" className="hover:text-orange-300 transition">My Post</Link>
                    )}
                </div>

                <div>
                    <button
                        onClick={handelLogOut}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </header>

    );
}