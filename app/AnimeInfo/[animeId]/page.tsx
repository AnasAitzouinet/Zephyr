"use client";
import { useState, useEffect } from "react";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/constant";

const product = {
  name: "Everyday Ruck Snack",
  href: "#",
  price: "$220",
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
  imageAlt:
    "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  breadcrumbs: [
    { id: 1, name: "Travel", href: "#" },
    { id: 2, name: "Bags", href: "#" },
  ],
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};
const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const getAnime = async ({ animeId }: { animeId: string }) => {
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

export default function AnimeInfo({ params }: { params: { animeId: string } }) {
  const [showMore, setShowMore] = useState(false);
  const animeId = params.animeId;
  const toggleSynopsis = () => {
    setShowMore(!showMore);
  };

  const [anime, setAnime] = useState<AnimeData | null>(null);
  useEffect(() => {
    getAnime({ animeId }).then((data) => setAnime(data));
  }, [animeId]);
  if (!anime) {
    return <div>Loading...</div>;
  }

  const displaySynopsis = showMore
    ? anime.animelist.synopsis
    : anime.animelist.synopsis.substring(0, 150) + " ...";

  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {anime.animelist.genres.map((genre, genreIdx) => (
                <li key={genre}>
                  <div className="flex items-center text-sm">
                    <h2 className="font-medium text-gray-300  ">{genre}</h2>
                    {genreIdx !== anime.animelist.genres.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {anime.animelist.animeTitle}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              anime information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-200 sm:text-xl">
                Total Episodes : {anime.animelist.totalEpisodes}
              </p>
              {/* 
              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                </div>
              </div> */}
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-100">
                {displaySynopsis}
                {anime.animelist.synopsis.length > 100 && (
                  <a href="#" onClick={toggleSynopsis}>
                    {showMore ? (
                      <span className="text-blue-500"> Read Less</span>
                    ) : (
                      <span className="text-green-500"> Read More</span>
                    )}
                  </a>
                )}
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className={`h-5 w-5 flex-shrink-0
                ${anime.animelist.status === "Ongoing" ? "text-yellow-500" : ""}
                  ${
                    anime.animelist.status === "Completed"
                      ? "text-green-500"
                      : ""
                  }
                `}
                aria-hidden="true"
              />
              <p
                className={`ml-2 text-sm 
              ${anime.animelist.status === "Ongoing" ? "text-yellow-500" : ""}
              ${anime.animelist.status === "Completed" ? "text-green-500" : ""}
              `}
              >
                {anime.animelist.status}
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <Image
              src={anime.animelist.animeImg}
              alt={anime.animelist.otherNames}
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-center rounded-xl"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <div className="mt-10">
              <Link
                prefetch={false}
                href={`/watch/${anime.animelist.episodesList[anime.animelist.episodesList.length - 1].episodeId}?anime=${animeId}`}
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Watch Now
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
