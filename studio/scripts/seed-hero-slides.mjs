/**
 * seed-hero-slides.mjs
 *
 * Appends 2 additional hero slides to the homePage document in Sanity.
 * Uses setIfMissing + merge logic to be idempotent — safe to re-run.
 *
 * Usage (from the /studio directory):
 *   $env:SANITY_API_TOKEN="your-token"
 *   node scripts/seed-hero-slides.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ─── Slide copy ───────────────────────────────────────────────────────────────
const NEW_SLIDES = [
  {
    _type: 'heroSlide',
    _key: 'hero-slide-2',
    heading: 'Preserving capital,',
    highlightText: 'growing wealth across generations',
    subtext:
      'From pension mandates to private credit — disciplined risk management that protects and compounds wealth over the long term.',
    ctaButtons: [
      {
        _type: 'ctaButton',
        _key: 'cta-s2-1',
        label: 'Speak to an Advisor',
        linkType: 'internal',
        url: '/contact',
        variant: 'primary',
        isVisible: true,
      },
    ],
  },
  {
    _type: 'heroSlide',
    _key: 'hero-slide-3',
    heading: "Unlocking returns in",
    highlightText: "Africa's private markets",
    subtext:
      'Direct lending, private equity and bespoke advisory for sophisticated investors seeking superior risk-adjusted income.',
    ctaButtons: [
      {
        _type: 'ctaButton',
        _key: 'cta-s3-1',
        label: 'Explore Our Strategies',
        linkType: 'internal',
        url: '/invest',
        variant: 'white',
        isVisible: true,
      },
    ],
  },
];

// ─── Runner ───────────────────────────────────────────────────────────────────
async function seed() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set.');
    process.exit(1);
  }

  console.log('🔍  Fetching current homePage heroSlides…');
  const homePage = await client.fetch('*[_id == "homePage"][0]{ heroSlides }');

  const existingSlides = homePage?.heroSlides ?? [];
  console.log(`   Found ${existingSlides.length} existing slide(s).`);

  // Remove any slides whose _key matches the new ones (idempotent)
  const newKeys = new Set(NEW_SLIDES.map((s) => s._key));
  const preserved = existingSlides.filter((s) => !newKeys.has(s._key));

  // Merge: keep existing (non-colliding) slides first, append new ones, cap at 3
  const merged = [...preserved, ...NEW_SLIDES].slice(0, 3);

  console.log(`📝  Writing ${merged.length} slide(s) to homePage…`);

  await client.patch('homePage').set({ heroSlides: merged }).commit();

  console.log('\n✅  Done! Hero slides updated:');
  merged.forEach((s, i) =>
    console.log(`   ${i + 1}. "${s.heading ?? ''} ${s.highlightText ?? ''}"`)
  );
  console.log('\nView them in Sanity Studio → Home Page → Hero Banner tab.');
}

seed().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
