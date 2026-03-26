export type GitHubCreatorStats = {
  login: string;
  repositories: Partial<GitHubRepository>[];
};

export type GitHubContributorStats = {
  answers: number;
  commits: number;
  issues: number;
  login: string;
  pullRequests: number;
  reviews: number;
};

export type GitHubGraphQLResponse<T> = {
  data: {
    user: T | null;
  };
  errors?: Partial<{ type: string }>[];
};

export type GitHubGraphQLCreatorResponse = {
  login: string;
  repositories: {
    nodes: Partial<GitHubRepository>[];
  };
};

export type GitHubGraphQLContributorResponse = {
  login: string;
  contributionsCollection: GitHubContributionsCollection;
  issues: {
    nodes: GitHubIssue[];
  };
  repositories: {
    nodes: Partial<GitHubRepository>[];
  };
  repositoryDiscussionComments: {
    totalCount: number;
  };
};

export type KarmaStats = {
  login: string;
  karma: number;
  rank: RankProgress;
};

export type RankDefinition = {
  title: string;
  description: string;
  logoSrc: string;
  minKarma: number;
};

export type RankProgress = {
  current: RankDefinition;
  next: RankDefinition | null;
  logoSrc: string;
  progressToNextRank: number;
  remainingToNextRank: number;
};

type GitHubIssue = {
  repository: Partial<GitHubRepository>;
  stateReason: GitHubIssueStateReason;
};

type GitHubIssueStateReason = "COMPLETED" | "DUPLICATE" | "NOT_PLANNED";

type GitHubContributionsCollection = {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
};

type GitHubRepository = {
  forkCount: number;
  owner: {
    login: string;
  };
  stargazerCount: number;
};
