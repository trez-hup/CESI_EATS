"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function SigninPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen pt-4 pb-20 px-4 bg-[var(--color-bg)]">
            <h1 className="text-center text-lg font-semibold text-black mb-6">Connexion</h1>

            <button className="w-full bg-gray-300 h-10 rounded-full flex items-center justify-center space-x-2 mb-4">
                <span className="text-sm text-black">Continue avec Google</span>
                <img src="/images/google.png" alt="Google" className="w-5 h-5" />
            </button>

            <div className="flex items-center mb-4">
                <hr className="flex-grow border-gray-400" />
                <span className="px-2 text-sm text-gray-500">ou</span>
                <hr className="flex-grow border-gray-400" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-gray-300 h-10 rounded-xl px-4 focus:outline-none"
                />
                <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mots de passe"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-gray-300 h-10 rounded-xl px-4 focus:outline-none"
                />

                <label className="flex items-center text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="mr-2"
                    />
                    Voir mot de passe
                </label>

                <button
                    type="submit"
                    className="w-full bg-[var(--color-primary)] text-black py-3 rounded-lg text-center text-lg font-medium mt-4"
                >
                    Connexion
                </button>

                <div className="text-center mt-2">
                    <Link href="/forgot-password" className="text-xs text-gray-500 underline">
                        Mot de passe oublié ?
                    </Link>
                </div>
            </form>
        </div>
    )
}