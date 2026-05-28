'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.text();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Website Proxy</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://www.tiktok.com)"
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch'}
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {result && (
          <div className="border rounded-lg p-4 overflow-auto max-h-[600px]">
            <iframe
              srcDoc={result}
              className="w-full h-[500px] border-0"
              title="Proxied Content"
            />
          </div>
        )}
      </div>
    </div>
  );
}
