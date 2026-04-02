import { afterAll, beforeEach, describe, expect, it, mock } from "bun:test";

import { CONTENT_TYPE, HEADER, HTTP_STATUS, QUERY_PARAM } from "@/constants/api";
import { KARMA_CARD_CACHE_SECONDS, STALE_WHILE_REVALIDATION_SECONDS } from "@/constants/env";

import type { NextRequest } from "next/server";

type CreatorStats = {
  login: string;
  repositories: Array<{ stargazerCount: number; forkCount: number }>;
};

type ValidationResult =
  | {
      success: true;
      data: { username: string; theme: string };
    }
  | {
      success: false;
      error: {
        message: string;
        issues: Array<{ message: string }>;
      };
    };

const CARD_CONFIG = {
  clientError: { width: 388, height: 175 },
  creator: { width: 388, height: 175 },
  error: { width: 388, height: 175 },
} as const;

const CARD_THEME = {
  default: { id: "default-theme" },
  night: { id: "night-theme" },
} as const;

const safeParseMock = mock(
  (): ValidationResult => ({
    success: true,
    data: { username: "alice", theme: "default" },
  }),
);

const fetchGitHubCreatorDataMock = mock(
  async (): Promise<CreatorStats | null> => ({
    login: "alice",
    repositories: [{ stargazerCount: 10, forkCount: 2 }],
  }),
);

const parseCreatorKarmaMock = mock(() => ({
  login: "alice",
  karma: 42,
  rank: {
    current: { title: "Localhost Lurker", description: "", logoSrc: "", minKarma: 0 },
    next: null,
    logoSrc: "",
    progressToNextRank: 100,
    remainingToNextRank: 0,
  },
}));

const clientErrorCardMock = mock((message: string) => `client-error:${message}`);
const creatorKarmaCardMock = mock((profile: { login: string }) => `creator-card:${profile.login}`);
const errorCardMock = mock((message: string) => `error-card:${message}`);
const gitHubErrorCardMock = mock((message: string) => `github-error:${message}`);
const notfoundErrorCardMock = mock((message: string) => `not-found:${message}`);

class MockGitHubGraphQLError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "GitHubGraphQLError";
  }
}

mock.module("@/lib/github", () => ({
  fetchGitHubCreatorData: fetchGitHubCreatorDataMock,
  GitHubGraphQLError: MockGitHubGraphQLError,
  parseCreatorKarma: parseCreatorKarmaMock,
  requestSchema: {
    safeParse: safeParseMock,
  },
}));

mock.module("@/lib/card", () => ({
  CONFIG: CARD_CONFIG,
  THEME: CARD_THEME,
  clientErrorCard: clientErrorCardMock,
  creatorKarmaCard: creatorKarmaCardMock,
  errorCard: errorCardMock,
  gitHubErrorCard: gitHubErrorCardMock,
  notfoundErrorCard: notfoundErrorCardMock,
}));

const routeModulePromise = import("@/app/api/karma/creator/route");
const originalNodeEnv = process.env.NODE_ENV;

function setNodeEnv(value: NodeJS.ProcessEnv["NODE_ENV"]) {
  Object.defineProperty(process.env, "NODE_ENV", {
    value,
    configurable: true,
    enumerable: true,
    writable: true,
  });
}

function createRequest(url: string): NextRequest {
  return { nextUrl: new URL(url) } as NextRequest;
}

describe("GET /api/karma/creator", () => {
  beforeEach(() => {
    mock.clearAllMocks();
    setNodeEnv("test");

    safeParseMock.mockReturnValue({
      success: true,
      data: { username: "alice", theme: "default" },
    });

    fetchGitHubCreatorDataMock.mockResolvedValue({
      login: "alice",
      repositories: [{ stargazerCount: 10, forkCount: 2 }],
    });

    parseCreatorKarmaMock.mockReturnValue({
      login: "alice",
      karma: 42,
      rank: {
        current: { title: "Localhost Lurker", description: "", logoSrc: "", minKarma: 0 },
        next: null,
        logoSrc: "",
        progressToNextRank: 100,
        remainingToNextRank: 0,
      },
    });

    clientErrorCardMock.mockImplementation((message: string) => `client-error:${message}`);
    creatorKarmaCardMock.mockImplementation((profile: { login: string }) => `creator-card:${profile.login}`);
    errorCardMock.mockImplementation((message: string) => `error-card:${message}`);
    gitHubErrorCardMock.mockImplementation((message: string) => `github-error:${message}`);
    notfoundErrorCardMock.mockImplementation((message: string) => `not-found:${message}`);
  });

  afterAll(() => {
    setNodeEnv(originalNodeEnv);
  });

  it("returns 400 with first validation error using default theme", async () => {
    safeParseMock.mockReturnValue({
      success: false,
      error: {
        message: "validation failed",
        issues: [{ message: "Username cannot be empty" }, { message: "ignored" }],
      },
    });

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username="));

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.headers.get(HEADER.CONTENT_TYPE)).toBe(CONTENT_TYPE.SVG);
    expect(await response.text()).toBe("client-error:Username cannot be empty");
    expect(clientErrorCardMock).toHaveBeenCalledWith(
      "Username cannot be empty",
      CARD_CONFIG.clientError,
      CARD_THEME.default,
    );
    expect(fetchGitHubCreatorDataMock).not.toHaveBeenCalled();
  });

  it("returns 200 with creator card and cache headers for valid users", async () => {
    safeParseMock.mockReturnValue({
      success: true,
      data: { username: "danish", theme: "night" },
    });

    fetchGitHubCreatorDataMock.mockResolvedValue({
      login: "danish",
      repositories: [{ stargazerCount: 1200, forkCount: 80 }],
    });

    parseCreatorKarmaMock.mockReturnValue({
      login: "danish",
      karma: 12345,
      rank: {
        current: { title: "Front-Page Creator", description: "", logoSrc: "", minKarma: 10_000 },
        next: null,
        logoSrc: "",
        progressToNextRank: 100,
        remainingToNextRank: 0,
      },
    });

    const { GET } = await routeModulePromise;
    const response = await GET(
      createRequest(`https://example.com/api/karma/creator?${QUERY_PARAM.USERNAME}=danish&${QUERY_PARAM.THEME}=night`),
    );

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.headers.get(HEADER.CONTENT_TYPE)).toBe(CONTENT_TYPE.SVG);
    expect(response.headers.get(HEADER.CACHE_CONTROL)).toBe(
      `public, s-maxage=${KARMA_CARD_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`,
    );
    expect(await response.text()).toBe("creator-card:danish");

    expect(fetchGitHubCreatorDataMock).toHaveBeenCalledWith("danish");
    expect(parseCreatorKarmaMock).toHaveBeenCalledWith({
      login: "danish",
      repositories: [{ stargazerCount: 1200, forkCount: 80 }],
    });
    expect(creatorKarmaCardMock).toHaveBeenCalledWith(
      {
        login: "danish",
        karma: 12345,
        rank: {
          current: { title: "Front-Page Creator", description: "", logoSrc: "", minKarma: 10_000 },
          next: null,
          logoSrc: "",
          progressToNextRank: 100,
          remainingToNextRank: 0,
        },
      },
      CARD_CONFIG.creator,
      CARD_THEME.night,
    );
  });

  it("returns 404 with not-found card when user does not exist", async () => {
    safeParseMock.mockReturnValue({
      success: true,
      data: { username: "ghost", theme: "default" },
    });

    fetchGitHubCreatorDataMock.mockResolvedValue(null);

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username=ghost"));

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.headers.get(HEADER.CONTENT_TYPE)).toBe(CONTENT_TYPE.SVG);
    expect(response.headers.get(HEADER.CACHE_CONTROL)).toBe(
      `public, s-maxage=${KARMA_CARD_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`,
    );
    expect(await response.text()).toBe('not-found:User "ghost" not found');
    expect(notfoundErrorCardMock).toHaveBeenCalledWith(
      'User "ghost" not found',
      CARD_CONFIG.clientError,
      CARD_THEME.default,
    );
    expect(parseCreatorKarmaMock).not.toHaveBeenCalled();
  });

  it("returns GitHub error card with long cache for 429", async () => {
    fetchGitHubCreatorDataMock.mockRejectedValue(
      new MockGitHubGraphQLError("Too Many Requests", HTTP_STATUS.TOO_MANY_REQUESTS),
    );

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username=alice"));

    expect(response.status).toBe(HTTP_STATUS.TOO_MANY_REQUESTS);
    expect(response.headers.get(HEADER.CONTENT_TYPE)).toBe(CONTENT_TYPE.SVG);
    expect(response.headers.get(HEADER.CACHE_CONTROL)).toBe(
      `public, s-maxage=${KARMA_CARD_CACHE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`,
    );
    expect(await response.text()).toBe("github-error:GitHub API Error: Too Many Requests");
    expect(gitHubErrorCardMock).toHaveBeenCalledWith(
      "GitHub API Error: Too Many Requests",
      CARD_CONFIG.error,
      CARD_THEME.default,
    );
  });

  it("returns GitHub error card with short cache for non-429 GitHub errors", async () => {
    fetchGitHubCreatorDataMock.mockRejectedValue(
      new MockGitHubGraphQLError("Upstream failure", HTTP_STATUS.INTERNAL_SERVER_ERROR),
    );

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username=alice"));

    expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(response.headers.get(HEADER.CACHE_CONTROL)).toBe(
      `public, s-maxage=${STALE_WHILE_REVALIDATION_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATION_SECONDS}`,
    );
    expect(await response.text()).toBe("github-error:GitHub API Error: Upstream failure");
  });

  it("returns generic internal-error card for thrown Error in production-like env", async () => {
    setNodeEnv("production");
    fetchGitHubCreatorDataMock.mockRejectedValue(new Error("sensitive details"));

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username=alice"));

    expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(response.headers.get(HEADER.CONTENT_TYPE)).toBe(CONTENT_TYPE.SVG);
    expect(await response.text()).toBe(
      "error-card:Internal server error. Please try again later. Create a GitHub issue if the problem persists.",
    );
  });

  it("returns actual error message in development for thrown Error", async () => {
    setNodeEnv("development");
    fetchGitHubCreatorDataMock.mockRejectedValue(new Error("boom"));

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username=alice"));

    expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(await response.text()).toBe("error-card:boom");
    expect(errorCardMock).toHaveBeenCalledWith("boom", CARD_CONFIG.error, CARD_THEME.default);
  });

  it("returns generic internal-error card when a non-Error value is thrown", async () => {
    fetchGitHubCreatorDataMock.mockRejectedValue("panic");

    const { GET } = await routeModulePromise;
    const response = await GET(createRequest("https://example.com/api/karma/creator?username=alice"));

    expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(await response.text()).toBe(
      "error-card:Internal server error. Please try again later. Create a GitHub issue if the problem persists.",
    );
  });
});
