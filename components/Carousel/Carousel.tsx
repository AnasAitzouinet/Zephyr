/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
// Define the type for TRENDING_SLIDER_NUMBERS
type TrendingSliderNumbers = Record<number, string>;
// eslint-disable-next-line @next/next/no-img-element
import { getTrending } from "@/lib/getTrending";
import Link from "next/link";

interface TrendingSliderProps {
  TRENDING_SLIDER_NUMBERS: TrendingSliderNumbers;
}

type trending = {
  rank: number;
  name: string;
  id: string;
  poster: string;
}[];
const TrendingSlider: React.FC<TrendingSliderProps> = ({
  TRENDING_SLIDER_NUMBERS,
}) => {
  const [refs1] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        mode: "free-snap",
        slides: {
          perView: 3,
          spacing: 0,
        },
      },
      "(min-width: 1440px)": {
        mode: "free-snap",
        slides: {
          perView: 4,
          spacing: 0,
        },
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

  const [data, setData] = React.useState<trending | null>(null);
  React.useEffect(() => {
    getTrending("trendingAnimes").then((data) => setData(data));
  }, []);
  if (!data) {
    return ;
  }
  return (
    <section className="">
      <h2 className="text-2xl pl-10 md:pl-[12.5rem] font-bold tracking-tight pt-20 text-gray-100">
        Trending
      </h2>
      <div
        ref={refs1}
        className="keen-slider py-10 pl-10 md:pl-[8rem] xl:pl-[12rem] "
      >
        {Object.keys(TRENDING_SLIDER_NUMBERS).map((key, idx) => (
          <div
            onClick={async () => {
              try {
                const res = await fetch(
                  `/trending/info?title=${data[idx].name}`
                );
                if (res.ok) {
                  const data = await res.json();
                  window.location.href = `/AnimeInfo/${data}`;
                } else {
                  // Handle non-ok responses here
                  console.error(`Fetch failed with status: ${res.status}`);
                }
              } catch (error) {
                console.error("Fetch error:", error);
              }
            }}
            key={key}
            style={{ maxWidth: 500, minWidth: 500 }}
            className="flex flex-row justify-center xl:justify-end items-center relative  keen-slider__slide cursor-pointer"
          >
            <div
              style={{
                stroke: "white",
                strokeWidth: "1px",
                fill: "none",
              }}
              className={`h-60 top-0 left-20 xl:left-8  w-60 py-10 -z-10 absolute `}
              dangerouslySetInnerHTML={{
                __html: TRENDING_SLIDER_NUMBERS[key as any],
              }}
            />

            <div key={data[idx].id}>
              <img
                src={data[idx].poster}
                width={1500}
                height={900}
                className="h-[400px] w-[266px] object-cover z-10 rounded-xl "
                alt="Picture of the author"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSlider;
