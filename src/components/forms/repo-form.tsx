'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface RepoFormProps {
  onSuccess: (content: string) => void;
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
      const res = await fetch('/api/github/repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner, repo, sha })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSuccess(data.content);
    } catch (err: any) {
      onError(err.message);
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
        placeholder="File SHA"
        value={sha}
        onChange={(e) => setSha(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="animate-spin" /> : 'Fetch File'}
      </Button>
    </form>
  );
}