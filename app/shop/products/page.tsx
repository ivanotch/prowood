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

            <div className="flex flex-col items-center mt-[3rem]">

                <div className="flex w-[90%] justify-between p-5 items-center">
                    <div className="flex flex-col">
                        <div className="font-bold text-[2rem] font-inter">
                            Products
                        </div>
                        <div>
                            Browse our latest products and find something you'll love.
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setFilter("")} className={`border-2 rounded-lg px-2 font-semibold ${filter === "" ? "bg-black text-white" : ""
                            }`}>All</button>
                        <button onClick={() => setFilter("Indoor Wood Plastic Composite")} className={`border-2 rounded-lg px-2 font-semibold ${filter === "Indoor Wood Plastic Composite" ? "bg-black text-white" : ""
                            }`}>Indoor WPC</button>
                        <button onClick={() => setFilter("Outdoor Wood Plastic Composite")} className={`border-2 rounded-lg px-2 font-semibold ${filter === "Outdoor Wood Plastic Composite" ? "bg-black text-white" : ""
                            }`}>Outdoor WPC</button>
                        <button onClick={() => setFilter("Indoor Columns Wood Plastic Composite")} className={`border-2 rounded-lg px-2 font-semibold ${filter === "Indoor Columns Wood Plastic Composite" ? "bg-black text-white" : ""
                            }`}>WPC Columns</button>
                        <button onClick={() => setFilter("Stone Plastic Composite")} className={`border-2 rounded-lg px-2 font-semibold ${filter === "Stone Plastic Composite" ? "bg-black text-white" : ""
                            }`}>SPC Flooring</button>
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

                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}