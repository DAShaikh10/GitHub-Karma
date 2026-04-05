import { THEME } from "./constants";

import type { KarmaStats } from "@/lib/github";

import type { Config, KarmaCardInput, Theme } from "./types";

export function clientErrorCard(message: string, config: Config, theme: Theme, absoluteBaseUrl: string) {
  const background = resolveBackgroundPaint(theme.bgColor);
  const borderColor = resolveBorderColor(theme);
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${background.fill}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - Client Error</title>
    <desc id="descId">${escapedText}</desc>
    ${background.defs}

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${background.fill}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="16" y="30">Validation failed</text>
    <image
      href="${resolveAssetUrl("/emojis/rolling-eyes-face.png", absoluteBaseUrl)}"
      xlink:href="${resolveAssetUrl("/emojis/rolling-eyes-face.png", absoluteBaseUrl)}"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="142"
      y="12"/>
    <text class="text" x="16" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-err-logo.png", "", 34, 340, 128, absoluteBaseUrl)}

  </svg>`;
}

export function contributorKarmaCard(stats: KarmaStats, config: Config, theme: Theme, absoluteBaseUrl: string) {
  return karmaCard(
    {
      currentRankScore: stats.karma,
      description:
        `Contributor karma card. Rank ${stats.rank.current.title}. ${stats.rank.current.description}. ` +
        `Progress ${stats.rank.progressToNextRank} percent. Score ${stats.karma}.`,
      login: stats.login,
      nextRankScore: stats.rank.next?.minKarma ?? 0,
      rank: stats.rank.current.title,
      rankDescription: stats.rank.current.description,
      rankLogoSrc: stats.rank.current.logoSrc,
      rankProgress: stats.rank.progressToNextRank,
      title: "GitHub Contributor Karma",
    },
    config,
    theme,
    absoluteBaseUrl,
  );
}

export function creatorKarmaCard(stats: KarmaStats, config: Config, theme: Theme, absoluteBaseUrl: string) {
  return karmaCard(
    {
      currentRankScore: stats.karma,
      description:
        `Creator karma card. Rank ${stats.rank.current.title}. ${stats.rank.current.description}. ` +
        `Progress ${stats.rank.progressToNextRank} percent. Score ${stats.karma}.`,
      login: stats.login,
      nextRankScore: stats.rank.next?.minKarma ?? 0,
      rank: stats.rank.current.title,
      rankDescription: stats.rank.current.description,
      rankLogoSrc: stats.rank.current.logoSrc,
      rankProgress: stats.rank.progressToNextRank,
      title: "GitHub Creator Karma",
    },
    config,
    theme,
    absoluteBaseUrl,
  );
}

export function errorCard(message: string, config: Config, theme: Theme, absoluteBaseUrl: string) {
  const background = resolveBackgroundPaint(theme.bgColor);
  const borderColor = resolveBorderColor(theme);
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${background.fill}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - Internal Error</title>
    <desc id="descId">${escapedText}</desc>
    ${background.defs}

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${background.fill}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="14" y="30">Could not render GitHub Karma</text>
    <image
      href="${resolveAssetUrl("/emojis/dotted-line-face.png", absoluteBaseUrl)}"
      xlink:href="${resolveAssetUrl("/emojis/dotted-line-face.png", absoluteBaseUrl)}"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="260"
      y="14"/>
    <text class="text" x="14" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-err-logo.png", "", 34, 340, 128, absoluteBaseUrl)}

  </svg>`;
}

export function notfoundErrorCard(message: string, config: Config, theme: Theme, absoluteBaseUrl: string) {
  const background = resolveBackgroundPaint(theme.bgColor);
  const borderColor = resolveBorderColor(theme);
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${background.fill}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - 404</title>
    <desc id="descId">${escapedText}</desc>
    ${background.defs}

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${background.fill}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="14" y="30">User not found!</text>
    <image
      href="${resolveAssetUrl("/emojis/sneezing-face.png", absoluteBaseUrl)}"
      xlink:href="${resolveAssetUrl("/emojis/sneezing-face.png", absoluteBaseUrl)}"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="140"
      y="14"/>
    <text class="text" x="14" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-404-logo.png", "", 34, 340, 128, absoluteBaseUrl)}

  </svg>`;
}

export function karmaCard(data: KarmaCardInput, config: Config, theme: Theme, absoluteBaseUrl: string) {
  const background = resolveBackgroundPaint(theme.bgColor);
  const borderColor = resolveBorderColor(theme);
  const leftX = 304;
  const leftY = 105;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const descriptionLines = wrapToLines(data.rankDescription, 34, 2);
  const leftWidth = Math.floor(config.width * 0.58);
  const normalizedProgress = Math.min(100, Math.max(0, data.rankProgress));
  const finalDashOffset = circumference * (1 - normalizedProgress / 100);
  const rankLines = wrapToLines(data.rank, 14, 2);
  const display = data.currentRankScore >= 1000 ? "short" : undefined;
  const userText = truncateWithEllipsis(`${data.login}'s ${data.title}`, 50);
  let scoreText = formatNumber(data.currentRankScore, display);
  if (data.nextRankScore) {
    scoreText += ` / ${formatNumber(data.nextRankScore, display)}`;
  }

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${background.fill}"
    height="${config.height}"
    role="img"
    style="cursor:pointer"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">${userText}</title>
    <desc id="descId">${data.description}</desc>
    ${background.defs}

    <style>
      .bar { stroke:${theme.iconColor};stroke-width:8;fill:none;stroke-linecap:round;stroke-dasharray:${circumference.toFixed(3)};stroke-dashoffset:${circumference.toFixed(3)};transform:rotate(-90deg);transform-origin:${leftX}px ${leftY}px;animation:fillRing 1.2s ease-out forwards; }
      .h1 { fill:${theme.textColor};font:800 22px Ubuntu,Sans-Serif;letter-spacing:.04em; }
      .h3 { fill:${theme.titleColor};font:600 10px Ubuntu,Sans-Serif; }
      .h4 { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
      .meta { fill:${theme.textColor};font:400 10px Ubuntu,Sans-Serif;opacity:.8; }
      .rim { stroke:${theme.iconColor};stroke-width:8;fill:none;opacity:.2; }
      .score { fill:${theme.textColor};font:700 12px Ubuntu,Sans-Serif;text-anchor:middle; }
      .split { stroke:${borderColor};stroke-width:1; }

      @keyframes fillRing { to { stroke-dashoffset:${finalDashOffset.toFixed(3)} } }
      @media (prefers-reduced-motion: reduce) {.bar{animation:none;stroke-dashoffset:${finalDashOffset.toFixed(3)} } }
    </style>

    <rect
      fill="${background.fill}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="h3" x="16" y="30">${userText}</text>

    <text class="meta" x="16" y="52">Rank</text>
    <text class="h1" x="16" y="74">${rankLines[0]}</text>
    <text class="h1" x="16" y="96">${rankLines[1]}</text>
    <text class="h4" x="16" y="118">${descriptionLines[0]}</text>
    <text class="h4" x="16" y="130">${descriptionLines[1]}</text>

    <line class="split" x1="${leftWidth}" y1="46" x2="${leftWidth}" y2="${config.height - 24}" />

    <text class="meta" x="288" y="52">Karma</text>
    <circle class="rim" cx="${leftX}" cy="${leftY}" r="${radius}"/>
    <circle class="bar" cx="${leftX}" cy="${leftY}" r="${radius}"/>
    <text class="score" x="${leftX}" y="${leftY + 4}">${scoreText}</text>
    ${renderKarmaLogo(data.rankLogoSrc, "", 32, 346, 132, absoluteBaseUrl)}

  </svg>`;
}

export function gitHubErrorCard(message: string, config: Config, theme: Theme, absoluteBaseUrl: string) {
  const background = resolveBackgroundPaint(theme.bgColor);
  const borderColor = resolveBorderColor(theme);
  const { escapedText, textTspans } = parseText(message, 62, 4);

  return `
  <svg
    aria-labelledby="titleId descId"
    fill="${background.fill}"
    height="${config.height}"
    role="img"
    viewBox="0 0 ${config.width} ${config.height}"
    width="${config.width}"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <title id="titleId">GitHub Karma - GitHub GraphQL API Error</title>
    <desc id="descId">${escapedText}</desc>
    ${background.defs}

    <style>
      rect { stroke-width: 2; }
      .title { fill:${theme.titleColor};font:600 16px Ubuntu,Sans-Serif; }
      .text { fill:${theme.textColor};font:400 12px Ubuntu,Sans-Serif; }
    </style>

    <rect
      fill="${background.fill}"
      height="${config.height - 2}"
      rx="8.5"
      stroke="${borderColor}"
      width="${config.width - 2}"
      x="0.5"
      y="0.5"/>

    <text class="title" x="16" y="30">GitHub GraphQL API Error</text>
    <image
      href="${resolveAssetUrl("/emojis/dotted-line-face.png", absoluteBaseUrl)}"
      xlink:href="${resolveAssetUrl("/emojis/dotted-line-face.png", absoluteBaseUrl)}"
      preserveAspectRatio="xMidYMid meet"
      width="22"
      height="22"
      x="142"
      y="12"/>
    <text class="text" x="16" y="54">${textTspans}</text>

    ${renderKarmaLogo("/logos/github-karma-err-logo.png", "", 34, 340, 128, absoluteBaseUrl)}

  </svg>`;
}

function resolveBackgroundPaint(bgColor: string) {
  const gradient = parseGradientBackground(bgColor);
  if (!gradient) {
    return { defs: "", fill: bgColor };
  }

  const gradientId = `bg-gradient-${stableHash(bgColor)}`;
  const gradientStops = gradient.colors
    .map((color, index) => {
      const denominator = gradient.colors.length - 1;
      const offset = denominator <= 0 ? "0%" : `${Math.round((index / denominator) * 100)}%`;

      return `<stop offset="${offset}" stop-color="${color}"/>`;
    })
    .join("");

  return {
    defs: `<defs><linearGradient id="${gradientId}" gradientTransform="rotate(${gradient.angle})">${gradientStops}</linearGradient></defs>`,
    fill: `url(#${gradientId})`,
  };
}

function parseGradientBackground(bgColor: string) {
  const parts = bgColor
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 3) {
    return null;
  }

  const angle = Number(parts[0]);
  if (!Number.isFinite(angle)) {
    return null;
  }

  const colors = parts.slice(1).map((value) => normalizeHexColor(value));
  if (colors.some((color) => color === null)) {
    return null;
  }

  return { angle, colors: colors as string[] };
}

function normalizeHexColor(value: string) {
  const normalized = value.toLowerCase();
  const prefixed = normalized.startsWith("#") ? normalized : `#${normalized}`;

  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(prefixed) ? prefixed : null;
}

function stableHash(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }

  return Math.abs(hash).toString(36);
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

const resolveBorderColor = (theme: Theme) => theme.borderColor ?? THEME.default.borderColor ?? THEME.default.bgColor;

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

function resolveAssetUrl(src: string, assetBaseUrl?: string) {
  if (!assetBaseUrl || /^(?:[a-z]+:)?\/\//i.test(src) || src.startsWith("data:")) {
    return src;
  }

  const normalizedBase = assetBaseUrl.replace(/\/$/, "");
  const normalizedPath = src.startsWith("/") ? src : `/${src}`;

  return `${normalizedBase}${normalizedPath}`;
}

function renderKarmaLogo(src: string, customClass = "", size = 24, x = 360, y = 136, assetBaseUrl?: string) {
  const resolvedSrc = resolveAssetUrl(src, assetBaseUrl);

  return `
  <image
    class="${customClass}"
    href="${resolvedSrc}"
    xlink:href="${resolvedSrc}"
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
