import { NextRequest, NextResponse } from "next/server";

export async function GET(
  Request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API}/anime-details/${params.animeId}?apiKey=${process.env.API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const animelist = await response.json();
    const rep = await fetch(
      `${process.env.NEXT_API_ANI}/anime/zoro/${animelist.animeTitle}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!rep.ok) {
      throw new Error(`HTTP error! status: ${rep.status}`);
    }
    const data = await rep.json();
    const anime = data.results[0];
    const ep = await fetch(
      `${process.env.NEXT_API_ANI}/anime/zoro/info?id=${anime.id}`
    );
    const Epp = await ep.json();
    if (!ep.ok) {
      throw new Error(`HTTP error! status: ${ep.status}`);
    }
    if (Epp.totalEpisodes == animelist.totalEpisodes) {
      const ListEp = Epp.episodes;
      return NextResponse.json({ animelist, ListEp });
    } else {
      // throw new Error(`No data found: ${ep.status}`);
      return NextResponse.json({ animelist});

    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
