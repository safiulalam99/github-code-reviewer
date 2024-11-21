// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UrlForm } from '@/components/forms/url-form';
import { RepoForm } from '@/components/forms/repo-form';

export interface CodeReviewResult {
  code: string;
  review: string;
}


export default function Home() {
  const [isUrlMode, setIsUrlMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CodeReviewResult | null>(null);

  const handleSuccess = (data: string | CodeReviewResult) => {
    setError(null);
    setResult(typeof data === 'string' ? { code: data, review: '' } : data);
  };

  const handleError = (error: string) => {
    setError(error);
    setResult(null);
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

          {result && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Code Review:</h3>
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                  {result.review}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Code:</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{result.code}</code>
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}