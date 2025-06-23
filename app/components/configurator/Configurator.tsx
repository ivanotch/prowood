// app/page.tsx (Next.js 14 App Router)
"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

type ProductType = "Wood Panels" | "SPC Flooring";
type SeriesType = "Indoor" | "Outdoor";
type TextureMap = Record<string, string>;

const textureMap: TextureMap = {
  // Indoor
  "Walnut (Panel)": "/images/walnut_texture2.jfif",
  "European Oak": "/images/europeanoak_texture1.jpg",
  "Dark Walnut (Panel)": "/images/darkwalnut_texture2.jfif",
  "White Oak": "/images/whiteoak_texture2.jfif",

  // Outdoor
  "Teak (Brushed)": "/images/teak_texture1.jpg",
  "Golden Maple (Brushed)": "/images/goldenmaple_texture3.jfif",
  "European Teak (Brushed)": "/images/europeanteak_texture2.jfif",

  // Flooring
  "Stone Gray": "https://via.placeholder.com/400x400/888888/ffffff?text=Stone+Gray",
  "Dark Walnut (Flooring)": "https://via.placeholder.com/400x400/4B3621/ffffff?text=Dark+Walnut",
  Oak: "https://via.placeholder.com/400x400/D2B48C/000000?text=Oak",
  "Walnut (Flooring)": "https://via.placeholder.com/400x400/8B4513/ffffff?text=Walnut",
  "Ash Gray": "https://via.placeholder.com/400x400/B2BEB5/000000?text=Ash+Gray",
  Birch: "https://via.placeholder.com/400x400/FAF0E6/000000?text=Birch",
};

export default function RoomSimulator() {
  const [category, setCategory] = useState<ProductType | null>(null);
  const [series, setSeries] = useState<SeriesType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("Walnut (Panel)");
  const [background, setBackground] = useState("/images/rooms/room1.png");

  const showIndoor = series === "Indoor";
  const showOutdoor = series === "Outdoor";

  const handleProductClick = (name: string) => {
    setSelectedProduct(name);
  };

  const backgroundThumbs = showIndoor
    ? [1, 2, 3, 4, 5].map((n) => `/images/rooms/room${n}.png`)
    : [6, 7, 8, 9, 10].map((n) => `/images/rooms/room${n}.png`);

  return (
    <main className="h-screen flex flex-col font-sans">
      <div className="bg-white border-b px-10 py-4 text-2xl font-bold flex items-center">
        Pro<span className="text-red-800">wood</span> PH
      </div>

      <div className="flex flex-1">
        {/* Preview Area */}
        <div className="flex-grow flex justify-center items-center relative bg-gray-300 p-10">
          <div className="relative w-full max-w-5xl aspect-video rounded-lg shadow-lg overflow-hidden">
            {/* Overlay Shadow */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 to-black/25 pointer-events-none" />

            {/* Background Image */}
            <Image
              src={background}
              alt="Room Preview"
              fill
              className="object-contain z-20"
            />

            {/* Overlay Texture */}
            {selectedProduct && (
              <div
                className="absolute inset-0 z-10 opacity-85 pointer-events-none"
                style={{
                  backgroundImage: `url(${textureMap[selectedProduct]})`,
                  backgroundSize: "150px 1000px",
                  backgroundRepeat: "repeat",
                  backgroundPosition: "0 0",
                  filter: "blur(0.7px)",
                }}
              />
            )}

            {/* Background Selector */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 p-2 rounded-md flex gap-2 z-30 shadow">
              {backgroundThumbs.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="bg"
                  className={classNames(
                    "w-20 h-14 object-cover rounded cursor-pointer border-2",
                    background === src ? "border-red-800" : "border-transparent"
                  )}
                  onClick={() => setBackground(src)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[500px] p-8 bg-white border-l overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">1. Select Product Category</h3>
          <div className="space-y-2">
            {["Wood Panels"].map((name) => (
              <div
                key={name}
                className={classNames(
                  "border p-3 rounded cursor-pointer",
                  category === name ? "border-red-800 bg-purple-50" : "hover:bg-gray-100"
                )}
                onClick={() => {
                  setCategory(name as ProductType);
                  setSeries(null);
                  setSelectedProduct("Walnut (Panel)");
                }}
              >
                {name}
              </div>
            ))}
          </div>

          {category === "Wood Panels" && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">2. Choose Series</h3>
              <div className="space-y-2">
                {["Indoor", "Outdoor"].map((name) => (
                  <div
                    key={name}
                    className={classNames(
                      "border p-3 rounded cursor-pointer text-center font-semibold",
                      series === name ? "border-red-800 bg-purple-50" : "hover:bg-gray-100"
                    )}
                    onClick={() => {
                      setSeries(name as SeriesType);
                      setSelectedProduct("Walnut (Panel)");
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </>
          )}

          {series && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">3. Choose Type</h3>
              <div className="space-y-2">
                {(series === "Indoor"
                  ? ["Walnut (Panel)", "European Oak", "Dark Walnut (Panel)", "White Oak"]
                  : ["Teak (Brushed)", "Golden Maple (Brushed)", "European Teak (Brushed)"]
                ).map((name) => (
                  <div
                    key={name}
                    className={classNames(
                      "border p-3 rounded cursor-pointer",
                      selectedProduct === name ? "border-red-800 bg-purple-50" : "hover:bg-gray-100"
                    )}
                    onClick={() => handleProductClick(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </>
          )}

          {category === "SPC Flooring" && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">2. Choose Flooring Type</h3>
              <div className="space-y-2">
                {[
                  "Stone Gray",
                  "Dark Walnut (Flooring)",
                  "Oak",
                  "Walnut (Flooring)",
                  "Ash Gray",
                  "Birch",
                ].map((name) => (
                  <div
                    key={name}
                    className={classNames(
                      "border p-3 rounded cursor-pointer",
                      selectedProduct === name ? "border-red-800 bg-purple-50" : "hover:bg-gray-100"
                    )}
                    onClick={() => handleProductClick(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
