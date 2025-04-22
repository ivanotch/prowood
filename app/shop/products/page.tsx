import { FaOpencart } from "react-icons/fa6";

export default function Products() {
    return (

        <main className="pt-[1rem] flex flex-col">
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

            <div className="flex flex-col items-center mt-[5rem]">
                <div className="w-[50%] h-[3rem] rounded-[5px] bg-blue-300">
                    <div className="w-full h-full flex justify-around items-center">
                        <button className="font-[500] text-[1.2rem] p-[0.5rem] border-2">Indoor WPC</button>
                        <button className="font-[500] text-[1.2rem] p-[0.5rem]">Outdoor WPC</button>
                        <button className="font-[500] text-[1.2rem] p-[0.5rem]">WPC Columns</button>
                        <button className="font-[500] text-[1.2rem] p-[0.5rem]">SPC Flooring</button>
                    </div>
                </div>
                <div>This is where the cards</div>
            </div>
        </main>
    )
}