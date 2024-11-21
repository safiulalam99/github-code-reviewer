'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { CodeReviewResult } from '@/app/page';

interface UrlFormProps {
  onSuccess: (data: CodeReviewResult) => void;
  onError: (error: string) => void;
}

export function UrlForm({ onSuccess, onError }: UrlFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const githubResponse = await fetch('/api/github/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
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
        placeholder="Enter GitHub file URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />
      <p className="text-sm text-muted-foreground">
        Example: https://github.com/facebook/react/blob/main/scripts/flags/flags.js
      </p>
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