"use client";
import { Card, CardFooter, Image, Button, CardHeader } from "@nextui-org/react";
import Link from "next/link";

import React from "react";
interface RecentProps {
  animeId: string;
  animeTitle: string;
  episodeNum: number;
  animeImg: string;
  episodeId: string;
}
const Recent = ({animeId, animeTitle, episodeNum, animeImg, episodeId }: RecentProps) => {
  return (
    <Link href={`/watch/${episodeId}?anime=${animeId}`} className="keen-slider__slide -mr-8  flex flex-col justify-center items-center">
      <Card isFooterBlurred radius="lg" className=" bg-transparent h-[384px] w-[256px] ">
        <Image
          alt={animeTitle}
          className="object-cover h-[384px] w-[256px] hover:brightness-50 hover:transition-all hover:duration-500 hover:ease-in-out"
          height={400}
          src={animeImg}
          width={400}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="font-light text-white">Ep: {episodeNum} </p>
          <Button
            className="text-tiny text-white bg-black/20 hover:bg-black/50"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Watch Now
          </Button>
        </CardFooter>
      </Card>
      <h1 className="text-center text-lg text-gray-100">
        {animeTitle.length > 20 ? animeTitle.slice(0, 20) + "..." : animeTitle}
      </h1>
    </Link>
  );
};

export default Recent;
