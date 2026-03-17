import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tag = body.tag as string;

    if (tag) {
      await revalidateTag(tag, "default");
      return NextResponse.json({ revalidated: true, tag });
    }

    // Revalidate all common tags
    for (const t of ["products", "posts", "colours", "homepage", "taxonomies"]) {
      await revalidateTag(t, "default");
    }
    return NextResponse.json({ revalidated: true, tag: "all" });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
