import CartTable from "./CartTable"


export default function Cart() {
    

    return (
        <div className="pt-[1rem]">
            <div id="hero-nav" className="flex justify-between h-[3.8rem] rounded-md items-center bg-[#1a1e25]">
                <div className="flex text-white font-inter gap-6 ml-[1rem]">
                    <a href="/shop" className="text-[1.2rem]">HOME</a>
                </div>

                <div className="font-epilogue font-bold text-[#720D1C] text-[1.7rem]">
                    PROWOOD
                </div>

                <div className="flex text-white font-inter gap-6 mr-[1rem]">
                    Avatar
                </div>
            </div>

            <div className="mt-[1rem] w-[90%] mx-[auto] border border-gray-400 rounded-md p-5">
                <div className="mb-[2rem]">
                    <p className="text-[1.4rem] font-bold">Start Upgrading Your Home!</p>
                    <p className="text-[1.1rem]">Here's your cart list.</p>
                </div>
                <CartTable />
            </div>
        </div>
    )
}