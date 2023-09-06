import axios from "axios";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_API}/recent-release?apiKey=${process.env.API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next:{
        revalidate: 3600,
      },

    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const animelist = await response.json();
    //   console.log(animelist);
    return NextResponse.json({animelist});
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
