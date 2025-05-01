import { FaOpencart } from "react-icons/fa6";


export default function Nav() {
    return (
        <div id="hero-nav" className="flex justify-between h-[3.8rem] items-center bg-[#1a1e25]">
            <div className="flex text-white font-inter gap-6 ml-[1rem]">
                <a href="" className="text-[1.2rem]">HOME</a>
            </div>

            <div className="font-epilogue font-bold text-[#720D1C] text-[1.7rem]">
                PROWOOD
            </div>

            <div className="flex text-white font-inter gap-6 mr-[1rem]">
                <a href=""><FaOpencart className="font-extrabold text-[2rem]" /></a>
            </div>
        </div>
    )
}