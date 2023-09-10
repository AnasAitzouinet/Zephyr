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
    alert("an error occured while fetching data")
  }
  return res.json();
};
type AnimeList = {
  animelist: {
    currentPage: number;
    hasNextPage: boolean;
    totalPages: number;
    totalResults: number;
    results: {
      id: string;
      malId: number;
      title: {
        romaji: string;
        english: string | null;
        native: string;
        userPreferred: string;
      };
      image: string;
      rating: number;
      color: string;
      episodeId: string;
      episodeTitle: string;
      episodeNumber: number;
      genres: string[];
      type: string;
    }[];
  };
};
const Page = () => {
  const [data, setData] = useState<AnimeList | null>(null);

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
          perView: 6,
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
        {data.animelist.results.map((anime) => (
          <Recent
            key={anime.episodeId}
            animeId={anime.id}
            episodeId={anime.episodeId}
            animeTitle={anime.title.userPreferred}
            episodeNum={anime.episodeNumber}
            animeImg={anime.image}
          />
        ))}
      </article>
    </section>
  );
};

export default Page;
