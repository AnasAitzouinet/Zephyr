import { NextRequest, NextResponse } from "next/server";

export async function GET(
  Request: NextRequest,
  { params }: { params: { animeId: string } }
) {
  const titleName = params.animeId;
  try {

    // search for the anime ID by title from the episode ID
    const res = await fetch(
      `${process.env.NEXT_API}/search?keyw=${titleName}&apiKey=${process.env.API_KEY}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP ${res.statusText}! status: ${res.status}`);
    }
    const searchRes = await res.json();
    let animeId ;
    if (searchRes.length === 0) {
      return NextResponse.json(
        { message: "No results found" },
        { status: 404 }
      );
    } else {
       animeId = searchRes[0].animeId;
    }
    // use the anime ID to get the anime details
    const response = await fetch(
      `${process.env.NEXT_API}/anime-details/${animeId}?apiKey=${process.env.API_KEY}`,
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

    // searching on the anime X with id from above to get the anime ID from ZoroAPI
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

    // searching on the anime X with id from above to get the anime Information from ZoroAPI
    const ep = await fetch(
      `${process.env.NEXT_API_ANI}/anime/zoro/info?id=${anime.id}`
    );
    const Epp = await ep.json();
    if (!ep.ok) {
      throw new Error(`HTTP error! status: ${ep.status}`);
    }
    // if the total episodes from ZoroAPI is equal to the total episodes from the anime details
    if (Epp.totalEpisodes == animelist.totalEpisodes) {
      const ListEp = Epp.episodes;
      return NextResponse.json({ animelist, ListEp });
    } else if (animelist) {
      return NextResponse.json({ animelist });
    } else {
      throw new Error(`No data found: ${ep.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
