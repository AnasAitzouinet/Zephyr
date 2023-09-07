/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
// Define the type for TRENDING_SLIDER_NUMBERS
type TrendingSliderNumbers = Record<number, string>;
// eslint-disable-next-line @next/next/no-img-element

interface TrendingSliderProps {
  TRENDING_SLIDER_NUMBERS: TrendingSliderNumbers;
}

const TrendingSlider: React.FC<TrendingSliderProps> = ({
  TRENDING_SLIDER_NUMBERS,
}) => {
  const [refs1] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 25,
        },
        mode: "free",
      },
      "(max-width: 767px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
        mode: "free",
      },
    },
   
  });
  return (
    <div ref={refs1} className="keen-slider py-10 mx-10" >
      {Object.keys(TRENDING_SLIDER_NUMBERS).map((key) => (
        <div
          key={key}
          style={{ maxWidth: 500, minWidth: 500 }}

          className="flex flex-row justify-end items-center  relative  keen-slider__slide"
        >
          <div
            style={{
              stroke: "white",
              strokeWidth: "1px",
              fill: "none",
            }}
            className={`h-60 top-0 left-0 w-60 py-10 -z-10 absolute`}
            dangerouslySetInnerHTML={{
              __html: TRENDING_SLIDER_NUMBERS[key as any],
            }}
          />
          <div>
            <img
              src="https://img.flawlessfiles.com/_r/300x400/100/63/09/6309f2fe5db6732e64e5571eff2266e6/6309f2fe5db6732e64e5571eff2266e6.jpg"
              width={1500}
              height={900}
              className="h-full w-full object-cover z-10 rounded-xl"
              alt="Picture of the author"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingSlider;
