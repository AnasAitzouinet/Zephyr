"use client";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BASE_URL } from "@/constant";

const getAnime = async ({ animeId }: { animeId: string }) => {
  const res = await fetch(`${BASE_URL}/watch/anime/info/${animeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
type AnimeData = {
  animelist: {
    animeTitle: string;
    type: string;
    releasedDate: string;
    status: string;
    genres: string[];
    otherNames: string;
    synopsis: string;
    animeImg: string;
    totalEpisodes: string;
    episodesList: {
      episodeId: string;
      episodeNum: string;
      episodeUrl: string;
      isSubbed: boolean;
      isDubbed: boolean;
    }[];
  };
  ListEp: {
    number: number;
    title: string;
    isFiller: boolean;
  }[];
};

const Info = ({ animeId, epiNum }: { animeId: string; epiNum: String }) => {
  const [showMore, setShowMore] = useState(false);
  const toggleSynopsis = () => {
    setShowMore(!showMore);
  };

  const [anime, setAnime] = useState<AnimeData | null>(null);
  useEffect(() => {
    getAnime({ animeId }).then((data) => setAnime(data));
  }, [animeId]);
  useEffect(() => {
    if (!anime) {
      setAnime((prevAnime) => {
        if (prevAnime) {
          return {
            ...prevAnime,
            animelist: {
              ...prevAnime.animelist,
            },
            ListEp: [
              {
                number: 0,
                title: "",
                isFiller: false,
              },
            ],
          };
        } else {
          return prevAnime;
        }
      });
    }
  }, [anime]);

  const displaySynopsis = anime && anime.animelist &&
     (showMore
      ? anime.animelist.synopsis
      : anime.animelist.synopsis.substring(0, 100) + " ...")
    

  return (
    <>
      {anime ? (
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              <Link
                className="hover:text-gray-300"
                href={`/AnimeInfo/${animeId}`}
              >
                {anime.animelist.animeTitle}
              </Link>{" "}
              - <span className="text-lg text-gray-200">Episode {epiNum} </span>
            </h1>
            <span className="text-gray-300">
              Genre : {anime.animelist.genres.join(", ")}
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="
          py-2  border border-gray-200/20 rounded-xl flex justify-end px-5 mt-5 text-gray-300 hover:transition-all duration-500 ease-in-out backdrop-blur-2xl
          bg-white/10 
          text-center hover:text-gray-100 hover:bg-white/40
          "
                >
                  Episode List
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link href={`/AnimeInfo/${animeId}`}>
                      {anime.animelist.animeTitle}
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    Synopsis: {displaySynopsis}
                    {anime.animelist.synopsis.length > 100 && (
                      <a href="#" onClick={toggleSynopsis}>
                        {showMore ? (
                          <span className="text-blue-500"> Read Less</span>
                        ) : (
                          <span className="text-green-500"> Read More</span>
                        )}
                      </a>
                    )}
                  </SheetDescription>
                  <Separator className="w-1/2 mx-auto bg-white " />
                  <h2
                    className="
            py-5 text-white text-md font-medium
            "
                  >
                    Episode List:
                  </h2>
                  <ScrollArea className="h-[20rem] w-full border border-gray-200/20 rounded-xl py-2 px-5">
                    <div className="flex flex-col gap-5 py-5">
                      {anime.animelist.episodesList.map((episode) => (
                        <Link
                          key={episode.episodeId}
                          href={`/watch/${episode.episodeId}?anime=${animeId}`}
                          className={`text-gray-300 hover:transition-all duration-500 ease-in-out border py-2 rounded-xl backdrop-blur-2xl
                      bg-white/10 border-gray-200/20
                      text-center hover:text-gray-100 hover:bg-white/40
                      ${
                        episode.episodeNum === epiNum
                          ? "bg-blue-900 backdrop-blur-2xl text-gray-100 hover:bg-blue-800"
                          : ""
                      }
                      `}
                        >
                          {anime && episode.episodeNum && (
                            <>
                              Episode {episode.episodeNum}
                              {anime.ListEp &&
                                (anime.ListEp[Number(episode.episodeNum) - 1]
                                  ?.isFiller !== undefined ? (
                                  anime.ListEp[Number(episode.episodeNum) - 1]
                                    .isFiller ? (
                                    <span className="text-red-500">
                                      {" "}
                                      (Filler)
                                    </span>
                                  ) : (
                                    <span className="text-green-500">
                                      {" "}
                                      (Canon)
                                    </span>
                                  )
                                ) : (
                                  <span className="text-gray-500">
                                    {" "}
                                    (Status Unknown)
                                  </span>
                                ))}
                            </>
                          )}
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Info;
