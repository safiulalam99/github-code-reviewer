"use client";

import { useState } from "react";

export default function GitHubForm() {
  const [repo, setRepo] = useState("");
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; reasoning: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/github-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repo, sha }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching file or analyzing code quality.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">GitHub Code Quality Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repo" className="block text-sm font-medium text-gray-700">
            GitHub Repository (e.g., `owner/repo`)
          </label>
          <input
            id="repo"
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="sha" className="block text-sm font-medium text-gray-700">
            File SHA
          </label>
          <input
            id="sha"
            type="text"
            value={sha}
            onChange={(e) => setSha(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? "Fetching and Analyzing..." : "Submit"}
        </button>
      </form>
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Code Quality Score</h2>
          <p>
            <strong>Score:</strong> {result.score}
          </p>
          <p>
            <strong>Reasoning:</strong> {result.reasoning}
          </p>
        </div>
      )}
    </div>
  );
}
