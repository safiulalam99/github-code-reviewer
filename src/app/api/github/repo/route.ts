import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { owner, repo, sha } = await request.json();
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/blobs/${sha}`,
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
    return Response.json({
      content: Buffer.from(data.content, 'base64').toString()
    });

  } catch (error: unknown) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}