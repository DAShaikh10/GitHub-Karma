import { describe, expect, it } from "bun:test";

import { parseContributorKarma, parseCreatorKarma } from "@/lib/github/karma";

describe("parseCreatorKarma", () => {
  it("returns the baseline rank and zero progress for empty repo impact", () => {
    const result = parseCreatorKarma({
      login: "alice",
      repositories: [{ stargazerCount: 0, forkCount: 0 }],
    });

    expect(result.login).toBe("alice");
    expect(result.karma).toBe(0);
    expect(result.rank.current.title).toBe("Localhost Lurker");
    expect(result.rank.next?.title).toBe("Casual Poster");
    expect(result.rank.progressToNextRank).toBe(0);
    expect(result.rank.remainingToNextRank).toBe(500);
  });

  it("reaches top rank and caps progress at 100 for very high-impact profiles", () => {
    const repositories = Array.from({ length: 5 }, () => ({
      stargazerCount: 1_000_000,
      forkCount: 0,
    }));

    const result = parseCreatorKarma({ login: "legend", repositories });

    expect(result.karma).toBeGreaterThanOrEqual(100_000);
    expect(result.rank.current.title).toBe("Open Source Legend");
    expect(result.rank.next).toBeNull();
    expect(result.rank.progressToNextRank).toBe(100);
    expect(result.rank.remainingToNextRank).toBe(0);
  });
});

describe("parseContributorKarma", () => {
  it("calculates weighted karma and rank progression for contributors", () => {
    const result = parseContributorKarma({
      login: "carol",
      commits: 450,
      reviews: 0,
      pullRequests: 0,
      issues: 0,
      answers: 0,
    });

    expect(result.karma).toBe(450);
    expect(result.rank.current.title).toBe("New Contributor");
    expect(result.rank.next?.title).toBe("Active Collaborator");
    expect(result.rank.progressToNextRank).toBe(12.5);
    expect(result.rank.remainingToNextRank).toBe(1050);
  });

  it("treats missing contributor stats as zero", () => {
    const result = parseContributorKarma({ login: "dave" } as never);

    expect(result.karma).toBe(0);
    expect(result.rank.current.title).toBe("Code Lurker");
  });
});
