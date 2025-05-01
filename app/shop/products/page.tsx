'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import Nav from "@/app/components/nav/Nav";

export default function Products() {

    const [filter, setFilter] = useState("");
    interface Product {
        product_id: string;
        name: string;
        description: string;
        stock: number;
        pricePerUnit: string;
        productImage: string;
        category: string;

    }

    const [products, setProducts] = useState<{ products: Product[] }>({ products: [] })

    useEffect(() => {
        const handler = async () => {
            const response = await fetch(`/api/products?filter=${filter}`);

            if (!response.ok) {
                console.log("error");
                return;
            }

            const data = await response.json();
            setProducts(data)
            console.log(data)
        }

        handler();
    }, [filter])

    return (

        <main className="pt-[1rem] flex flex-col">
            <Nav />

            <div className="flex flex-col items-center mt-[5rem]">
                <div className="w-[50%] h-[3rem] rounded-[5px] bg-blue-300 mb-[2rem]">
                    <div className="w-full h-full flex justify-around items-center">
                        <button onClick={() => setFilter("")} className="font-[500] text-[1.2rem] p-[0.5rem] border-2">All</button>
                        <button onClick={() => setFilter("Indoor Wood Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem] border-2">Indoor WPC</button>
                        <button onClick={() => setFilter("Outdoor Wood Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem]">Outdoor WPC</button>
                        <button onClick={() => setFilter("Indoor Columns Wood Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem]">WPC Columns</button>
                        <button onClick={() => setFilter("Stone Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem]">SPC Flooring</button>
                    </div>
                </div>
                <div className="w-[90%] mx-[auto] grid grid-cols-1 sm:grid-cols-5 gap-6 mb-[4rem]">
                    {products?.products?.map((product, index) => (
                        <Link key={index} href={`/shop/products/${product.product_id}`} passHref>
                            <div className="h-[24rem] shadow-lg flex flex-col items-center p-3">
                                <Image src={product.productImage} alt="Product Image"
                                    width={300}
                                    height={300}
                                    className="w-full h-[300px] object-cover rounded"
                                />
                                <div className="w-[100%]">
                                    <div className="text-[1.1rem]">{product.name.length > 28 ? `${product.name.slice(0, 28)}...` : product.name}</div>
                                    <div className="text-main text-[1.2rem]"><span className="text-[1.3rem]">₱</span>{product.pricePerUnit}</div>
                                    {/* <div className="flex gap-2">
                                        <button className="p-1 w-[60%] text-white bg-main">Buy</button>
                                        <button className="p-1 w-[40%] border-2 text-subMain border-subMain">Add</button>
                                    </div> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}