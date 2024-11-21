# GitHub Code Review AI

A Next.js application that fetches code from GitHub repositories and provides AI-powered code reviews using Google's Gemini Pro model through LangChain.

## Technical Overview

### Core Features
- Fetch code from GitHub using file URL or repository details (owner/repo/SHA)
- AI-powered code review using Gemini Pro
- Quality score and detailed feedback
- Clean API structure with modular design

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI Integration**: LangChain with Google's Gemini Pro
- **API Integration**: GitHub REST API v3
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS with CSS Variables

## Key Implementation Details

### 1. GitHub Integration

Two methods to fetch code:

```typescript
// URL-based fetching
POST /api/github/url
body: { url: string }

Response: {
  content: string;
  metadata: {
    owner: string;
    repo: string;
    path: string;
    sha: string;
  }
}
```

```typescript
// Repository-based fetching
POST /api/github/repo
body: {
  owner: string;
  repo: string;
  sha: string;
}

Response: {
  content: string;
  metadata: {
    owner: string;
    repo: string;
    path: string;
    sha: string;
  }
}
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

### 3. Error Handling

The API implements comprehensive error handling:

```typescript
// Error Response Format
{
  error: string;
  status?: number;
}

// Common Status Codes
400 - Bad Request (Invalid URL or parameters)
401 - Unauthorized (Invalid API keys)
404 - Not Found (Repository or file not found)
500 - Internal Server Error
```

## Setup and Configuration

1. Clone the repository:
```bash
git clone https://github.com/safiulalam99/github-code-reviewer.git
cd github-code-reviewer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
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

// Success Response
{
  "content": string,
  "metadata": {
    "owner": string,
    "repo": string,
    "path": string,
    "sha": string
  }
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

// Success Response
{
  "content": string,
  "metadata": {
    "owner": string,
    "repo": string,
    "path": string,
    "sha": string
  }
}
```

### 3. Code Review Endpoint
```typescript
POST /api/review
{
  "code": "code_content"
}

// Success Response
{
  "review": {
    "score": number,
    "explanation": string,
    "strengths": string[],
    "improvements": string[]
  }
}
```

## Development

- Built with TypeScript for type safety
- Uses ESLint for code quality
- Implements shadcn/ui for consistent UI components
- Supports dark/light theme with system preference detection

