# Indicus Paints — Headless WordPress + Next.js

## Commands
```bash
npm run dev      # Start dev server (Turbopack) on port 3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
npx tsc --noEmit # Type-check without emitting
```

## Architecture
- **Next.js 16** App Router with TypeScript + Tailwind CSS v4
- **WordPress** at `indicus.in` as headless CMS via WPGraphQL + REST API fallback
- **Data**: GraphQL for products/posts/pages, REST API for ACF fields and colors (color CPT not in GraphQL yet)
- **ISR**: 1-hour revalidation, on-demand via `POST /api/revalidate?secret=`

## Key Files
- `src/lib/wordpress.ts` — GraphQL client (fetchGraphQL)
- `src/lib/queries/` — All data fetching (products, colours, posts, homepage, pages, search)
- `src/lib/sanitize.ts` — HTML sanitization for WordPress content (XSS prevention)
- `src/types/wordpress.ts` — TypeScript interfaces for all WordPress data
- `src/components/layout/` — Header, Footer, GTM, WhatsApp widget
- `wordpress/mu-plugins/` — WordPress plugin for GraphQL support (upload to WP)

## Gotchas
- Product taxonomy fields return **singular** names from GraphQL: `applicationArea`, `productType`, `applicationSurface`, `finish` — NOT plurals
- The `color` CPT is NOT registered in WPGraphQL. Install `wordpress/mu-plugins/indicus-graphql-support.php` to fix
- ACF fields on products are NOT in GraphQL — fetched via REST API (`getProductACFFields`)
- Homepage ACF fields also use REST API fallback (`getHomepage`)
- `colourCategories` field in GraphQL uses `coloursCategoryFields` (note the 's')
- `categoryColour` returns hex string like `"#9c624b"`, not RGBA object
- CSS uses both Tailwind utilities AND custom classes ported from WP theme (`btn-fill`, `btn-purple`, `section-heading`, `footer__nav--*`)

## Environment
Required in `.env.local`:
```
NEXT_PUBLIC_WORDPRESS_URL=https://indicus.in
WORDPRESS_GRAPHQL_URL=https://indicus.in/graphql
NEXT_PUBLIC_GTM_ID=GTM-NGLW2763
NEXT_PUBLIC_WHATSAPP_NUMBER=919843005719
NEXT_PUBLIC_SITE_URL=https://indicus.in
REVALIDATION_SECRET=<random-secret>
```

## Code Style
- All WordPress HTML rendered via `sanitizeHTML()` from `@/lib/sanitize`
- Forms use `/api/contact` route which forwards to Zoho CRM
- Font: CeraPro (Regular/Medium/Bold/Black) loaded from `/public/fonts/`
- Primary brand color: `#7031BB` (purple), secondary: `#01D3B9` (teal)
