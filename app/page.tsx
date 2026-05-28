'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    
    try {
      // Simple redirect to the URL
      window.location.href = url;
    } catch (err) {
      setError('Failed to open URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>School Website Access</h1>
      
      <div style={{
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
      }}>
        <h3 style={{ marginTop: 0, color: '#0070f3' }}>Important Notes:</h3>
        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li><strong>TikTok has very strong anti-bot systems</strong> and is hard to proxy</li>
          <li>Many social media sites detect proxies and block them</li>
          <li>Always follow your school's internet usage policies</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g., https://www.wikipedia.org)"
          style={{
            width: '100%',
            padding: '12px 15px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            marginBottom: '10px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Opening...' : 'Open Website'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{
        background: '#e3f2fd',
        padding: '20px',
        borderRadius: '8px',
      }}>
        <h4 style={{ color: '#1565c0', marginTop: 0 }}>Try These Alternatives:</h4>
        <ul style={{ color: '#333', lineHeight: '1.8' }}>
          <li>Educational sites usually work great</li>
          <li>Wikipedia, Khan Academy, and other learning tools are good options</li>
          <li>Ask your teacher about approved websites for your school</li>
        </ul>
      </div>
    </div>
  );
}
