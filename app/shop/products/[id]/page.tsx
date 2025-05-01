import Image from "next/image";
import prisma from "@/utils/prisma";
import Nav from "@/app/components/nav/Nav";
import QuantityButton from "../QuantityButton";


export default async function ProductDetails({ params }: { params: { id: String } }) {

    const product = await prisma.product.findUnique({
        where: { product_id: String(params.id) },
    });

    if (!product) return <div>Product not found.</div>;

    return (
        <div className="pt-[1rem]">
            <Nav />
            <div className="flex m-[2rem] bg-gray-200 rounded-md p-3">
                <div className="relative w-[40%] h-[40rem]">
                    <Image
                        src={product.productImage || "/placeholder.png"}
                        alt="Product Image"
                        fill
                        className="object-cover rounded"
                    />
                </div>
                <div className="w-[60%] pl-6 flex flex-col justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-2 mt-[3rem]">
                            <h1 className="text-4xl font-bold">{product.name}</h1>
                            <p className="text-xl">{product.category}</p>
                        </div>

                        <p className="mt-[1rem] text-[1.2rem]">{product.description}</p>

                    </div>

                    <div>
                        <QuantityButton product={product} />
                    </div>
                </div>
            </div>
        </div >
    );
}