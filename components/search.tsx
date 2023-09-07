"use client";

import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
const Search = () => {
  const [search, setSearch] = useState<String>("");
  const router = useRouter()
  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(search === "") return;
    router.push(`/SearchPage?for=${search}`)
  
  };
  return (
    <div className="flex relative ">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="h-10  bg-white/10  hover:transition-all focus:rounded-full
          duration:500 ease-in-out  placeholder-white/50 focus:outline-none 
          border-white/20 border-1 lt:px-10 px-9 l:px-24 t:px-[16.5rem] py-2 rounded-full  text-white 
          
          "
          placeholder="Search"
        />

        <button type="submit">
          <MagnifyingGlassCircleIcon className="h-10 w-10
          absolute top-0 right-1  text-center 
          text-white/50" />
        </button>
      </form>
    </div>
  );
};

export default Search;
