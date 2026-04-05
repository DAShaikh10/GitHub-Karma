import { describe, expect, it } from "bun:test";

import { THEME } from "@/lib/card/constants";

describe("theme constants hygiene", () => {
  it("keeps theme keys alphabetically sorted", () => {
    const keys = Object.keys(THEME);
    const sortedKeys = [...keys].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

    expect(keys).toEqual(sortedKeys);
  });

  it("keeps every theme field alphabetically sorted", () => {
    const violations: string[] = [];

    for (const [themeName, theme] of Object.entries(THEME)) {
      const fields = Object.keys(theme);
      const sortedFields = [...fields].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

      if (fields.join("|") !== sortedFields.join("|")) {
        violations.push(`${themeName}: ${fields.join(", ")}`);
      }
    }

    expect(violations).toEqual([]);
  });

  it("enforces normalized hex color formatting", () => {
    const invalidGradientSpec: string[] = [];
    const missingHash: string[] = [];
    const uppercaseHex: string[] = [];
    const invalidHex: string[] = [];
    const shortenableHex6: string[] = [];
    const shortenableHex8: string[] = [];

    for (const [themeName, theme] of Object.entries(THEME)) {
      for (const [fieldName, rawValue] of Object.entries(theme)) {
        const value = rawValue.trim();

        if (value.includes(",")) {
          const parts = value
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean);

          if (parts.length < 3 || !Number.isFinite(Number(parts[0]))) {
            invalidGradientSpec.push(`${themeName}.${fieldName}: ${value}`);
            continue;
          }

          const hasInvalidColor = parts.slice(1).some((colorPart) => {
            const normalized = colorPart.toLowerCase();
            const prefixed = normalized.startsWith("#") ? normalized : `#${normalized}`;
            return !/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(prefixed);
          });

          if (hasInvalidColor) {
            invalidGradientSpec.push(`${themeName}.${fieldName}: ${value}`);
          }

          continue;
        }

        if (!value.startsWith("#")) {
          missingHash.push(`${themeName}.${fieldName}: ${value}`);
          continue;
        }

        if (value !== value.toLowerCase()) {
          uppercaseHex.push(`${themeName}.${fieldName}: ${value}`);
        }

        if (!/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(value)) {
          invalidHex.push(`${themeName}.${fieldName}: ${value}`);
          continue;
        }

        if (/^#[0-9a-f]{6}$/.test(value)) {
          const hex = value.slice(1);
          if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
            shortenableHex6.push(`${themeName}.${fieldName}: ${value}`);
          }
        }

        if (/^#[0-9a-f]{8}$/.test(value)) {
          const hex = value.slice(1);
          if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5] && hex[6] === hex[7]) {
            shortenableHex8.push(`${themeName}.${fieldName}: ${value}`);
          }
        }
      }
    }

    expect(invalidGradientSpec).toEqual([]);
    expect(missingHash).toEqual([]);
    expect(uppercaseHex).toEqual([]);
    expect(invalidHex).toEqual([]);
    expect(shortenableHex6).toEqual([]);
    expect(shortenableHex8).toEqual([]);
  });
});
