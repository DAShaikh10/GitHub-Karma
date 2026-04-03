import type { KarmaStats } from "@/lib/github";

import type { Config, KarmaCardInput, Theme } from "./types";

export function clientErrorCard(message: string, config: Config, theme: Theme) {
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${theme.bgColor}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - Client Error</title>
    <desc id="descId">${escapedText}</desc>

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${theme.bgColor}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${theme.borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="16" y="30">Validation failed</text>
    <image
      href="/rolling-eyes-face.png"
      xlink:href="/rolling-eyes-face.png"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="142"
      y="12"/>
    <text class="text" x="16" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-err-logo.png", "", 34, 340, 128)}

  </svg>`;
}

export function contributorKarmaCard(stats: KarmaStats, config: Config, theme: Theme) {
  return karmaCard(
    {
      currentRankScore: stats.karma,
      description:
        `Contributor karma card. Rank ${stats.rank.current.title}. ${stats.rank.current.description}. ` +
        `Progress ${stats.rank.progressToNextRank} percent. Score ${stats.karma}.`,
      nextRankScore: stats.rank.next?.minKarma ?? 0,
      rank: stats.rank.current.title,
      rankDescription: stats.rank.current.description,
      rankLogoSrc: stats.rank.current.logoSrc,
      rankProgress: stats.rank.progressToNextRank,
      title: "GitHub Contributor Karma",
    },
    config,
    theme,
  );
}

export function creatorKarmaCard(stats: KarmaStats, config: Config, theme: Theme) {
  return karmaCard(
    {
      currentRankScore: stats.karma,
      description:
        `Creator karma card. Rank ${stats.rank.current.title}. ${stats.rank.current.description}. ` +
        `Progress ${stats.rank.progressToNextRank} percent. Score ${stats.karma}.`,
      nextRankScore: stats.rank.next?.minKarma ?? 0,
      rank: stats.rank.current.title,
      rankDescription: stats.rank.current.description,
      rankLogoSrc: stats.rank.current.logoSrc,
      rankProgress: stats.rank.progressToNextRank,
      title: "GitHub Creator Karma",
    },
    config,
    theme,
  );
}

export function errorCard(message: string, config: Config, theme: Theme) {
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${theme.bgColor}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - Internal Error</title>
    <desc id="descId">${escapedText}</desc>

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${theme.bgColor}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${theme.borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="14" y="30">Could not render GitHub Karma</text>
    <image
      href="/dotted-line-face.png"
      xlink:href="/dotted-line-face.png"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="260"
      y="14"/>
    <text class="text" x="14" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-err-logo.png", "", 34, 340, 128)}

  </svg>`;
}

export function notfoundErrorCard(message: string, config: Config, theme: Theme) {
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${theme.bgColor}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - 404</title>
    <desc id="descId">${escapedText}</desc>

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${theme.bgColor}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${theme.borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="14" y="30">User not found!</text>
    <image
      href="/sneezing-face.png"
      xlink:href="/sneezing-face.png"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="140"
      y="14"/>
    <text class="text" x="14" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-404-logo.png", "", 34, 340, 128)}

  </svg>`;
}

export function karmaCard(data: KarmaCardInput, config: Config, theme: Theme) {
  const leftX = 304;
  const leftY = 105;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const descriptionLines = wrapToLines(data.rankDescription, 34, 2);
  const leftWidth = Math.floor(config.width * 0.58);
  const normalizedProgress = Math.min(100, Math.max(0, data.rankProgress));
  const finalDashOffset = circumference * (1 - normalizedProgress / 100);
  const rankLines = wrapToLines(data.rank, 14, 2);
  const display: "short" | "long" | undefined = data.currentRankScore >= 1000 ? "short" : undefined;
  let scoreText = `${formatNumber(data.currentRankScore, display)}`;
  if (data.nextRankScore) {
    scoreText += ` / ${formatNumber(data.nextRankScore, display)}`;
  }

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${theme.bgColor}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">${data.title}</title>
    <desc id="descId">${data.description}</desc>

    <style>
      .bar { stroke:${theme.iconColor};stroke-width:8;fill:none;stroke-linecap:round;stroke-dasharray:${circumference.toFixed(3)};stroke-dashoffset:${circumference.toFixed(3)};transform:rotate(-90deg);transform-origin:${leftX}px ${leftY}px;animation:fillRing 1.2s ease-out forwards; }
      .h1 { fill:${theme.textColor};font:800 22px Ubuntu,Sans-Serif;letter-spacing:.04em; }
      .h3 { fill:${theme.titleColor};font:600 10px Ubuntu,Sans-Serif; }
      .h4 { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
      .meta { fill:${theme.textColor};font:400 10px Ubuntu,Sans-Serif;opacity:.8; }
      .rim { stroke:${theme.iconColor};stroke-width:8;fill:none;opacity:.2; }
      .score { fill:${theme.textColor};font:700 12px Ubuntu,Sans-Serif;text-anchor:middle; }
      .score-flip { cursor:pointer; }
      .score-front, .score-back { transition:opacity .35s ease, transform .35s ease; transform-origin:${leftX}px ${leftY}px; }
      .score-front { opacity:1; transform:scaleX(1); }
      .score-back { opacity:0; transform:scaleX(0.15); }
      .score-flip:hover .score-front, .score-flip:focus .score-front, .score-flip:focus-within .score-front { opacity:0; transform:scaleX(0.15); }
      .score-flip:hover .score-back, .score-flip:focus .score-back, .score-flip:focus-within .score-back { opacity:1; transform:scaleX(1); }
      .split { stroke:${theme.borderColor};stroke-width:1; }

      @keyframes fillRing { to { stroke-dashoffset:${finalDashOffset.toFixed(3)} } }
      @media (prefers-reduced-motion: reduce) {.bar{animation:none;stroke-dashoffset:${finalDashOffset.toFixed(3)} } }
    </style>

    <rect
      fill="${theme.bgColor}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${theme.borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="h3" x="16" y="30">${data.title}</text>

    <text class="meta" x="16" y="52">Rank</text>
    <text class="h1" x="16" y="74">${rankLines[0]}</text>
    <text class="h1" x="16" y="96">${rankLines[1]}</text>
    <text class="h4" x="16" y="118">${descriptionLines[0]}</text>
    <text class="h4" x="16" y="130">${descriptionLines[1]}</text>

    <line class="split" x1="${leftWidth}" y1="46" x2="${leftWidth}" y2="${config.height - 24}" />

    <text class="meta" x="288" y="52">Karma</text>
    <circle class="rim" cx="${leftX}" cy="${leftY}" r="${radius}"/>
    <circle class="bar" cx="${leftX}" cy="${leftY}" r="${radius}"/>
    <g class="score-flip" tabindex="0" role="img" aria-label="Score ${scoreText}. Hover to view rank logo.">
      <circle cx="${leftX}" cy="${leftY}" r="22" fill="transparent" />
      <text class="score score-front" x="${leftX}" y="${leftY + 4}">${scoreText}</text>
      ${renderKarmaLogo(data.rankLogoSrc, "score-back", 58, leftX - 29, leftY - 29)}
    </g>

  </svg>`;
}

export function gitHubErrorCard(message: string, config: Config, theme: Theme) {
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${theme.bgColor}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - GitHub GraphQL API Error</title>
    <desc id="descId">${escapedText}</desc>

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${theme.bgColor}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${theme.borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="16" y="30">GitHub GraphQL API Error</text>
    <image
      href="/dotted-line-face.png"
      xlink:href="/dotted-line-face.png"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="142"
      y="12"/>
    <text class="text" x="16" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-err-logo.png", "", 34, 340, 128)}

  </svg>`;
}

/**
 * Escapes text for safe insertion into SVG/XML template strings.
 *
 * Converts the five XML-reserved characters (`&`, `<`, `>`, `"`, `'`) into
 * their corresponding entities to prevent markup breakage and injection.
 * Use this for dynamic text content such as `<text>`, `<title>`, and `<desc>`.
 */
const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatNumber = (value: number, display: "short" | "long" | undefined) =>
  new Intl.NumberFormat("en", { notation: "compact", compactDisplay: display }).format(value);

function parseText(text: string, maxCharsPerLine: number, maxLines: number) {
  const escapedText = escapeXml(text);

  let lineIndex = 0;
  let textTspans = "";
  for (const line of wrapToLines(escapedText, maxCharsPerLine, maxLines)) {
    if (!line) continue;

    textTspans += `<tspan x="14" dy="${lineIndex === 0 ? 0 : 14}">${line}</tspan>`;
    lineIndex += 1;
  }

  return { escapedText, textTspans };
}

function renderKarmaLogo(src: string, customClass = "", size = 24, x = 360, y = 136) {
  return `
  <image
    class="${customClass}"
    href="${src}"
    xlink:href="${src}"
    preserveAspectRatio="xMidYMid meet"
    width="${size}"
    height="${size}"
    x="${x}"
    y="${y}"/>`;
}

function truncateWithEllipsis(text: string, maxChars: number, forceEllipsis = false): string {
  if (maxChars <= 1) {
    return "…";
  }

  if (text.length > maxChars) {
    return `${text.slice(0, maxChars - 1)}…`;
  }

  if (!forceEllipsis || text.endsWith("…")) {
    return text;
  }

  const clipped = text.length >= maxChars ? text.slice(0, maxChars - 1) : text;
  return `${clipped}…`;
}

function wrapToLines(value: string, maxCharsPerLine: number, maxLines: number): string[] {
  const text = value.trim();
  if (!text || maxLines <= 0) return [];

  if (maxCharsPerLine <= 1) {
    return Array.from({ length: maxLines }, (_, index) => (index === 0 ? "…" : ""));
  }

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  let hasOverflow = false;
  let index = 0;

  while (index < words.length) {
    const word = words[index];
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
      index += 1;
      continue;
    }

    if (!current) {
      lines.push(truncateWithEllipsis(word, maxCharsPerLine));
      index += 1;
    } else {
      lines.push(current);
      current = "";
    }

    if (lines.length === maxLines) {
      hasOverflow = index < words.length || current.length > 0;
      break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (!hasOverflow && index < words.length) {
    hasOverflow = true;
  }

  if (hasOverflow && lines.length > 0) {
    const lastLineIndex = lines.length - 1;
    lines[lastLineIndex] = truncateWithEllipsis(lines[lastLineIndex], maxCharsPerLine, true);
  }

  while (lines.length < maxLines) {
    lines.push("");
  }

  return lines;
}
