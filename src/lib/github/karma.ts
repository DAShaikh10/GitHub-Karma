import { WEIGHT_MULTIPLIERS } from "@/constants/env";
import { CONTRIBUTOR_RANKS, CREATOR_RANKS } from "@/constants/rank";

import type { GitHubCreatorStats, GitHubContributorStats, KarmaStats, RankDefinition, RankProgress } from "./types";

export function parseCreatorKarma(stats: GitHubCreatorStats): KarmaStats {
  const creatorKarma = calculateCreatorKarma(stats.repositories);
  const creatorRank = calculateRankProgress(creatorKarma, CREATOR_RANKS);

  return { login: stats.login, karma: creatorKarma, rank: creatorRank };
}

export function parseContributorKarma(stats: GitHubContributorStats): KarmaStats {
  const contributorKarma = calculateContributorKarma(stats);
  const contributorRank = calculateRankProgress(contributorKarma, CONTRIBUTOR_RANKS);

  return { login: stats.login, karma: contributorKarma, rank: contributorRank };
}

function calculateRankProgress(karma: number, ranks: RankDefinition[]): RankProgress {
  const currentRankIndex = ranks.reduce((index, rank, currentIndex) => {
    if (karma >= rank.minKarma) return currentIndex;

    return index;
  }, 0);

  const current = ranks[currentRankIndex];
  const next = ranks[currentRankIndex + 1] ?? null;

  if (!next) {
    return {
      current,
      next: null,
      logoSrc: current.logoSrc,
      progressToNextRank: 100,
      remainingToNextRank: 0,
    };
  }

  const range = Math.max(1, next.minKarma - current.minKarma);
  const progressed = Math.max(0, karma - current.minKarma);
  const progressToNextRank = Math.min(100, Number(((progressed / range) * 100).toFixed(1)));

  return {
    current,
    next,
    progressToNextRank,
    logoSrc: current.logoSrc,
    remainingToNextRank: Math.max(0, next.minKarma - karma),
  };
}

/**
 * Calculate the total karma for a creator based on stars and forks in their own repositories.
 * @param repositories An array of the creator's repositories, each containing `stargazerCount` and `forkCount`.
 * @returns The creator karma as an integer.
 */
function calculateCreatorKarma(repositories: GitHubCreatorStats["repositories"]) {
  const aggregate = repositories.reduce(
    (accumulator, repository) => {
      const stars = repository.stargazerCount ?? 0;
      const forks = repository.forkCount ?? 0;

      accumulator.starPoints += calculateScore(
        stars,
        WEIGHT_MULTIPLIERS.STAR_PLATEAU_SCORE,
        WEIGHT_MULTIPLIERS.STAR_SATURATION_SCALE,
        WEIGHT_MULTIPLIERS.STAR_TAIL_SLOPE,
      );
      accumulator.forkPoints += calculateScore(
        forks,
        WEIGHT_MULTIPLIERS.FORK_PLATEAU_SCORE,
        WEIGHT_MULTIPLIERS.FORK_SATURATION_SCALE,
        WEIGHT_MULTIPLIERS.FORK_TAIL_SLOPE,
        WEIGHT_MULTIPLIERS.FORK_CURVE_WEIGHT,
      );

      if (stars >= WEIGHT_MULTIPLIERS.HIGH_IMPACT_STARS || forks >= WEIGHT_MULTIPLIERS.HIGH_IMPACT_FORKS) {
        accumulator.highImpactRepos += 1;
      }

      return accumulator;
    },
    { starPoints: 0, forkPoints: 0, highImpactRepos: 0 },
  );

  let baseKarma = aggregate.starPoints + aggregate.forkPoints;

  if (aggregate.highImpactRepos >= WEIGHT_MULTIPLIERS.HIGH_IMPACT_REPO_THRESHOLD) {
    baseKarma *= WEIGHT_MULTIPLIERS.LEGEND_MULTIPLIER;
  }

  return Math.floor(baseKarma);
}

function calculateContributorKarma(stats: Partial<GitHubContributorStats>) {
  return Math.ceil(
    (stats.commits ?? 0) * WEIGHT_MULTIPLIERS.COMMITS +
      (stats.reviews ?? 0) * WEIGHT_MULTIPLIERS.CONTRIBUTOR_REVIEWS +
      (stats.pullRequests ?? 0) * WEIGHT_MULTIPLIERS.CONTRIBUTOR_PRS +
      (stats.issues ?? 0) * WEIGHT_MULTIPLIERS.CONTRIBUTOR_ISSUES +
      (stats.answers ?? 0) * WEIGHT_MULTIPLIERS.CONTRIBUTOR_ANSWERS,
  );
}

/**
 * Calculates a score based on an "Saturating Exponential + Linear term" curve,
 * otherwise known as "Exponential approach-to-asymptote with linear drift" curve.
 *
 * `scaleFactor x (plateauScore x (1 - e^(-count / saturationScale) + tailSlope x count)`
 *
 * @param count The count of the factor being scored _(e.g., stars or forks)_. Should be a non-negative integer.
 * @param plateauScore The maximum score contributed by this factor _("asymptote" of the curve)_ or the near ceiling contributed by the saturating part.
 * @param saturationScale The scale at which the score approaches the plateauScore. Higher values mean a slower approach.
 * @param tailSlope The slope of the linear term. Higher values mean a steeper linear increase that can exceed the plateauScore at high counts.
 * @param scaleFactor An optional multiplier for scaling.
 * @returns The calculated score.
 */
function calculateScore(
  count: number,
  plateauScore: number,
  saturationScale: number,
  tailSlope: number,
  scaleFactor = 1,
) {
  const normalizedCount = Math.max(0, count);
  const normalizedScale = Math.max(1, saturationScale);

  return (
    scaleFactor * (plateauScore * (1 - Math.exp(-normalizedCount / normalizedScale)) + tailSlope * normalizedCount)
  );
}
