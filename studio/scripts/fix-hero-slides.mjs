/**
 * fix-hero-slides.mjs
 *
 * Reads current heroSlides from Sanity, logs them, then writes the
 * full correct set of 3 slides (overwriting whatever is there).
 * Idempotent — safe to re-run.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const SLIDES = [
  {
    _type: 'heroSlide',
    _key: 'hero-slide-1',
    heading: 'Institutional investment management,',
    highlightText: 'built for East Africa',
    subtext: 'We design transparent, risk-controlled portfolios for\ninstitutions, family offices and private clients.',
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
  },
  {
    _type: 'heroSlide',
    _key: 'hero-slide-2',
    heading: 'Preserving capital,',
    highlightText: 'growing wealth across generations',
    subtext: 'From pension mandates to private credit — disciplined risk management that protects and compounds wealth over the long term.',
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
    heading: 'Unlocking returns in',
    highlightText: "Africa's private markets",
    subtext: 'Direct lending, private equity and bespoke advisory for sophisticated investors seeking superior risk-adjusted income.',
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

async function run() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set.');
    process.exit(1);
  }

  // Inspect what is currently stored
  const doc = await client.fetch('*[_id == "homePage"][0]{ heroSlides }');
  console.log('\n📋  Current heroSlides in Sanity:');
  console.log(JSON.stringify(doc?.heroSlides ?? [], null, 2));

  // Overwrite with the correct full set
  console.log('\n📝  Writing all 3 correct slides…');
  await client.patch('homePage').set({ heroSlides: SLIDES }).commit();

  console.log('\n✅  Done! heroSlides now set to:');
  SLIDES.forEach((s, i) =>
    console.log(`   ${i + 1}. "${s.heading} ${s.highlightText}"`)
  );
}

run().catch((err) => { console.error('❌', err.message); process.exit(1); });
