import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/queries/search";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ products: [], colors: [] });
  }

  try {
    const results = await searchAll(q);
    return NextResponse.json({
      products: results.products,
      colors: results.colors,
    });
  } catch {
    return NextResponse.json({ products: [], colors: [] }, { status: 500 });
  }
}
