"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Info from "@/components/Info";
import Loader from "@/components/Loader";
import { BASE_URL } from "@/constant";
const getReferrer = async ({ id }: { id: string }) => {
  const res = await fetch(`/watch/anime/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 1000,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
type AnimeData = {
  headers: {
    Referer: string;
  };
};

const Page = ({ params }: { params: { id: string } }) => {
  const animeId = useSearchParams().get("animeID");
  const episodeNumber = useSearchParams().get("episodeNumber");
  const [data, setData] = useState<AnimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getReferrer({ id: params.id }).then((data) => {
      setData(data);
    });
  }, [params.id]);
  if (!data) {
    return <Loader />;
  }
  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
        <>
          <Info animeId={animeId} epiNum={params.id}  episodeNumber={episodeNumber}/>
          <iframe
            src={data.headers.Referer}
            width="100%"
            loading="eager"
            height="100%"
            allowFullScreen
          />
        </>
      )}
    </>
  );
};

export default Page;
