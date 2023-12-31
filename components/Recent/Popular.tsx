"use client";
const categories = [
  {
    name: "New Arrivals",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg",
  },
  {
    name: "Productivity",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg",
  },
  {
    name: "Workspace",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg",
  },
  {
    name: "Accessories",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg",
  },
  {
    name: "Sale",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg",
  },
];
import { BASE_URL } from "@/constant";
import jwt from "jsonwebtoken";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

import Image from "next/image";
import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const getData = async () => {
  const res = await fetch(`/popular`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data , status: " + res.status);
  }
  return res.json();
};

type Data = {
  animelist: {
    animeId: string;
    animeTitle: string;
    animeImg: string;
  }[];
};

const Popular = () => {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 5,
        },
        mode: "free",
      },
      "(max-width: 767px)": {
        slides: {
          origin: "center",
          perView: 1,
          spacing: 0,
        },
        mode: "snap",
      },
    },
    mode: "free-snap",
    slides: {
      perView: 5,
      spacing: 15,
    },
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section
     
      className=" "
    >
      <div className="text-2xl font-bold tracking-tight pl-10 md:pl-[12.5rem] pt-20 text-gray-100">
        <h2
          id="category-heading"
          className="text-2xl font-bold tracking-tight text-gray-100"
        >
          Popular
        </h2>
      </div>
      <div
        
        ref={ref}
        className="keen-slider py-5 pl-10 md:pl-[12.5rem]"
      >
        {data.animelist.map((category) => (
          <a
            key={category.animeId}
            href={`/AnimeInfo/${category.animeId}`}
            className=" flex h-[384px] w-[256px] flex-col rounded-xl keen-slider__slide 
            hover:border-blue-800 hover:border-2 border-1 border-gray-300/20  transition duration-300 ease-in-out"
          >
            <span aria-hidden="true" className="absolute inset-0">
              <Image
                width={1000}
                height={1000}
                src={category.animeImg}
                alt=""
                className="h-full w-full object-cover object-center bg-gt"
              />
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
            />
            <span className="relative mt-auto text-center text-xl font-bold text-white">
              {category.animeTitle.length > 20
                ? category.animeTitle.slice(0, 20) + "..."
                : category.animeTitle}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Popular;
