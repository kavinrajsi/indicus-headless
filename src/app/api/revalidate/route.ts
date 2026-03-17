import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const path = body.path as string | undefined;

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    // Revalidate all main paths
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, path: "all" });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
