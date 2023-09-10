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
import Loader from "./Loader";

const getAnime = async ({ animeId }: { animeId: string | null }) => {
  const res = await fetch(`/watch/anime/info/${animeId}`, {
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
type AnimeInfo = {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  malId: number;
  synonyms: string[];
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  popularity: number;
  cover: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  nextAiringEpisode: {
    airingTime: number;
    timeUntilAiring: number;
    episode: number;
  };
  totalEpisodes: number;
  currentEpisode: number;
  rating: number;
  duration: number;
  genres: string[];
  season: string;
  studios: string[];
  subOrDub: string;
  type: string;
  recommendations: {
    id: number;
    malId: number;
    title: {
      romaji: string;
      english: string;
      native: string;
      userPreferred: string;
    };
    status: string;
    episodes: number;
    image: string;
    cover: string;
    rating: number;
    type: string;
  }[];
  characters: {
    id: number;
    role: string;
    name: {
      first: string;
      last: string | null;
      full: string;
      native: string;
      userPreferred: string;
    };
    image: string;
    voiceActors: {
      id: number;
      language: string;
      name: {
        first: string;
        last: string;
        full: string;
        native: string;
        userPreferred: string;
      };
      image: string;
    }[];
  }[];
  relations: {
    id: number;
    relationType: string;
    malId: number;
    title: {
      romaji: string;
      english: string;
      native: string;
      userPreferred: string;
    };
    status: string;
    episodes: number | null;
    image: string;
    color: string;
    type: string;
    cover: string;
    rating: number;
  }[];
  mappings: {
    mal: number;
    anidb: number;
    kitsu: number;
    anilist: number;
    thetvdb: number;
    anisearch: number;
    livechart: number;
    "notify.moe": string;
    "anime-planet": string;
  };
  episodes: {
    id: string;
    title: string;
    description: string;
    number: number;
    image: string;
    airDate: string;
  }[];
};

const Info = ({
  animeId,
  epiNum,
  episodeNumber,
}: {
  animeId: string | null;
  epiNum: String;
  episodeNumber: string | null;
}) => {
  const [showMore, setShowMore] = useState(false);
  const toggleSynopsis = () => {
    setShowMore(!showMore);
  };
  console.log(episodeNumber);
  const [anime, setAnime] = useState<AnimeInfo | null>(null);
  useEffect(() => {
    getAnime({ animeId }).then((data) => setAnime(data));
  }, [animeId]);
  if (!anime) {
    return <Loader />;
  }

  const displaySynopsis = showMore
    ? anime.description
    : anime.description.substring(0, 100) + " ...";

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
                {anime.title.romaji}
              </Link>{" "}
              -{" "}
              <span className="text-lg text-gray-200">
                Episode {episodeNumber}
              </span>
            </h1>
            <span className="text-gray-300">
              Genre : {anime.genres.join(", ")}
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
                      {anime.title.romaji}
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    Synopsis: {displaySynopsis}
                    {anime.description.length > 100 && (
                      <a href="#" onClick={toggleSynopsis}>
                        {showMore ? (
                          <span className="text-blue-500"> Read Less</span>
                        ) : (
                          <span className="text-blue-500"> Read More</span>
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
                      {anime.episodes.map((episode) => (
                        <Link
                          key={episode.id}
                          href={`/watch/${episode.id}?anime=${animeId}&episodeNumber=${episode.number}`}
                          className={`text-gray-300 hover:transition-all duration-500 ease-in-out border py-2 rounded-xl backdrop-blur-2xl
                      bg-white/10 border-gray-200/20
                      text-center hover:text-gray-100 hover:bg-white/40
                      ${
                        episode.id === epiNum &&
                        "bg-blue-900 backdrop-blur-2xl text-gray-100 hover:bg-blue-800"
                      }
                      `}
                        >
                          Episode {episode.number}
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
