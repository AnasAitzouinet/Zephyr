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
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <section
      aria-labelledby="category-heading"
      className="py-5 sm:py-10 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2
          id="category-heading"
          className="text-2xl font-bold tracking-tight text-gray-100"
        >
          Shop by Category
        </h2>
      </div>

      <div className="mt-4 flow-root ">
        <div className="-my-2">
          <div className="relative box-content h-80 overflow-x-auto py-5  xl:px-2">
            <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8  ">
              {data.animelist.map((category) => (
                <a
                  key={category.animeId}
                  href={`/AnimeInfo/${category.animeId}`	}
                  className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg 
                  border-1 border-gray-700 shadow-lg hover:shadow-2xl transition duration-300 ease-in-out
                  p-6 hover:scale-105  xl:w-auto"
                >
                  <span aria-hidden="true" className="absolute inset-0">
                    <Image
                      width={300}
                      height={400}
                      src={category.animeImg}
                      alt=""
                      className="h-full w-full object-cover object-center"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
