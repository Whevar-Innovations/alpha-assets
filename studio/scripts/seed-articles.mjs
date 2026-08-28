/**
 * seed-articles.mjs
 *
 * Seeds the Sanity "production" dataset with fallback article data.
 * Uses the Sanity client directly — no external dependencies beyond
 * what is already installed in the studio workspace.
 *
 * Usage (from the /studio directory):
 *   node scripts/seed-articles.mjs
 *
 * Safety:
 *   - Each article is keyed by a stable _id.
 *   - Uses createOrReplace so re-running is idempotent (safe to run multiple times).
 *   - Only touches documents whose _id starts with "seed-article-".
 */

import { createClient } from '@sanity/client';

// ─── Sanity client config (matches sanity.cli.ts) ────────────────────────────
const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  // The script needs a token with write access.
  // Set the SANITY_API_TOKEN environment variable before running:
  //   $env:SANITY_API_TOKEN = "your-token-here"   (PowerShell)
  token: process.env.SANITY_API_TOKEN,
});

// ─── Seed data (mirrors fallbackArticles in News.tsx) ────────────────────────
const articles = [
  {
    _id: 'seed-article-1',
    _type: 'article',
    isActive: true,
    title: 'East African Macroeconomic Outlook for H2 2026',
    slug: { _type: 'slug', current: 'east-african-macroeconomic-outlook-h2-2026' },
    excerpt:
      'An in-depth analysis of monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania.',
    category: 'Market Update',
    publishedAt: '2026-07-10T00:00:00Z',
    readTime: '6 min read',
  },
  {
    _id: 'seed-article-2',
    _type: 'article',
    isActive: true,
    title: 'Building a Resilient Portfolio: The Case for Private Credit',
    slug: { _type: 'slug', current: 'building-resilient-portfolio-private-credit' },
    excerpt:
      'Discover why sophisticated investors are moving towards senior secured debt funds to secure yields in volatile markets.',
    category: 'Investment Advice',
    publishedAt: '2026-06-28T00:00:00Z',
    readTime: '4 min read',
  },
];

// ─── Seed runner ─────────────────────────────────────────────────────────────
async function seed() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set.');
    console.error(
      '   Get a token from https://www.sanity.io/manage → your project → API → Tokens',
    );
    console.error('   Then run:  $env:SANITY_API_TOKEN="your-token"  (PowerShell)');
    process.exit(1);
  }

  console.log(`🌱  Seeding ${articles.length} article(s) into dataset "production"…\n`);

  const transaction = client.transaction();
  for (const article of articles) {
    transaction.createOrReplace(article);
  }

  try {
    const result = await transaction.commit();
    console.log('✅  Done! Documents written:');
    result.results.forEach((r) => console.log(`    • ${r.id}`));
    console.log('\nYou can now view and edit them in Sanity Studio under "Articles".');
  } catch (err) {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
