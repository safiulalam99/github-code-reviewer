// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UrlForm } from '@/components/forms/url-form';
import { RepoForm } from '@/components/forms/repo-form';
import { CodeViewer } from '@/components/code-viewer';

export default function Home() {
  const [isUrlMode, setIsUrlMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  const handleSuccess = (content: string) => {
    setError(null);
    setContent(content);
  };

  const handleError = (error: string) => {
    setError(error);
    setContent(null);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">GitHub Code Reviewer</CardTitle>
          <div className="flex items-center justify-center gap-4">
            <span>URL Mode</span>
            <Switch 
              checked={!isUrlMode} 
              onCheckedChange={(checked) => setIsUrlMode(!checked)} 
            />
            <span>Repository Mode</span>
          </div>
        </CardHeader>
        <CardContent>
          {isUrlMode ? (
            <UrlForm onSuccess={handleSuccess} onError={handleError} />
          ) : (
            <RepoForm onSuccess={handleSuccess} onError={handleError} />
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <CodeViewer content={content} />
        </CardContent>
      </Card>
    </main>
  );
}