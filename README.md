# RateCutter

Merchant credit card processing savings calculator. Helps businesses instantly see how much they could save on processing fees.

## Features

- **Quick Input**: Enter business type, monthly volume, and fees
- **Instant Calculations**: See your effective rate and benchmark comparison
- **Savings Proposal**: Get a proposed rate 0.5% lower than current
- **Lead Capture**: Save proposals via email

## Tech Stack

- React + Vite
- Tailwind CSS
- Supabase for database/auth
- Vercel for hosting

## Development

```bash
cd web
npm install
npm run dev
```

## Deployment

1. Push to GitHub
2. Connect Vercel project
3. Configure environment variables
4. Deploy

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
