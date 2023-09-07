"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowUturnLeftIcon,
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  HeartIcon,
  InboxIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const solutions = [
  {
    name: "Inbox",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Messaging",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: "Live Chat",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Knowledge Base",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
];
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Search from "../search";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "#" },
  { name: "Popular", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className="relative isolate overflow-hidden sm:h-screen       
      bg-gray-90"
      >
        <Image
          src="/bf.jpg"
          alt=""
          width={1366}
          height={603}
          className="absolute  -z-10 h-full lt:h-screen w-full 
          object-cover"
        />

        <div
          style={{
            background:
              "linear-gradient(0deg, rgb(8, 8, 8) 15%, transparent 100%)",
          }}
          className="px-6 lg:px-8 z-10 shadow-md"
        >
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

              {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a> */}
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
          <div className="mx-auto max-w-3xl py-32 sm:py-48 2xl:py-[23rem] ">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight uppercase text-white sm:text-6xl">
                Watch latest animes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Watch new episodes every week on Sunday. You can watch all the
                episodes on our website.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#recent"
                  className="bg-black/20 hover:bg-white/40 hover:transition-all 
                  duration:500 ease-in-out hover:text-black uppercase font-semibold
                  border-white/20 border-1 px-20 py-2 rounded-full  text-white"
                >
                  Watch Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
