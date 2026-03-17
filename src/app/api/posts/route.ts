import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/queries/posts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawFirst = parseInt(searchParams.get("first") || "6", 10);
  const first = Number.isNaN(rawFirst) || rawFirst < 1 ? 6 : Math.min(rawFirst, 24);
  const after = searchParams.get("after") || undefined;
  const category = searchParams.get("category") || undefined;

  try {
    const data = await getPosts(first, after, category);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { nodes: [], pageInfo: { hasNextPage: false, endCursor: "" } },
      { status: 500 }
    );
  }
}
