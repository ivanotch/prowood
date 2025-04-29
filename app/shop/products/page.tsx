'use client'
import { FaOpencart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Image from 'next/image';

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
                <div className="w-[50%] h-[3rem] rounded-[5px] bg-blue-300 mb-[2rem]">
                    <div className="w-full h-full flex justify-around items-center">
                        <button onClick={() => setFilter("")} className="font-[500] text-[1.2rem] p-[0.5rem] border-2">All</button>
                        <button onClick={() => setFilter("Indoor Wood Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem] border-2">Indoor WPC</button>
                        <button onClick={() => setFilter("Outdoor Wood Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem]">Outdoor WPC</button>
                        <button onClick={() => setFilter("Indoor Columns Wood Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem]">WPC Columns</button>
                        <button onClick={() => setFilter("Stone Plastic Composite")} className="font-[500] text-[1.2rem] p-[0.5rem]">SPC Flooring</button>
                    </div>
                </div>
                <div className="w-[90%] mx-[auto] grid grid-cols-1 sm:grid-cols-5 gap-6">
                    {products?.products?.map((product, index) => (
                        <div key={index} className="shadow-lg flex flex-col items-center p-3">
                            <Image src={product.productImage} alt="Product Image"
                                width={300}
                                height={300}
                                className="w-full h-[300px] object-cover rounded"
                            />
                            <div className="w-[100%]">
                                <div>{product.name}</div>
                                <div>{product.pricePerUnit}</div>
                                <div className="flex gap-2">
                                    <button className="p-1 w-[60%] text-white bg-main">Buy</button>
                                    <button className="p-1 w-[40%] border-2 text-subMain border-subMain">Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}