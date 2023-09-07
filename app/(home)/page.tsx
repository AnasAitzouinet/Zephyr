"use client";
import Loader from "@/components/Loader";
import Recent from "@/components/Recent/Recent";
import Link from "next/link";
import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const getData = async () => {
  const res = await fetch(`/home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 1,
    },
    // cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
type Data = {
  animelist: {
    animeId: string;
    episodeId: string;
    animeTitle: string;
    episodeNum: number;
    subOrDub: "SUB" | "DUB";
    animeImg: string;
    episodeUrl: string;
  }[];
};
const Page = () => {
  const [data, setData] = useState<Data | null>(null);

  const [refs] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
        mode: "free-snap",
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
        mode: "free-snap",
      },
      "(min-width: 1440px)": {

        slides: {
          perView: 5,
          spacing: 10,
        },
        mode: "free-snap",
      },
      "(min-width: 1920px)": {
        slides: {
          perView: 7,
          spacing: 10,
        },
        mode: "free-snap",
      },
      "(max-width: 767px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
        mode: "free-snap",
      },
    },
  });

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);
  if (!data) {
    return <Loader />;
  }
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight pl-10 md:pl-[12.5rem] pt-20 text-gray-100">
        Recent Release 
      </h2>

      <article ref={refs} className="keen-slider pl-4 md:pl-[9rem] lg:pl-[10.5rem] xl:pl-[12rem]">
        {data.animelist.map((anime) => (
          <Recent
            key={anime.episodeId}
            animeId={anime.animeId}
            episodeId={anime.episodeId}
            animeTitle={anime.animeTitle}
            episodeNum={anime.episodeNum}
            animeImg={anime.animeImg}
          />
        ))}
      </article>
    </section>
  );
};

export default Page;
