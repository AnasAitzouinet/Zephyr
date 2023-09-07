"use client";
import * as React from "react";
import Image from "next/image";
import Nav from "@/components/navbar/Nav";
import { NextUIProvider } from "@nextui-org/react";
import TrendingSlider from "@/components/Carousel/Carousel";
import Header from "@/components/header/Header";
import Popular from "@/components/Recent/Popular";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { TRENDING_SLIDER_NUMBERS } from "@/components/numbers";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      <Header />
      <section>
        <Suspense fallback={<Loader />}>
          <Popular />
          <NextUIProvider>{children}</NextUIProvider>
          <TrendingSlider TRENDING_SLIDER_NUMBERS={TRENDING_SLIDER_NUMBERS} />

        </Suspense>
      </section>
    </main>
  );
}
