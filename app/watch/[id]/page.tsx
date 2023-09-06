"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Info from "@/components/Info";
import Loader from "@/components/Loader";
const getReferrer = async ({ id }: { id: string }) => {
  const res = await fetch(`http://localhost:3000/watch/anime/${id}`, {
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

const Page = ({ params }: { params: { id: string } }) => {
  //  const animeId = useSearchParams().get("anime");
  const animeId = params.id.split("-episode")[0];
  const epiNum = params.id.split("-episode-")[1];
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    getReferrer({ id: params.id }).then((data) => {
      setData(data);
    });
  }, [params.id]);

  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
        <>
          <Info animeId={animeId} epiNum={epiNum} />
          <iframe
            src={data}
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
