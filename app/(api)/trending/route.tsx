import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const res = await fetch("http://localhost:4000/anime/home", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  switch (type) {
    case "spotlightAnimes":
        return NextResponse.json(data.spotlightAnimes);
    case "trendingAnimes":
        return NextResponse.json(data.trendingAnimes);
    case "topUpcomingAnimes":
        return NextResponse.json(data.topUpcomingAnimes);
  }
}
