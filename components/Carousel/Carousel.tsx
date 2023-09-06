"use client";
import React from "react";
import Image from "next/image";
const Carousel = () => {
  return (
    <div className="z-0 absolute top-0 left-0 right-0 w-full h-screen carousel overflow-x-hidden">
      <div className="carousel-item w-screen">
        <Image
          src="/bf.jpg"
          className="w-full object-cover h-full"
          width={1920}
          height={1080}
          alt="Tailwind CSS Carousel component"
        />
      </div>
    </div>
  );
};

export default Carousel;
