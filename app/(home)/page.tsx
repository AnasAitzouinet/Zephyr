"use client";
import Loader from "@/components/Loader";
import Recent from "@/components/Recent/Recent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constant";
const getData = async () => {
  const res = await fetch(`${BASE_URL}/home`, {
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
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);
  if (!data) {
    return <Loader />;
  }
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-100">
        Recent Release :
      </h2>

      <article className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
