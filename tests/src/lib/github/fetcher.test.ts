import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import { GitHubGraphQLError } from "@/lib/github/error";
import { fetchGitHubContributorData, fetchGitHubCreatorData } from "@/lib/github/fetcher";

describe("GitHub fetcher", () => {
  const originalFetch = globalThis.fetch;
  const originalConsoleInfo = console.info;

  beforeEach(() => {
    console.info = () => {};
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    console.info = originalConsoleInfo;
  });

  it("maps creator GraphQL response to creator stats", async () => {
    let capturedInit: RequestInit | undefined;

    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      capturedInit = init;
      return new Response(
        JSON.stringify({
          data: {
            user: {
              login: "alice",
              repositories: {
                nodes: [{ stargazerCount: 12, forkCount: 3 }],
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const result = await fetchGitHubCreatorData("alice");

    expect(result).toEqual({
      login: "alice",
      repositories: [{ stargazerCount: 12, forkCount: 3 }],
    });
    expect(capturedInit?.method).toBe("POST");
    expect(capturedInit?.body).toContain('"login":"alice"');
  });

  it("maps contributor stats and filters only completed issues in other repos", async () => {
    globalThis.fetch = (async () => {
      return new Response(
        JSON.stringify({
          data: {
            user: {
              login: "alice",
              contributionsCollection: {
                totalCommitContributions: 10,
                totalPullRequestContributions: 4,
                totalPullRequestReviewContributions: 6,
              },
              issues: {
                nodes: [
                  { stateReason: "COMPLETED", repository: { owner: { login: "alice" } } },
                  { stateReason: "COMPLETED", repository: { owner: { login: "bob" } } },
                  { stateReason: "COMPLETED", repository: {} },
                  { stateReason: "DUPLICATE", repository: { owner: { login: "bob" } } },
                ],
              },
              repositoryDiscussionComments: {
                totalCount: 8,
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const result = await fetchGitHubContributorData("alice");

    expect(result).toEqual({
      login: "alice",
      commits: 10,
      pullRequests: 4,
      reviews: 6,
      answers: 8,
      issues: 2,
    });
  });

  it("returns null when GitHub GraphQL reports NOT_FOUND", async () => {
    globalThis.fetch = (async () => {
      return new Response(
        JSON.stringify({
          data: { user: null },
          errors: [{ type: "NOT_FOUND" }],
        }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    const result = await fetchGitHubCreatorData("ghost");
    expect(result).toBeNull();
  });

  it("throws when GraphQL errors are present and not NOT_FOUND", async () => {
    globalThis.fetch = (async () => {
      return new Response(
        JSON.stringify({
          data: { user: null },
          errors: [{ type: "FORBIDDEN" }],
        }),
        { status: 200 },
      );
    }) as unknown as typeof fetch;

    expect(fetchGitHubCreatorData("alice")).rejects.toThrow("GraphQL Errors found in API response");
  });

  it("throws GitHubGraphQLError for non-OK API responses", async () => {
    globalThis.fetch = (async () => {
      return new Response("rate limited", {
        status: 429,
        statusText: "Too Many Requests",
      });
    }) as unknown as typeof fetch;

    expect(fetchGitHubCreatorData("alice")).rejects.toBeInstanceOf(GitHubGraphQLError);
    expect(fetchGitHubCreatorData("alice")).rejects.toMatchObject({
      status: 429,
      message: "GitHub GraphQL Error: Too Many Requests",
    });
  });
});
