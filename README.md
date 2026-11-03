This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Os links oficiais para download do aplicativo estão centralizados em `lib/appDownload.ts` e são usados nos botões de toda a página.

# Topic discovery integration

The home page retains its institutional/product content, with account entry and
the full navigation restored in the navbar. The `/topicos` feed and
`/topicos/[topicId]` pages require an authenticated account. Free accounts see
the capped public preview there; Premium access is verified separately by the
backend. Sign-in and sign-up use Supabase Auth with SSR cookie handling. Every
App Store/Google Play download group also offers **Ver na web**, which routes
visitors through `/conta` to the topic feed. Premium subscriptions are **not**
sold on the website; purchases remain in the mobile apps.

## Environment

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase
	Auth client values. Do not use a service-role key here.
- `SPECTRUM_API_URL`: server-only origin for the Prisma Spectrum API.
- `NEXT_PUBLIC_PRISMA_PREMIUM_LINK`: the app's verified Universal Link / Android
	App Link or scheme that opens the Premium screen. Set this only after the app
	team confirms the actual link. Store installation links remain visible as a
	fallback.
- Existing `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are used only by the
	website's existing analytics route; they are never sent to the browser.

The site proxy requests the public feed using exactly `limit=3&offset=0`, ignores
public pagination/search parameters, and allowlists public topic and preview
article fields before returning them. Premium feed/search/detail requests are
made server-side with the validated Supabase access token and `Cache-Control:
private, no-store`; the Spectrum API must revalidate JWT and Premium entitlement
on every protected request. A lost entitlement or rejected token falls back to
the public preview. Feed limits are validated server-side (50 for feed, 30 for
search; search length 2–120).

## Required deployment/backend follow-up

The configured repository contains the landing site and analytics endpoint, but
not the Prisma Spectrum API implementation, its endpoint schemas/tests, or the
mobile app's Universal/App Links configuration. Consequently, this change cannot
enforce the three-topic ceiling against callers who bypass this website and call
the public API directly. The API deployment must clamp public feed access to the
first three published topics irrespective of `limit`, `offset`, or query
variants, keep Premium fields out of public detail responses, retain its
Premium route authorization, and add bypass/free/Premium/expired-token tests.
The API CORS allowlist should contain only the production site and approved
preview origins. Confirm its actual response schemas (especially
`GET /auth/subscription` and topic field names) against its OpenAPI/tests before
production rollout; the website fails closed to public preview when Premium
status cannot be verified.

The mobile app team must provide the Premium-screen app link and configure
Apple Associated Domains plus `apple-app-site-association`, and Android
`assetlinks.json`/intent filters, if Universal/App Links are used. Allow the
Supabase `/auth/callback` URL for production and preview domains in the Supabase
Auth redirect allowlist. Do not add a website checkout, RevenueCat webhook call,
or payment-sync call to this site.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
