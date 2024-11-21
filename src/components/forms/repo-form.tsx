'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { CodeReviewResult } from '@/app/page';

interface RepoFormProps {
  onSuccess: (data: CodeReviewResult) => void;
  onError: (error: string) => void;
}

export function RepoForm({ onSuccess, onError }: RepoFormProps) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const githubResponse = await fetch('/api/github/repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner, repo, sha })
      });

      if (!githubResponse.ok) {
        throw new Error('Failed to fetch code');
      }

      const { content } = await githubResponse.json();

      const reviewResponse = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: content })
      });

      if (!reviewResponse.ok) {
        throw new Error('Failed to review code');
      }

      const { review } = await reviewResponse.json();

      onSuccess({ code: content, review });
      
    } catch (err: unknown) {
      onError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Repository Owner (e.g., facebook)"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        disabled={loading}
      />
      <Input
        placeholder="Repository Name (e.g., react)"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        disabled={loading}
      />
      <Input
        placeholder=" (e.g., a578304199a2c3086631e54f54b356414c3a3db4"
        value={sha}
        onChange={(e) => setSha(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Review Code'
        )}
      </Button>
    </form>
  );
}