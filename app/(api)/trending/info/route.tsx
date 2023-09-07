import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const animeName = searchParams.get("title");
    const res = await fetch(`${process.env.NEXT_API}/search?keyw=${animeName}&apiKey=${process.env.API_KEY}`, {
        method: "get",
        
    });
    if (!res.ok) {
        throw new Error(`HTTP ${res.statusText}! status: ${res.status}`);
    }

    const searchRes = await res.json();
    if(searchRes.length === 0){
        return NextResponse.json({ message: "No results found"}, { status: 404 });
    }else{
        const animeId= searchRes[0].animeId;
        // return NextResponse.json(animeId)
        return NextResponse.redirect(`/AnimeInfo/${animeId}`);
    }
}