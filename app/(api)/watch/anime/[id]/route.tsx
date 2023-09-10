import { NextRequest, NextResponse } from "next/server";

export async function GET(
  Request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${process.env.NEXT_API_ANI}/meta/anilist/watch/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const animelist = await response.json();
      console.log(animelist);
    return NextResponse.json(animelist);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
