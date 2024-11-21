# GitHub Code Review AI

A Next.js application that fetches code from GitHub repositories and provides AI-powered code reviews using Google's Gemini Pro model through LangChain.

## Technical Overview

### Core Features
- Fetch code from GitHub using file URL or repository details (owner/repo/SHA)
- AI-powered code review using Gemini Pro
- Quality score and detailed feedback
- Clean API structure with modular design

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI Integration**: LangChain with Google's Gemini Pro
- **API Integration**: GitHub API
- **Styling**: shadcn/ui components

## Key Implementation Details

### 1. GitHub Integration

Two methods to fetch code:

```typescript
// URL-based fetching
POST /api/github/url
body: { url: string }

// Repository-based fetching
POST /api/github/repo
body: { owner: string, repo: string, sha: string }
```

### 2. LangChain Integration

Implemented code review using LangChain's prompt templates and chains:

```typescript
const reviewPrompt = PromptTemplate.fromTemplate(`
  Review this code and provide:
  1. Quality Score (0-100)
  2. Brief explanation for the score
  3. Main strengths
  4. Key improvements needed
`);

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});
```

## Setup and Configuration

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
GITHUB_TOKEN=your_github_token
GOOGLE_API_KEY=your_gemini_api_key
```

4. Run the development server:
```bash
npm run dev
```

## API Endpoints

### 1. GitHub URL Endpoint
```typescript
POST /api/github/url
{
  "url": "https://github.com/owner/repo/blob/main/path/to/file"
}
```

### 2. GitHub Repo Endpoint
```typescript
POST /api/github/repo
{
  "owner": "username",
  "repo": "repository",
  "sha": "file_sha"
}
```

### 3. Code Review Endpoint
```typescript
POST /api/review
{
  "code": "code_content"
}
```

