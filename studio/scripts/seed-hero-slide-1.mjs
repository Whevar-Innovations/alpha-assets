/**
 * seed-hero-slide-1.mjs  — prepends the first slide so all 3 are in Sanity.
 * Idempotent: keyed by 'hero-slide-1', safe to re-run.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const SLIDE_1 = {
  _type: 'heroSlide',
  _key: 'hero-slide-1',
  heading: 'Institutional investment management,',
  highlightText: 'built for East Africa',
  subtext:
    'We design transparent, risk-controlled portfolios for\ninstitutions, family offices and private clients.',
  ctaButtons: [
    {
      _type: 'ctaButton',
      _key: 'cta-s1-1',
      label: 'Explore Our Strategies',
      linkType: 'internal',
      url: '/invest',
      variant: 'white',
      isVisible: true,
    },
  ],
};

async function run() {
  const doc = await client.fetch('*[_id == "homePage"][0]{ heroSlides }');
  const existing = doc?.heroSlides ?? [];

  // Remove any previous slide-1 to avoid duplicates, then prepend
  const filtered = existing.filter((s) => s._key !== 'hero-slide-1');
  const merged = [SLIDE_1, ...filtered].slice(0, 3);

  await client.patch('homePage').set({ heroSlides: merged }).commit();

  console.log('✅  All 3 hero slides are now in Sanity:');
  merged.forEach((s, i) =>
    console.log(`   ${i + 1}. "${s.heading} ${s.highlightText}"`)
  );
}

run().catch((err) => { console.error('❌', err.message); process.exit(1); });
