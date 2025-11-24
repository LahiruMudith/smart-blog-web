import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                    Welcome to Smart Blog
                </h1>
                <p className="text-gray-300 text-lg mb-12">
                    Share your thoughts, stories, and ideas with the world. Join our community of writers and readers today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-8 py-3 border-2 border-purple-500 text-purple-400 rounded-full font-medium hover:bg-purple-900/30 transition-colors"
                    >
                        Register
                    </button>
                </div>
                
                <div className="mt-16 text-gray-400 text-sm">
                    <p>Start your journey with us today and explore endless possibilities</p>
                </div>
            </div>
        </div>
    );
}

