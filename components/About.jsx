"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { BsDashLg } from "react-icons/bs";
import slideOne from "@/assets/images/slide/slide-1.jpg";
import slideTwo from "@/assets/images/slide/slide-2.jpg";
import slideThree from "@/assets/images/slide/slide-3.jpg";

const About = () => {
  const slides = [{ url: slideOne }, { url: slideTwo }, { url: slideThree }];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(autoplay);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full h-[95vh] mt-16 rounded-md overflow-hidden group relative">
      <Image
        src={slides[currentIndex].url}
        className="w-full h-full bg-center bg-cover duration-500"
        alt=""
      />
      <div className="flex items-end justify-center absolute top-[110px] bottom-[100px] inset-x-[50px]">
        <div
          style={{ animation: "0.5s" }}
          className="w-auto text-center text-white p-5 border-t-[5px] border-t-main bg-[#1c1715b3] border-solid"
        >
          <h2 className="text-white text-[28px] font-bold mb-[30px]">
            <span>ENAMIKA</span>
          </h2>

          <p>WESTLANDS | FROM 15 M</p>
          <div className="text-center">
            <a
              href=""
              style={{ animation: "0.8s" }}
              className="font-bold text-sm tracking-[1px] inline-block rounded transition-[0.5s] leading-none text-white m-2.5 px-8 py-3 border-2 border-solid border-main hover:bg-main hover:text-white"
            >
              Details
            </a>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl  text-black cursor-pointer">
        <BsFillArrowLeftCircleFill
          className="text-main bg-black rounded-full"
          onClick={prevSlide}
          size={30}
        />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl  text-black cursor-pointer">
        <BsFillArrowRightCircleFill
          className="text-main bg-black rounded-full"
          onClick={nextSlide}
          size={30}
        />
      </div>
      <div
        style={{ translate: "-50%" }}
        className="absolute flex left-1/2 bottom-6"
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <BsDashLg className="w-10 h-10 text-white" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default About;
