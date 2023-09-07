"use client";
import { Fragment, useState , useEffect } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "#" },
  { name: "Popular", href: "#" },
];

const products1 = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "$13",
    description: "3 sizes available",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "$64",
    description: "Walnut",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Carry Pouch",
    href: "#",
    price: "$32",
    description: "Heather Gray",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
  // More products...
];
const products2 = [
  {
    id: 7,
    name: "Electric Kettle",
    href: "#",
    price: "$149",
    description: "Black",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg",
    imageAlt:
      "Close up of long kettle spout pouring boiling water into pour-over coffee mug with frothy coffee.",
  },
  {
    id: 8,
    name: "Leather Workspace Pad",
    href: "#",
    price: "$165",
    description: "Black",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-08.jpg",
    imageAlt:
      "Extra large black leather workspace pad on desk with computer, wooden shelf, desk organizer, and computer peripherals.",
  },
  {
    id: 9,
    name: "Leather Long Wallet",
    href: "#",
    price: "$118",
    description: "Natural",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-09.jpg",
    imageAlt:
      "Leather long wallet held open with hand-stitched card dividers, full-length bill pocket, and simple tab closure.",
  },
  // More products...
];

type SearchProps = {
  searchRes: {
    animeId: string;
    animeTitle: string;
    animeImg: string;
    statue: string;
  }[];
}

const getSearch = async (search: string | null) => {
  const res = await fetch(`/search?for=${search}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.statusText}! status: ${res.status}`);
  }
  const searchRes = await res.json();
  return searchRes;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const searched = searchParams.get("for");
  const [data, setData] = useState<SearchProps | null>(null);
  useEffect(() => {
    getSearch(searched).then((res) => setData(res));
  }, [searched]);
  if(!data) return (<Loader />)
  return (
    <div className="">
      <div className="px-6 lg:px-8 z-10 shadow-md">
        <nav
          className="flex items-center justify-between pt-6 "
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto sm:pb-5 text-center sm:h-12"
                src="/lg.svg"
                alt="Workflow"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-bold leading-6 text-white hover:text-gray-300 hover:transition-all duration-500 ease-in-out"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Search />
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 px-6 py-6 lg:hidden">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                <img
                className="h-8 w-auto sm:pb-5 text-center sm:h-12"
                src="/lg.svg"
                alt="Workflow"
              />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <Search />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
      </div>
      <div>
        <main>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-24 text-center">
              <h1 className="text-4xl  tracking-tight text-white">
                Searched for : <span className="font-bold">{searched}</span>
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-base uppercase text-gray-200">
                thats what we found for you !
              </p>
            </div>

            <section
              aria-labelledby="filter-heading"
              className="border-t border-gray-300/30 pt-6"
            ></section>

            <section aria-labelledby="products-heading" className="mt-8">
              <h2 id="products-heading" className="sr-only">
                Animes - Movies
              </h2>

              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {data?.searchRes.map((product) => (
                  <a key={product.animeId} href={`/AnimeInfo/${product.animeId}`} className="group">
                    <div
                      className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-2xl sm:aspect-w-2 shadow-lg shadow-gray-700/30
                    border-gray-300/30 border
                    sm:aspect-h-3"
                    >
                      <img
                        src={product.animeImg}
                        alt={product.animeTitle}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-center text-base font-medium text-white">
                      <h3>{product.animeTitle}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
