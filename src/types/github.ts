// src/types/github.ts
export interface GitHubUrlInput {
    url: string;
}

export interface GitHubRepoInput {
    owner: string;
    repo: string;
    sha: string;
}

export interface FileContent {
    content: string;
    metadata: {
        owner: string;
        repo: string;
        path: string;
        sha: string;
    };
}