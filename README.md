# School iPad Proxy Website Tutorial

A simple proxy website to access restricted sites (TikTok, Discord, etc.) on school iPads, deployed on Vercel.

---

## Step 1: Deploy to Vercel

1. Go to https://vercel.com/new
2. Sign in with your GitHub account
3. Import the repository: `https://github.com/demisexlololo/proxy`
4. Click "Deploy" – Vercel will handle the rest!
5. Wait for deployment to finish (usually 1-2 minutes)
6. Copy your Vercel URL (it will look like `https://proxy-xxxx.vercel.app`)

---

## Step 2: Use It on Your iPad

1. Open Safari (or any browser) on your school iPad
2. Go to your Vercel URL
3. Enter the website you want to access (e.g., `https://www.tiktok.com`)
4. Click "Fetch"
5. The website will load in the iframe!

---

## Notes & Limitations

- **This is a basic proxy**: TikTok/Discord/Snapchat have strong anti-bot measures, so some features might not work perfectly
- **Don't share your Vercel URL publicly** – your school might block it
- **Use responsibly**: Follow your school's policies!

---

## Project Structure

```
proxy/
├── app/
│   ├── api/
│   │   └── proxy/
│   │       └── route.ts    # Proxy API route
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main UI
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```
