export const CACHE_REVALIDATE_SECONDS = parseInt(process.env.CACHE_REVALIDATE_SECONDS || "3600", 10);
export const GITHUB_GRAPHQL_API_URL = process.env.GITHUB_GRAPHQL_API_URL || "https://api.github.com/graphql";
export const GITHUB_PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
export const GITHUB_RATELIMIT_HEADER = process.env.GITHUB_RATELIMIT_HEADER || "x-ratelimit-limit";
export const GITHUB_RATELIMIT_REMAINING_HEADER =
  process.env.GITHUB_RATELIMIT_REMAINING_HEADER || "x-ratelimit-remaining";
export const GITHUB_RATELIMIT_RESET_HEADER = process.env.GITHUB_RATELIMIT_RESET_HEADER || "x-ratelimit-reset";
export const KARMA_CARD_CACHE_SECONDS = parseInt(process.env.KARMA_CARD_CACHE_SECONDS || "7200", 10);
export const STALE_WHILE_REVALIDATION_SECONDS = parseInt(process.env.STALE_WHILE_REVALIDATION_SECONDS || "300", 10);
export const WEIGHT_MULTIPLIERS = {
  // Creator Karma Multipliers.
  BEGINNER_STAR_THRESHOLD: parseInt(process.env.BEGINNER_STAR_THRESHOLD || "1", 10),
  BEGINNER_STAR_MULTIPLIER: parseFloat(process.env.BEGINNER_STAR_MULTIPLIER || "1"),
  FORK_ENGAGEMENT_MULTIPLIER: parseFloat(process.env.FORK_ENGAGEMENT_MULTIPLIER || "1"),
  STAR_PLATEAU_SCORE: parseFloat(process.env.STAR_PLATEAU_SCORE || "3200"),
  STAR_SATURATION_SCALE: parseFloat(process.env.STAR_SATURATION_SCALE || "3500"),
  STAR_TAIL_SLOPE: parseFloat(process.env.STAR_TAIL_SLOPE || "0.02"),
  FORK_PLATEAU_SCORE: parseFloat(process.env.FORK_PLATEAU_SCORE || "900"),
  FORK_SATURATION_SCALE: parseFloat(process.env.FORK_SATURATION_SCALE || "1200"),
  FORK_TAIL_SLOPE: parseFloat(process.env.FORK_TAIL_SLOPE || "0.008"),
  FORK_CURVE_WEIGHT: parseFloat(process.env.FORK_CURVE_WEIGHT || "0.6"),
  HIGH_IMPACT_REPO_THRESHOLD: parseInt(process.env.HIGH_IMPACT_REPO_THRESHOLD || "1", 10),
  HIGH_IMPACT_STARS: parseInt(process.env.HIGH_IMPACT_STARS || "1", 10),
  HIGH_IMPACT_FORKS: parseInt(process.env.HIGH_IMPACT_FORKS || "1", 10),
  LEGEND_MULTIPLIER: parseFloat(process.env.LEGEND_MULTIPLIER || "1"),

  // Contributor Karma Multipliers.
  COMMITS: parseFloat(process.env.COMMIT_WEIGHT || "1"),
  CONTRIBUTOR_PRS: parseFloat(process.env.CONTRIBUTOR_PR_WEIGHT || "1"),
  CONTRIBUTOR_REVIEWS: parseFloat(process.env.CONTRIBUTOR_REVIEW_WEIGHT || "1"),
  CONTRIBUTOR_ISSUES: parseFloat(process.env.CONTRIBUTOR_ISSUE_WEIGHT || "1"),
  CONTRIBUTOR_ANSWERS: parseFloat(process.env.CONTRIBUTOR_ANSWER_WEIGHT || "1"),
};
