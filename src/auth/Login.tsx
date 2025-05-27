import { useState } from 'react'
import {supabase} from "@/integrations/supabase/client.ts";
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) setError(error.message)
        else navigate('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Zakovat Platforma - Login</h2>
                {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 border rounded focus:outline-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 border rounded focus:outline-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
                    Login
                </button>
                <p className="mt-4 text-center text-sm">
                    Akkauntingiz yo‘qmi? <Link className="text-blue-600 underline" to="/signup">Ro‘yxatdan o‘tish</Link>
                </p>
            </form>
        </div>
    )
}
