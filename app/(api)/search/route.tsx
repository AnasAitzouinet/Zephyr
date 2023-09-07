import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animeName = searchParams.get("for");
  const res = await fetch(
    `${process.env.NEXT_API}/search?keyw=${animeName}&apiKey=${process.env.API_KEY}`,
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
  return NextResponse.json({ searchRes });
}
