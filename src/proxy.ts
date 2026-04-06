import { NextRequest, NextResponse } from "next/server";

import { CONTENT_TYPE, HTTP_STATUS } from "@/constants/api";
import { GITHUB_PERSONAL_ACCESS_TOKEN } from "@/constants/env";
import { CONFIG, errorCard, THEME } from "@/lib/card";

export default function proxy(request: NextRequest) {
  // Sanity check for GitHub Personal Access Token.
  // Serving un-cached request without it is not possible.
  if (!GITHUB_PERSONAL_ACCESS_TOKEN) {
    console.error("'GITHUB_PERSONAL_ACCESS_TOKEN' is missing in .env file");

    const themeParam = request.nextUrl.searchParams.get("theme");
    const theme = THEME[themeParam as keyof typeof THEME] || THEME.default;
    const error =
      process.env.NODE_ENV === "development"
        ? "'GITHUB_PERSONAL_ACCESS_TOKEN' is missing in .env file"
        : "Internal server error. Please try again later. Create a GitHub issue if the problem persists.";
    return new NextResponse(errorCard(error, CONFIG.error, theme), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      headers: {
        "Content-Type": CONTENT_TYPE.SVG,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude static assets, image optimizations, and common image files (case-insensitive)
    "/((?!_next/static|_next/image|[^?]*\\.(?:[iI][cC][oO]|[sS][vV][gG]|[pP][nN][gG])$).*)",
  ],
};
