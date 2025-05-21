
// import prisma from "@/utils/prisma"
// import CartTable from "./CartTable"
import getUserFromServer from '../../../utils/authServer'
import AvatarProfile from "@/app/components/avatar/Avatar"
import CartClient from "./CartClient";
// import { useCartStore } from "@/stores/cartStores";


export default async function Cart() {

    const user = await getUserFromServer();

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
                    {user != null && <AvatarProfile />}
                </div>
            </div>

            <CartClient/>

        </div>
    )
}