'use client';

import { useState, useEffect } from 'react';

const CORRECT_PASSWORD = 'KademLawliet0521@';
const TARGET_URL = 'https://urbanmma.com/s?cache=1737225228';

export default function Home() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update document title and meta to look legitimate
  useEffect(() => {
    if (isAuthenticated) {
      document.title = 'Urban MMA';
    } else {
      document.title = 'Lawliet Bypass';
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password! Please try again.');
    }
    
    setLoading(false);
  };

  if (isAuthenticated) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}>
        <iframe
          src={TARGET_URL}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          title="Urban MMA"
          allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals allow-pointer-lock"
        />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
        }}>
          Welcome to Lawliet Bypass
        </h1>

        <form onSubmit={handleLogin} style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontSize: '14px',
            fontWeight: 'bold',
          }}>
            Enter Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password here..."
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              marginBottom: '10px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          {error && <p style={{ color: '#e74c3c', marginBottom: '20px', fontSize: '14px' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {loading ? 'Logging in...' : 'Enter'}
          </button>
        </form>

        <p style={{
          color: '#888',
          fontSize: '12px',
          textAlign: 'center',
          margin: 0,
        }}>
          Secure access only
        </p>
      </div>
    </div>
  );
}
