import { NextRequest, NextResponse } from "next/server";

import { CONTENT_TYPE, HEADER, HTTP_STATUS, QUERY_PARAM } from "@/constants/api";
import { KARMA_CARD_CACHE_SECONDS, STALE_WHILE_REVALIDATION_SECONDS } from "@/constants/env";
import {
  CONFIG,
  clientErrorCard,
  contributorKarmaCard,
  errorCard,
  gitHubErrorCard,
  notfoundErrorCard,
  THEME,
} from "@/lib/card";
import { fetchGitHubContributorData, GitHubGraphQLError, parseContributorKarma, requestSchema } from "@/lib/github";

// NOTE: Document the endpoint here as well for easier reference to the query parameters.
// Endpoint: /api/karma/contributor?username={username!}&theme={theme?}
export async function GET(request: NextRequest) {
  // Prepare render options with asset base URL for absolute image URLs in the SVG.
  const absoluteBaseUrl = request.nextUrl.origin;
  // Read the query parameters.
  const usernameQueryParam = request.nextUrl.searchParams.get(QUERY_PARAM.USERNAME);
  // zod.default() expects undefined, not null.
  const themeQueryParam = request.nextUrl.searchParams.get(QUERY_PARAM.THEME) ?? undefined;

  // Validate the username using the schema. If invalid, return a 400 response with an error card.
  const validationResult = requestSchema.safeParse({
    username: usernameQueryParam,
    theme: themeQueryParam,
  });

  if (!validationResult.success) {
    console.warn(validationResult.error.message);

    // Return the first validation failure message. Solving the first issue may resolve the rest as well.
    // Failure at this stage always results in usage of default theme.
    return new NextResponse(
      clientErrorCard(validationResult.error.issues[0].message, CONFIG.clientError, THEME.default, absoluteBaseUrl),
      {
        headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.SVG },
        status: HTTP_STATUS.BAD_REQUEST,
      },
    );
  }

  // Unpack the validated parameters.
  const { theme, username }: { theme: string; username: string } = validationResult.data;
  const selectedTheme = THEME[theme as keyof typeof THEME];
  try {
    const stats = await fetchGitHubContributorData(username);

    // Handle user not found case.
    // NOTE: Maybe caching this request for long is wasteful use of cache storage space?
    if (!stats) {
      return new NextResponse(
        notfoundErrorCard(`User "${username}" not found`, CONFIG.clientError, selectedTheme, absoluteBaseUrl),
        {
          headers: {
            [HEADER.CONTENT_TYPE]: CONTENT_TYPE.SVG,
            [HEADER.CACHE_CONTROL]: `public, s-maxage=${KARMA_CARD_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`,
          },
          status: HTTP_STATUS.NOT_FOUND,
        },
      );
    }

    // Prepare the karma card stats.
    const profile = parseContributorKarma(stats);
    return new NextResponse(contributorKarmaCard(profile, CONFIG.contributor, selectedTheme, absoluteBaseUrl), {
      headers: {
        [HEADER.CONTENT_TYPE]: CONTENT_TYPE.SVG,
        [HEADER.CACHE_CONTROL]: `public, s-maxage=${KARMA_CARD_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`,
      },
    });
  } catch (error) {
    console.error("Karma API error:", error);

    if (error instanceof GitHubGraphQLError) {
      const cacheControl =
        error.status === HTTP_STATUS.TOO_MANY_REQUESTS
          ? `public, s-maxage=${KARMA_CARD_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`
          : `public, s-maxage=${STALE_WHILE_REVALIDATION_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`;
      return new NextResponse(
        gitHubErrorCard(`GitHub API Error: ${error.message}`, CONFIG.error, selectedTheme, absoluteBaseUrl),
        {
          headers: {
            [HEADER.CONTENT_TYPE]: CONTENT_TYPE.SVG,
            [HEADER.CACHE_CONTROL]: cacheControl,
          },
          status: error.status,
        },
      );
    }

    let message = "Internal server error. Please try again later. Create a GitHub issue if the problem persists.";
    if (error instanceof Error) {
      message =
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error. Please try again later. Create a GitHub issue if the problem persists.";
    }

    return new NextResponse(errorCard(message, CONFIG.error, selectedTheme, absoluteBaseUrl), {
      headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.SVG },
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}
