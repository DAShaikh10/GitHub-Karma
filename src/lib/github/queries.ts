/*
--- CREATOR KARMA ---
Stats. included: forks, stars

- Repositories: [Repo = OWNED]
  - Consider the top 100 most starred public non-forked repositories owned by the user.
  - Primary filter is stars, but also consider forks for these 100 in calculation. \
  - Ideally we should use separate query snippet to fetch the top 100 most forked non-forked repositories owned by user \
  - But we make an assumption that the fork count will be somewhat proportional to star count and use the same 100 repos. for both.

  - FUTURE SCOPE: Take pesudo-karma of the people who fork, star, or watch into account?
*/
export const CREATOR_KARMA_QUERY = `
  query UserKarma($login: String!) {
    user(login: $login) {
      login

      repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          forkCount
          stargazerCount
        }
      }
    }
  }
`;

/*
--- CONTRIBUTOR KARMA ---
Stats. included: commits, merged PRs, reviews in other repos., closed issues in other repos., accepted answers

- Total Commits: [Repo = ALL]
  - Consider the total number of commits made by the user.

- Total Discussion Answers: [Repo = ALL]
  - Consider the total number of accepted answers in discussions.

- Total Merged PRs: [Repo = ALL]
  - Consider all merged PRs.

  - FUTURE SCOPE: Filter out user's own repos and actually consider the 100 PRs that got merged elsewhere.

- Total Reviews: [Repo = ALL]
  - Consider all PR reviews.

- Issues: [Repo = OTHER]
  - Consider the completed issues in other people's repos (stateReason: COMPLETED) from the last 100 closed issues.

  - FUTURE SCOPE: Filter out user's own repos and actually consider the 100 issues that got marked as completed elsewhere.
*/
export const CONTRIBUTOR_KARMA_QUERY = `
  query UserKarma($login: String!) {
    user(login: $login) {
      login

      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }

      issues(last: 100, states: [CLOSED]) {
        nodes {
          stateReason
          repository {
            owner {
              login
            }
          }
        }
      }

      repositoryDiscussionComments(onlyAnswers: true) {
        totalCount
      }
    }
  }
`;
