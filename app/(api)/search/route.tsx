import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest, Response: NextResponse) {
    const data = await Request.json();
    const res = await fetch(`${process.env.NEXT_API}/search?keyw=${data}&apiKey=${process.env.API_KEY}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error(`HTTP ${res.statusText}! status: ${res.status}`);
    }
    const searchRes = await res.json();
    return NextResponse.json({ searchRes , data});
}
