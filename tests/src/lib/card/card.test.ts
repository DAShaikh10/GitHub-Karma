import { describe, expect, it } from "bun:test";

import { clientErrorCard, creatorKarmaCard, errorCard, karmaCard } from "@/lib/card/card";
import { CONFIG, THEME } from "@/lib/card/constants";

describe("card rendering", () => {
  it("escapes XML-reserved characters in error card text", () => {
    const svg = errorCard("<foo & \"bar\" 'baz'>", CONFIG.error, THEME.default);

    expect(svg).toContain("&lt;foo &amp; &quot;bar&quot; &apos;baz&apos;&gt;");
    expect(svg).not.toContain('<desc id="descId"><foo');
  });

  it("limits wrapped error text to max lines and adds ellipsis on overflow", () => {
    const svg = clientErrorCard("verylongword ".repeat(50), CONFIG.clientError, THEME.default);
    const tspanCount = svg.match(/<tspan /g)?.length ?? 0;

    expect(tspanCount).toBeLessThanOrEqual(4);
    expect(svg).toContain("…");
  });

  it("clamps progress to 0 and 100 when rendering the progress ring", () => {
    const lowProgress = karmaCard(
      {
        title: "Karma",
        description: "desc",
        login: "alice",
        rank: "Code Lurker",
        rankDescription: "Getting started",
        rankLogoSrc: "/logos/github-karma-logo.png",
        rankProgress: -10,
        currentRankScore: 42,
        nextRankScore: 0,
      },
      CONFIG.creator,
      THEME.default,
    );

    const highProgress = karmaCard(
      {
        title: "Karma",
        description: "desc",
        login: "alice",
        rank: "Code Lurker",
        rankDescription: "Getting started",
        rankLogoSrc: "/logos/github-karma-logo.png",
        rankProgress: 150,
        currentRankScore: 42,
        nextRankScore: 0,
      },
      CONFIG.creator,
      THEME.default,
    );

    expect(lowProgress).toContain("stroke-dashoffset:263.894");
    expect(highProgress).toContain("stroke-dashoffset:0.000");
  });

  it("uses compact score formatting for large values and includes next-rank score", () => {
    const svg = karmaCard(
      {
        title: "Karma",
        description: "desc",
        login: "alice",
        rank: "Top Contributor",
        rankDescription: "Long description",
        rankLogoSrc: "/logos/github-karma-logo.png",
        rankProgress: 33,
        currentRankScore: 1200,
        nextRankScore: 5000,
      },
      CONFIG.creator,
      THEME.default,
    );

    expect(svg).toContain("1.2K / 5K");
    expect(svg).toMatch(/style="[^"]*\bcursor\s*:\s*pointer\b[^"]*"/);
  });

  it("renders creator card metadata from karma stats", () => {
    const svg = creatorKarmaCard(
      {
        login: "alice",
        karma: 321,
        rank: {
          current: {
            title: "Casual Poster",
            description: "You've made a few contributions!",
            logoSrc: "/logos/github-karma-logo.png",
            minKarma: 500,
          },
          next: {
            title: "Trending Dev",
            description: "You're making waves in the community!",
            logoSrc: "/logos/github-karma-rank-5-logo.png",
            minKarma: 2500,
          },
          logoSrc: "/logos/github-karma-logo.png",
          progressToNextRank: 42,
          remainingToNextRank: 2179,
        },
      },
      CONFIG.creator,
      THEME.default,
    );

    expect(svg).toContain("alice's GitHub Creator Karma");
    expect(svg).toContain("Casual Poster");
    expect(svg).toContain("321 / 2.5K");
  });
});
