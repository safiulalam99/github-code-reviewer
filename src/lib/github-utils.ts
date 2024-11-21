// src/lib/github-utils.ts
export function validateGitHubUrl(url: string): boolean {
    const regex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/blob\/[^\/]+\/.+$/;
    return regex.test(url);
  }
  
  export function validateRepoInput(owner: string, repo: string, sha: string): boolean {
    const ownerRepoRegex = /^[A-Za-z0-9_.-]+$/;
    const shaRegex = /^[a-f0-9]{40}$/i;
  
    return (
      ownerRepoRegex.test(owner) &&
      ownerRepoRegex.test(repo) &&
      shaRegex.test(sha)
    );
  }
  
  export function formatGitHubError(error: string): string {
    // Clean up GitHub API error messages
    return error.replace(/^[^:]+:\s*/, '').trim();
  }