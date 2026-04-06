import { describe, expect, it } from "bun:test";

import { ASSET_DATA_URI } from "@/lib/card/uri";
import { CONFIG, THEME } from "@/lib/card/constants";
import { clientErrorCard, creatorKarmaCard, errorCard, karmaCard } from "@/lib/card/card";

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

  it("renders ambient-gradient theme as an SVG linear gradient", () => {
    const svg = errorCard("gradient test", CONFIG.error, THEME["ambient-gradient"]);

    expect(svg).toContain("<linearGradient");
    expect(svg).toContain('gradientTransform="rotate(35)"');
    expect(svg).toContain('stop-color="#4158d0"');
    expect(svg).toContain('stop-color="#c850c0"');
    expect(svg).toContain('stop-color="#ffcc70"');
    expect(svg).toContain('fill="url(#bg-gradient-');
    expect(svg).not.toContain('fill="35,4158d0,c850c0,ffcc70"');
  });

  it("falls back to default border color when theme borderColor is missing", () => {
    const fallbackBorderColor = THEME.default.borderColor ?? THEME.default.bgColor;
    const svg = karmaCard(
      {
        title: "Karma",
        description: "desc",
        login: "alice",
        rank: "Code Lurker",
        rankDescription: "Getting started",
        rankLogoSrc: "/logos/github-karma-logo.png",
        rankProgress: 42,
        currentRankScore: 321,
        nextRankScore: 500,
      },
      CONFIG.creator,
      THEME.algolia,
    );

    expect(svg).toContain(`stroke="${fallbackBorderColor}"`);
    expect(svg).toContain(`stroke:${fallbackBorderColor};stroke-width:1;`);
    expect(svg).not.toContain('stroke="undefined"');
    expect(svg).not.toContain("stroke:undefined");
  });

  it("inlines emoji and creator rank logo png assets as data URIs", () => {
    const dottedFaceAsset = ASSET_DATA_URI["/emojis/dotted-line-face.png"];
    const errorLogoAsset = ASSET_DATA_URI["/logos/github-karma-err-logo.png"];
    const creatorRankLogoAsset = ASSET_DATA_URI["/logos/github-karma-rank-7-logo.png"];

    expect(dottedFaceAsset).toMatch(/^data:image\/png;base64,/);
    expect(errorLogoAsset).toMatch(/^data:image\/png;base64,/);
    expect(creatorRankLogoAsset).toMatch(/^data:image\/png;base64,/);

    const errorSvg = errorCard("asset-url-test", CONFIG.error, THEME.default);
    const creatorSvg = creatorKarmaCard(
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
          logoSrc: "/logos/github-karma-rank-7-logo.png",
          progressToNextRank: 42,
          remainingToNextRank: 2179,
        },
      },
      CONFIG.creator,
      THEME.default,
    );

    expect(errorSvg).toContain(`href="${dottedFaceAsset}"`);
    expect(errorSvg).toContain(`xlink:href="${dottedFaceAsset}"`);
    expect(errorSvg).toContain(`href="${errorLogoAsset}"`);
    expect(errorSvg).toContain(`xlink:href="${errorLogoAsset}"`);
    expect(errorSvg).not.toContain("/emojis/dotted-line-face.png");
    expect(errorSvg).not.toContain("/logos/github-karma-err-logo.png");

    // NOTE: Will need a better way to check the data URI is present and correct or not. Static string matching is not ideal.
    expect(creatorSvg).not.toContain("/logos/github-karma-rank-7-logo.png");
    expect(errorSvg).not.toContain('href="undefined"');
    expect(creatorSvg).not.toContain('href="undefined"');
  });
});
