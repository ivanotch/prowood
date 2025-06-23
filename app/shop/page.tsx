'use client'
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { RiArrowRightUpBoxFill } from "react-icons/ri";
import { LiaCopyrightSolid } from "react-icons/lia";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCartStore } from "@/stores/cartStores";
import RoomSimulator from "../components/configurator/Configurator";

export default function Home() {

    const setCart = useCartStore((state) => state.setCart);

    const [user, setUser] = useState<{ email: string, name: string } | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch('/api/user', {
                    method: 'GET',
                    credentials: "same-origin",
                })

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);

                    const cartRes = await fetch("/api/cart", {
                        method: "GET",
                        credentials: "same-origin",
                    })

                    if (cartRes.ok) {
                        const cartData = await cartRes.json();
                        // console.log(cartData)
                        setCart(cartData);
                    }
                } else {
                    setUser(null)
                }
            } catch (err) {
                console.error("error fetching user", err);
                setUser(null);
            }
        }

        checkUser();
    }, [])

    const handleLogout = async () => {
        const res = await fetch("/api/logout/", {
            method: 'POST',
        })

        if (res.ok) {
            window.location.href = '/shop';
        } else {
            console.error("logout failed")
        }
    }

    return (

        <div>
            <main>
                <div className="h-screen pt-[1rem]">
                    <div id="hero" className="rounded-lg pt-[1rem] relative w-full h-[100%] overflow-hidden">
                        <div id="hero-nav" className="flex justify-between h-[2rem] items-center">
                            <div className="flex text-white font-inter gap-6 ml-[1rem]">
                                <a href="/">HOME</a>
                            </div>

                            <div className="font-epilogue font-bold text-[#720D1C] text-[1.5rem]">
                                PROWOOD
                            </div>

                            <div className="flex text-white font-inter gap-6 mr-[1rem]">
                                <a href="/shop/products">Products</a>
                                {user &&
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar>
                                                <AvatarImage />
                                                <AvatarFallback className="text-black">
                                                    {user?.name?.split(" ").map(w => w[0]).join("").toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-50 text-center flex flex-col gap-3">
                                            <a href="/shop/myAccount" className="border-b-3 border-slate-400 p-1">My Account</a>
                                            <a href="/shop/cart" className="border-b-3 border-slate-400 p-1">View Cart</a>
                                            <a href="/shop/products" className="border-b-3 border-slate-400 p-1">Shop</a>
                                            <button onClick={handleLogout} className="rounded-md p-1 bg-red-800 font-bold text-white">Log out</button>
                                        </PopoverContent>
                                    </Popover>
                                }

                                {user === null &&
                                    <a
                                        href="/login"
                                        className="border-2 border-[#F7941D] text-[#F7941D] p-1 font-bold hover:bg-[#F7941D] hover:text-white transition-colors duration-200"
                                    >
                                        Login
                                    </a>
                                }

                            </div>
                        </div>

                        <div id="hero-description" className="top-[60%] right-[3%] absolute flex flex-col w-[50%] text-right p-[0.3rem] ">
                            <span className="font-epilogue font-[600] text-[3.5rem] tracking-widest text-[#8B0000]">TIMELESS BEAUTY, MODERN DURABILITY.</span>
                            <span className="font-inter mb-[0.7rem] text-[1.5rem]">Transform your space- Get in Touch!</span>
                            <div><a href="/shop/products" className="mt-[0.5rem] text-[1.3rem] border-2 border-main p-[0.3rem] font-bold text-main rounded-md" >Shop now <IoIosArrowRoundForward className="inline text-[1.5rem]" /></a></div>
                        </div>

                        <video
                            autoPlay
                            loop
                            muted
                            playsInline

                            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                        >
                            <source src="/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div id="bestseller-ad" className="h-[80vh] px-6 mb-[3rem] py-12 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-[2rem] mt-[1rem]">
                        <p className="text-3xl font-bold ml-4 text-[#720D1C]">Best Seller</p>
                        <a
                            href="/shop/products"
                            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-200 mr-4 flex items-center gap-1"
                        >
                            Explore the shop
                            <IoIosArrowRoundForward className="text-2xl" />
                        </a>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 w-[100%] gap-5">

                        <div
                            className="bg-gray-100 p-4 rounded-2xl mx-[auto] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <Image
                                src="/SPC-W.jpg"
                                alt="SPC Walnut"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <div className="mt-4 w-full text-center">
                                <p className="text-lg font-semibold">SPC Walnut</p>
                                <p className="text-gray-600 text-md mt-1">$99</p>
                                <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div
                            className="bg-gray-100 p-4 rounded-2xl mx-[auto] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <Image
                                src="/SPC-AG.jpg"
                                alt="SPC Ash Gray"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <div className="mt-4 w-full text-center">
                                <p className="text-lg font-semibold">SPC Ash Gray</p>
                                <p className="text-gray-600 text-md mt-1">$99</p>
                                <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div
                            className="bg-gray-100 p-4 rounded-2xl mx-[auto] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <Image
                                src="/SPC-O.jpg"
                                alt="SPC OAK"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <div className="mt-4 w-full text-center">
                                <p className="text-lg font-semibold">SPC OAK</p>
                                <p className="text-gray-600 text-md mt-1">$99</p>
                                <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 grid-flow-row-dense p-4 grid-rows-[minmax(0,_10rem)] mb-[3rem]">
                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden col-span-2 row-span-2">
                        <Image
                            src="/business-proj.jpg"
                            alt="Ad Background"
                            fill
                            className="object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Engineered for Elegance. Built for Life.
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/Ad.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ELEVATE YOUR HOME TO THE NEXT LEVEL
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/wall.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Eco-Friendly. Durable. Beautiful. That’s SPC & WPC Living.
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden col-span-2 row-span-2">
                        <Image src="/building.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Flawless Installation. Effortless Maintenance.
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden row-span-2">
                        <Image src="/business.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Next-Level Surfaces That Last a Lifetime.
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/livingroom.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Built to Endure. Designed to Impress.
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/livingroom4.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Luxury You Can Stand On — SPC Flooring.”
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/livingroom5.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            The Reliable Choice for Pros Who Know Quality.
                        </span>
                    </div>

                    <div className="text-center group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/office2.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute p-5 inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-[#720D1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Create Your Dream Space — Smarter, Stronger, Sleeker.
                        </span>
                    </div>
                </div>

                <div id="indoor-ad" className="h-[80vh] px-6 py-12 bg-white mb-[2rem]">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-[3rem]">
                        <p className="text-3xl font-bold ml-4 text-[#720D1C]">Indoor WPC</p>
                        <a
                            href="/shop/products"
                            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-200 mr-4 flex items-center gap-1"
                        >
                            Explore the shop
                            <IoIosArrowRoundForward className="text-2xl" />
                        </a>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 w-[100%] gap-5">

                        <div
                            className="bg-gray-100 p-2 rounded-2xl mx-[auto] w-[20rem] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <Image
                                src="/WPC-W.jpg"
                                alt="WPC Walnut"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <div className="mt-4 w-full text-center">
                                <p className="text-lg font-semibold">WPC Walnut</p>
                                <p className="text-gray-600 text-md mt-1">$99</p>
                                <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div
                            className="bg-gray-100 p-2 rounded-2xl mx-[auto] w-[20rem] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <Image
                                src="/WPC-EO.jpg"
                                alt="WPC EO"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <div className="mt-4 w-full text-center">
                                <p className="text-lg font-semibold">WPC European Oak</p>
                                <p className="text-gray-600 text-md mt-1">$99</p>
                                <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div
                            className="bg-gray-100 p-2 rounded-2xl mx-[auto] w-[20rem] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <Image
                                src="/WPC-DW.jpg"
                                alt="WPC Dark Walnut"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                            <div className="mt-4 w-full text-center">
                                <p className="text-lg font-semibold">WPC Dark Walnut</p>
                                <p className="text-gray-600 text-md mt-1">$99</p>
                                <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <RoomSimulator />
                </div>
                <div id="indoor-ad" className="relative mt-[1rem] min-h-[50vh] w-[95%] mx-[auto] mb-[3rem] rounded overflow-hidden bg-black">
                    <Image
                        src="/advertise.png"
                        alt="Ad Background"
                        fill
                        className="object-fill"
                    />
                </div>

                <div id="outdoor-ad" className="h-[80vh] px-6 py-12 bg-white mb-[3rem]">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-3xl font-bold ml-4 text-[#720D1C]">Outdoor WPC</p>
                        <a
                            href="/shop/products"
                            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-200 mr-4 flex items-center gap-1"
                        >
                            Explore the shop
                            <IoIosArrowRoundForward className="text-2xl" />
                        </a>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 w-[100%] gap-5">
                        
                            <div
                                className="mx-[auto] bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                            >
                                <Image
                                    src="/WPC-OUTDOOR-EP.jpg"
                                    alt="WPC-OUTDOOR European Pine"
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-cover"
                                />
                                <div className="mt-4 w-full text-center">
                                    <p className="text-lg font-semibold">WPC-OUTDOOR European Pine</p>
                                    <p className="text-gray-600 text-md mt-1">$99</p>
                                    <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            <div
                                className="mx-[auto] bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                            >
                                <Image
                                    src="/WPC-OUTDOOR-TEAK.jpg"
                                    alt="WPC-OUTDOOR TEAK"
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-cover"
                                />
                                <div className="mt-4 w-full text-center">
                                    <p className="text-lg font-semibold">WPC OUTDOOR TEAK</p>
                                    <p className="text-gray-600 text-md mt-1">$99</p>
                                    <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            <div
                                className="mx-[auto] bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                            >
                                <Image
                                    src="/WPC-OUTDOOR-GM.jpg"
                                    alt="WPC-OUTDOOR GOLDEN MAPLE"
                                    width={300}
                                    height={300}
                                    className="rounded-lg object-cover"
                                />
                                <div className="mt-4 w-full text-center">
                                    <p className="text-lg font-semibold">WPC OUTDOOR GOLDEN MAPLE</p>
                                    <p className="text-gray-600 text-md mt-1">$99</p>
                                    <button className="mt-4 w-full bg-main text-white py-2 rounded-lg hover:bg-transparent hover:text-main hover:border-2 hover:border-main transition-colors duration-200">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="h-[14rem] bg-[#1a1e25] pt-[1.5rem] text-[#868c96] w-[80%] mx-[auto] rounded-[30px] text-center">
                    <p className="text-white text-[2.5rem]">IS IT TIME TO ELEVATE YOUR HOME TO THE NEXT LEVEL?</p>
                    <p className="text-[1.4rem]">Let’s elevate your home—get in touch and discover how we can make it happen.</p>
                    <a href="https://www.facebook.com/prowoodph/" className="w-[11.5rem] mx-[auto] mt-[1rem] bg-[#720D1C] text-white rounded-[30px] p-[0.5rem] px-4 border-2 border-[#720D1C] flex items-center gap-2 transition-all duration-300 hover:bg-transparent hover:text-[#720D1C]">
                        Reach out now!
                        <RiArrowRightUpBoxFill className="text-[1.5rem] align-middle" />
                    </a>

                </div>


            </main>
            <footer className="mt-[7rem] pt-[3rem] h-[35vh] text-[#868c96] bg-[#1a1e25] flex flex-col justify-between">
                <div className="pl-[2.5rem] grid grid-cols-4">
                    <div className="col-span-2">
                        <hr className="border-t border-gray-300 my-4" />
                        <ul>
                            <li className="text-[2rem] text-[white] font-[700]">PROWOOD PH</li>
                            <li className="text-[1.1rem]">Quezon City, Philippines.</li>
                        </ul>
                    </div>
                    <div className="flex justify-around col-span-2">
                        <ul className="flex flex-col gap-3">
                            <li className="mb-[1rem]"><a href="">CONTACT</a></li>
                            <li className="text-white"><a href="https://www.facebook.com/prowoodph/">FACEBOOK</a></li>
                            <li className="text-white"><a href="">INSTAGRAM</a></li>
                            <li className="text-white"><a href="">EMAIL</a></li>
                        </ul>
                        <ul className="flex flex-col gap-3">
                            <li className="mb-[1rem]">APP</li>
                            <li className="text-white"><a href="">HOME</a></li>
                            <li className="text-white"><a href="">PRODUCTS</a></li>
                        </ul>
                        <ul className="mt-[3rem]">
                            <li className="text-white"><a href="">ABOUT US</a></li>
                        </ul>

                    </div>
                </div>
                <p className="mx-[auto] flex items-center gap-2 mb-[1rem]">Prowood PH. All rights reserved <LiaCopyrightSolid className="align-middle" /> 2025.</p>
            </footer>
        </div>
    );
}
