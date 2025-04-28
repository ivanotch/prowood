'use client'
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


// prevent user from accessing login page if still logged in. ?
export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("api/auth/login/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) {
                const data = await res.json();
                console.log(data.error);
            } else {
                console.log('workingg');
                router.push('/shop/products');
            }
        } catch (error) {
            console.error("An unexpected error occurred haha:", error);
        }
    }

    return (
        <main className="flex h-[100vh] p-[1rem] ">
            <div className="w-[50%] bg-cover bg-center rounded-[20px]" style={{ backgroundImage: "url('/login.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <a href="/shop" className="bg-gray-400 rounded-[20px] text-[1rem] items-center flex w-[5.3rem] p-1 gap-2 m-[1rem]">
                    <IoReturnUpBackSharp className="" />  Return
                </a>
            </div>

            <div className="w-full md:w-1/2 my-[auto] flex flex-col gap-6 px-4 py-8">
                {/* Header Text */}
                <div className="flex flex-col text-center space-y-2 mb-[2rem]">
                    <span className="font-epilogue text-4xl md:text-5xl font-medium">Welcome Back!</span>
                    <span className="font-inter text-sm md:text-base">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </span>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLogin} className="flex flex-col w-[50%] items-center mx-[auto] gap-7">
                    {/* Email */}
                    <div className="flex flex-col w-full mb-[1rem]">
                        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-[8rem] mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Log in
                    </button>
                </form>
            </div>

        </main>
    )
}