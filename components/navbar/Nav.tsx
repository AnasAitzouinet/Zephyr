"use client";
import React from "react";
import Search from "../search";
import Link from "next/link";

const Nav = () => {
  return (
    <nav
      className="bg-transparent w-screen text-gray-100/90 z-10 absolute top-0 left-0 right-0
      grid grid-rows-1 justify-center items-center py-3 gap-2
      t:grid t:grid-cols-2  t:justify-between t:items-center 
      "
    >
      <div className="
      grid grid-rows-1 justify-center items-center
      ">
        <h1
          className="
      font-bold sm:text-2xl l:text-right
      uppercase text-gray-100
      "
        >
          Zephyr
        </h1>
        <ul
          className="hidden 
        lt:flex justify-center px-14 md:px-32 md:text-xl gap-8 font-bold uppercase"
        >
          <Link href={"/"}>
            <li
              className="
        hover:text-blue-950 hover:transition-all duration-500 ease-in-out
            
            "
            >
              home
            </li>
          </Link>
          <Link href={"/"}>
            <li
              className="
        hover:text-black hover:drop-shadow-md shadow-white hover:transition-all duration-500 ease-in-out
            
            "
            >
              Movies
            </li>
          </Link>
          <Link href={"/"}>
            <li
              className="
        hover:text-blue-950 hover:transition-all duration-500 ease-in-out
            
            "
            >
              home
            </li>
          </Link>
        </ul>
      </div>
      <div className="
      l:px-5 lt:pb-5
      ">
        <Search />
      </div>
    </nav>
  );
};

export default Nav;
