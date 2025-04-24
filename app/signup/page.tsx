import { IoReturnUpBackSharp } from "react-icons/io5";

export default function Signup() {
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
                    <span className="font-epilogue text-4xl md:text-5xl font-medium">Create an Account</span>
                    <span className="font-inter text-sm md:text-base">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Log in
                        </a>
                    </span>
                </div>

                {/* Form Fields */}
                <form className="flex flex-col w-[60%] items-center mx-[auto] gap-7">
                    {/* Email */}
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col">
                            <label htmlFor="fn" className="mb-1 text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="fn"
                                id="fn"
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="ln" className="mb-1 text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="ln"
                                id="ln"
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                    </div>

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
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col mb-[1rem]">
                            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                                Re-type Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-[8rem] mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

        </main>
    )
}