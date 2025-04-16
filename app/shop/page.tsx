'use client'
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaOpencart } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import Image from 'next/image';

export default function Home() {
    return (
        <div>
            <main>
                <div className="h-screen pt-[1.5rem]">
                    <div id="hero" className="rounded-lg pt-[1rem] relative w-full h-[100%] overflow-hidden">
                        <div id="hero-nav" className="flex justify-between h-[2rem] items-center">
                            <div className="flex text-white font-inter gap-6 ml-[1rem]">
                                <a href="">SHOP</a>
                                <a href="">ABOUT US</a>
                            </div>

                            <div className="font-epilogue font-bold text-[#720D1C] text-[1.5rem]">
                                PROWOOD
                            </div>

                            <div className="flex text-white font-inter gap-6 mr-[1rem]">
                                <a href="">HOME</a>
                                <a href=""><FaOpencart className="font-extrabold text-[1.5rem]" /></a>
                            </div>
                        </div>

                        <div id="hero-description" className="top-[60%] right-[3%] absolute flex flex-col w-[45%] text-right p-[0.3rem] ">
                            <span className="font-epilogue font-medium text-[3.4rem] tracking-widest text-[#8B0000]">TIMELESS BEAUTY, MODERN DURABILITY.</span>
                            <span className="font-inter  text-[1.5rem]">Transform your space- Get in Touch!</span>
                            <div><button className="mt-[0.5rem] text-[1.3rem] border-2 p-[0.3rem] rounded-md" >Shop now <IoIosArrowRoundForward className="inline text-[1.5rem]" /></button></div>
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

                <div id="bestseller-ad" className="h-[80vh] px-6 py-12 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-3xl font-bold ml-4">Best Seller</p>
                        <a
                            href="#"
                            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-200 mr-4 flex items-center gap-1"
                        >
                            Explore the shop
                            <IoIosArrowRoundForward className="text-2xl" />
                        </a>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
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
                                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 grid-flow-row-dense p-4 grid-rows-[minmax(0,_10rem)]">
                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden col-span-2 row-span-2">
                        <Image
                            src="/business-proj.jpg"
                            alt="Ad Background"
                            fill
                            className="object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Engineered for Elegance. Built for Life.
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/Ad.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ELEVATE YOUR HOME TO THE NEXT LEVEL
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/wall.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Eco-Friendly. Durable. Beautiful. That’s SPC & WPC Living.
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden col-span-2 row-span-2">
                        <Image src="/building.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Flawless Installation. Effortless Maintenance.
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden row-span-2">
                        <Image src="/business.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Next-Level Surfaces That Last a Lifetime.
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/livingroom.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Built to Endure. Designed to Impress.
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/livingroom4.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Luxury You Can Stand On — SPC Flooring.”
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/livingroom5.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            The Reliable Choice for Pros Who Know Quality.
                        </span>
                    </div>

                    <div className="group relative w-full h-full min-h-[10rem] rounded overflow-hidden">
                        <Image src="/office2.jpg" alt="Ad Background" fill className="object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Create Your Dream Space — Smarter, Stronger, Sleeker.
                        </span>
                    </div>
                </div>

                <div id="indoor-ad" className="h-[80vh] px-6 py-12 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-3xl font-bold ml-4">Indoor WPC</p>
                        <a
                            href="#"
                            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-200 mr-4 flex items-center gap-1"
                        >
                            Explore the shop
                            <IoIosArrowRoundForward className="text-2xl" />
                        </a>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
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
                                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="indoor-ad" className="relative min-h-[50vh] w-[95%] mx-[auto] rounded overflow-hidden bg-black">
                    <Image
                        src="/advertise.png"
                        alt="Ad Background"
                        fill
                        className="object-fill"
                    />
                </div>

                <div id="outdoor-ad" className="h-[80vh] px-6 py-12 bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-3xl font-bold ml-4">Outdoor WPC</p>
                        <a
                            href="#"
                            className="text-lg text-blue-600 hover:text-blue-800 transition-all duration-200 mr-4 flex items-center gap-1"
                        >
                            Explore the shop
                            <IoIosArrowRoundForward className="text-2xl" />
                        </a>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
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
                                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>




            </main>
            <footer></footer>
        </div>
    );
}
