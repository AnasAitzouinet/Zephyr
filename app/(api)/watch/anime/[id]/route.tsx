import { NextRequest, NextResponse } from "next/server";

export async function GET(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${process.env.NEXT_API}/vidcdn/watch/${params.id}?apiKey=${process.env.API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const animelist = await response.json();
      // console.log(animelist.Referer);
    return NextResponse.json(animelist.Referer);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
