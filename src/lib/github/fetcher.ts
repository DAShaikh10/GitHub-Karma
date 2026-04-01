import { CONTENT_TYPE, HEADER, HTTP_METHOD } from "@/constants/api";
import {
  CACHE_REVALIDATE_SECONDS,
  GITHUB_GRAPHQL_API_URL,
  GITHUB_PERSONAL_ACCESS_TOKEN,
  GITHUB_RATELIMIT_HEADER,
  GITHUB_RATELIMIT_REMAINING_HEADER,
  GITHUB_RATELIMIT_RESET_HEADER,
} from "@/constants/env";

import { GitHubGraphQLError } from "./error";
import { CREATOR_KARMA_QUERY, CONTRIBUTOR_KARMA_QUERY } from "./queries";

import type {
  GitHubCreatorStats,
  GitHubContributorStats,
  GitHubGraphQLCreatorResponse,
  GitHubGraphQLContributorResponse,
  GitHubGraphQLResponse,
} from "./types";

export async function fetchGitHubCreatorData(username: string): Promise<null | GitHubCreatorStats> {
  const stats: null | GitHubGraphQLCreatorResponse = await fetchGitHubData(CREATOR_KARMA_QUERY, username);

  if (!stats) return null; // Currently, only possible when user is not found.
  return {
    login: stats.login,
    repositories: stats.repositories.nodes,
  };
}

export async function fetchGitHubContributorData(username: string): Promise<null | GitHubContributorStats> {
  const stats: null | GitHubGraphQLContributorResponse = await fetchGitHubData(CONTRIBUTOR_KARMA_QUERY, username);

  if (!stats) return null; // Currently, only possible when user is not found.
  return {
    login: stats.login,
    answers: stats.repositoryDiscussionComments.totalCount,
    commits: stats.contributionsCollection.totalCommitContributions,
    issues: stats.issues.nodes.filter(
      ({ repository, stateReason }) => repository.owner?.login !== username && stateReason === "COMPLETED",
    ).length,
    pullRequests: stats.contributionsCollection.totalPullRequestContributions,
    reviews: stats.contributionsCollection.totalPullRequestReviewContributions,
  };
}

// Main helper function to fetch data from GitHub GraphQL API with proper error handling and rate limit logging.
async function fetchGitHubData<T>(query: string, username: string) {
  let res: Response | undefined;
  try {
    res = await fetch(GITHUB_GRAPHQL_API_URL, {
      method: HTTP_METHOD.POST,
      headers: {
        Authorization: `bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
        [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON,
      },
      body: JSON.stringify({
        query: query,
        variables: { login: username },
      }),
      cache: "force-cache", // Strictly use caching to avoid GitHub rate limits.
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });

    if (!res.ok) throw new GitHubGraphQLError(`GitHub GraphQL Error: ${res.statusText}`, res.status);

    const json: GitHubGraphQLResponse<T> = await res.json();
    if (json.errors) {
      // GitHub returns OK response with type = "NOT_FOUND".
      // This is a bit hacky, but GitHub doesn't provide a consistent way to identify "User not found" case.
      // If we can't find a better way, we should check all errors in the array instead of just the first one.
      if (json.errors[0].type === "NOT_FOUND") return null;

      throw new Error("GraphQL Errors found in API response");
    }

    return json.data.user;
  } finally {
    // Log the current rate limit status for debugging and monitoring purposes.
    if (res) {
      console.info(
        `Rate Limit Stats.: ${res.headers.get(GITHUB_RATELIMIT_REMAINING_HEADER)}/` +
          `${res.headers.get(GITHUB_RATELIMIT_HEADER)}. Resets at: ${res.headers.get(GITHUB_RATELIMIT_RESET_HEADER)}`,
      );
    }
  }
}
