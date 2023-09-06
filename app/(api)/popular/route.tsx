import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_API}/popular?apiKey=${process.env.API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1,
      },
    });
    if (!response.ok) {
      return NextResponse.json({ error: response.status }, { status: 501 });
    }
    const animelist = await response.json();
    return NextResponse.json({ animelist }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
