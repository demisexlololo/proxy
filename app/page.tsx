'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    
    // Make sure URL has https://
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }
    
    setIframeUrl(finalUrl);
    setLoading(false);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        padding: '15px 20px',
        background: '#333',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Web Proxy</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flex: 1, gap: '10px' }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://www.wikipedia.org)"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Loading...' : 'Go'}
          </button>
        </form>
      </div>

      {iframeUrl ? (
        <iframe
          src={iframeUrl}
          style={{
            flex: 1,
            border: 'none',
            width: '100%',
          }}
          title="Proxied Website"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          background: '#f5f5f5',
        }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Enter a URL above to get started!</h2>
          <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center' }}>
            Note: Many websites (like TikTok, Instagram) block being loaded in iframes due to security policies.
            <br />
            Educational websites usually work great!
          </p>
        </div>
      )}
    </div>
  );
}
