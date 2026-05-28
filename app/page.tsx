'use client';

import { useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState<'username' | 'video'>('username');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const params = new URLSearchParams();
      if (mode === 'username') params.set('username', input.replace('@', ''));
      if (mode === 'video') params.set('video', input);
      
      const response = await fetch(`/api/tiktok?${params.toString()}`);
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
    <div>
      <h1>TikTok Access</h1>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        Note: This is a basic tool and may not work perfectly due to TikTok&apos;s anti-bot measures.
      </p>
      
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setMode('username')}
          style={{
            marginRight: '10px',
            backgroundColor: mode === 'username' ? '#0070f3' : '#ddd',
            color: mode === 'username' ? 'white' : '#333',
          }}
        >
          Search Username
        </button>
        <button
          onClick={() => setMode('video')}
          style={{
            backgroundColor: mode === 'video' ? '#0070f3' : '#ddd',
            color: mode === 'video' ? 'white' : '#333',
          }}
        >
          Open Video
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'username' ? 'Enter username (e.g., tiktok)' : 'Enter video URL'}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Go'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      {result && <iframe srcDoc={result} title="TikTok Content" />}
    </div>
  );
}
