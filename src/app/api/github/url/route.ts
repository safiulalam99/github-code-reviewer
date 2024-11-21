import { NextRequest } from 'next/server';

function parseGitHubUrl(url: string) {
  const regex = /github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/;
  const match = url.match(regex);
  
  if (!match) {
    throw new Error('Invalid GitHub URL format');
  }

  return {
    owner: match[1],
    repo: match[2],
    path: match[4]
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    const { owner, repo, path } = parseGitHubUrl(url);

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub');
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString();

    return Response.json({
      content,
      metadata: { owner, repo, path, sha: data.sha }
    });

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}