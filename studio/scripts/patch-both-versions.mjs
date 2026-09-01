/**
 * patch-both-versions.mjs
 *
 * Patches BOTH the published ("homePage") and draft ("drafts.homePage")
 * versions of the Home Page document with the full hero slides array.
 * This ensures what you see in Sanity Studio matches what is published.
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
    backgroundImage: {
      _type: 'imageWithAlt',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-caa8098801116fc1abc2d19616af5b7144bdce37-1376x768-jpg' },
      },
      alt: 'Wealth preservation — financial advisor with clients',
    },
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
    backgroundImage: {
      _type: 'imageWithAlt',
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-383ac905490c6d0688b0f41958607f334cbe937d-1376x768-jpg' },
      },
      alt: "Africa's private markets — investment professional with city skyline",
    },
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

  const ids = ['homePage', 'drafts.homePage'];

  for (const id of ids) {
    try {
      // Check if document exists first
      const exists = await client.fetch(`*[_id == "${id}"][0]{ _id }`);

      if (!exists) {
        if (id === 'drafts.homePage') {
          // Create the draft by duplicating the published doc structure
          console.log(`   drafts.homePage does not exist — creating it…`);
          const published = await client.fetch('*[_id == "homePage"][0]');
          if (published) {
            const draft = { ...published, _id: 'drafts.homePage', heroSlides: SLIDES };
            delete draft._rev;
            await client.createOrReplace(draft);
            console.log(`   ✅ Created drafts.homePage with slides.`);
          }
        } else {
          console.log(`   ⚠️  ${id} not found — skipping.`);
        }
        continue;
      }

      console.log(`📝  Patching "${id}"…`);
      await client.patch(id).set({ heroSlides: SLIDES }).commit();
      console.log(`   ✅  Done.`);
    } catch (err) {
      console.error(`   ❌  Failed to patch ${id}: ${err.message}`);
    }
  }

  console.log('\n✅  Both versions updated. In Sanity Studio:');
  console.log('   1. You should now see 3 slides under Hero Slides.');
  console.log('   2. Click "Publish" to make the draft the live version.');
  SLIDES.forEach((s, i) =>
    console.log(`      Slide ${i + 1}: "${s.heading} ${s.highlightText}"`)
  );
}

run().catch((err) => { console.error('❌', err.message); process.exit(1); });
