'use client'
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaOpencart } from "react-icons/fa6";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const leftside = useRef<HTMLDivElement>(null);
  const rightside = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftside.current || !rightside.current) return;

    const images = gsap.utils.toArray<HTMLDivElement>(".img");

    // Ensure all images except the first one are initially hidden below
    gsap.set(images.slice(1), { yPercent: 101 });

    // Create a GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftside.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: rightside.current,
      },
    });

    // Stagger animation for each image
    images.forEach((image, index) => {
      if (index === 0) return; // Skip first image since it's already visible

      tl.to(image, { yPercent: 0, duration: 1 }, `+=${index * 1.5}`);
    });



    if (!containerRef.current) return;

    let sections = gsap.utils.toArray<HTMLElement>("section");

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          const bgColor = section.dataset.bgcolor;
          gsap.to(containerRef.current, { backgroundColor: bgColor, duration: 1 });
        },
        onLeaveBack: () => {
          const prevSection = sections[i - 1] as HTMLElement;
          const prevBgColor = prevSection ? prevSection.dataset.bgcolor : "#fff";
          gsap.to(containerRef.current, { backgroundColor: prevBgColor, duration: 1 });
        },
      });
    });

    // if (!videoRef.current) return;

    // // Parallax effect for the video
    // gsap.to(videoRef.current, {
    //   yPercent: -30, // Adjust this value to control the parallax effect
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: videoRef.current,
    //     start: "bottom 50%", // Start animation when the top of the video hits the bottom of the viewport
    //     end: "bottom top", // End animation when the bottom of the video hits the top of the viewport
    //     scrub: true, // Smoothly ties the animation to the scroll position
    //   },
    // });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
    


  }, []);


  return (
    <div>
      <main>
      <div className="h-screen pt-[1.5rem]">  {/*ref={videoRef} */}
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


        <div id="scroll-image" ref={containerRef} className="rounded-b-md  flex">
          <div ref={leftside} id="left" className="w-[50%] ml-[auto]">
            <section data-bgcolor="#B57A76" className=" h-[100vh] flex flex-col text-left justify-center w-[49vh] mx-[auto]">
              <p className="text-[2.8rem] text-[#720D1C] font-medium font-epilogue">
                Modern Interior, High Class Durability
              </p>
              <p className="text-white text-[1.3rem] mt-[0.6rem] font-inter">
                A stylish neutral tone that complements any interior.
              </p>
              <button className="w-[9rem] text-[#720D1C] mt-[1rem] text-[1.3rem] border-2 p-[0.3rem] rounded-md" >Our Work <IoIosArrowRoundForward className="inline text-[1.5rem]" /></button>
            </section>
            <section data-bgcolor="#8C87F6" className="h-[100vh] flex flex-col text-left justify-center w-[49vh] mx-[auto]">
              <p className="text-[2.8rem] text-[#720D1C] font-medium font-epilogue">
                Elegant But Low Maintenance
              </p>
              <p className="text-[1.3rem] mt-[0.6rem] font-inter">
                Built to last with high moisture resistance and worry no more for termite problems!
              </p>
              <button className="w-[9rem] text-[#720D1C] mt-[1rem] text-[1.3rem] border-2 p-[0.3rem] rounded-md" >Our Work <IoIosArrowRoundForward className="inline text-[1.5rem]" /></button>
            </section>
            <section data-bgcolor="#F57CD3" className="h-[100vh] flex flex-col text-left justify-center w-[49vh] mx-[auto]">
              <p className="text-[2.8rem] text-[#720D1C] font-medium font-epilogue">
                Save Big on WPC Panels
              </p>
              <p className="text-[1.3rem] mt-[0.6rem] font-inter">
                Lightweight panels for a hassle-free upgrade.
              </p>
              <button className="w-[9rem] text-[#720D1C] mt-[1rem] text-[1.3rem] border-2 p-[0.3rem] rounded-md" >Our Work <IoIosArrowRoundForward className="inline text-[1.5rem]" /></button>
            </section>
          </div>

          <div ref={rightside} id="right" className="images w-[50%] mr-[auto] relative">
            <div id="main" className="h-[100vh] relative">
              <div className="h-[70vh] w-[70%] left-[11%] top-[13%] overflow-hidden relative">
                <div className="img w-[100%] h-[70vh] bg-gradient-to-br from-[#B57A76] to-[#4F3533] flex flex-col justify-center rounded-3xl absolute">
                  <div className="mx-[auto] w-[75%] h-[90%] shadow-2xl rounded-lg overflow-hidden">
                    <img className="h-full w-full object-cover" src="/room.jpg" alt="image 1" />
                  </div>
                </div>
                <div className="img w-[100%] h-[70vh] bg-gradient-to-br from-[#8C87F6] to-[#000745] flex flex-col justify-center rounded-3xl absolute">
                  <div className="mx-[auto] w-[75%] h-[90%] shadow-2xl rounded-lg overflow-hidden">
                    <img className="h-full w-full object-cover" src="/office2.jpg" alt="image 2" />
                  </div>
                </div>
                <div className="img w-[100%] h-[70vh] bg-gradient-to-br from-[#F57CD3] to-[#8B147F] flex flex-col justify-center rounded-3xl absolute">
                  <div className="mx-[auto] w-[75%] h-[90%] shadow-2xl rounded-lg overflow-hidden">
                    <img className="h-full w-full object-cover" src="/wall2.jpg" alt="image 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[100vh]"></div>

      </main>
      <footer></footer>
    </div>
  );
}
