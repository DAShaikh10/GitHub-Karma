// Custom error class for distinguishing GitHub GraphQL errors.
export class GitHubGraphQLError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "GitHubGraphQLError";
  }
}
