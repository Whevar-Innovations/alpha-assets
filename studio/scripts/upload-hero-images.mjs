/**
 * upload-hero-images.mjs
 *
 * Uploads slide 2 and slide 3 background images to Sanity asset store,
 * then patches the homePage heroSlides array with the image references.
 *
 * Usage (from /studio directory):
 *   $env:SANITY_API_TOKEN="your-token"
 *   node scripts/upload-hero-images.mjs
 */
import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const IMAGES = [
  {
    slideKey: 'hero-slide-2',
    filePath: resolve(__dirname, '../../src/assets/images/hero_slide_2.jpg'),
    filename: 'hero_slide_2.jpg',
    alt: 'Wealth preservation — financial advisor with clients',
  },
  {
    slideKey: 'hero-slide-3',
    filePath: resolve(__dirname, '../../src/assets/images/hero_slide_3.jpg'),
    filename: 'hero_slide_3.jpg',
    alt: "Africa's private markets — investment professional with city skyline",
  },
];

async function uploadImage({ filePath, filename }) {
  console.log(`   Uploading ${filename}…`);
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  });
  console.log(`   ✅ Uploaded → ${asset._id}`);
  return asset;
}

async function run() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set.');
    process.exit(1);
  }

  // Fetch current slides so we preserve all fields
  console.log('🔍  Fetching current heroSlides…');
  const doc = await client.fetch('*[_id == "homePage"][0]{ heroSlides }');
  const slides = doc?.heroSlides ?? [];

  if (slides.length === 0) {
    console.error('❌  No heroSlides found in homePage. Run fix-hero-slides.mjs first.');
    process.exit(1);
  }

  console.log(`   Found ${slides.length} slide(s). Uploading images…\n`);

  // Upload images and build a map of slideKey → asset
  const assetMap = {};
  for (const img of IMAGES) {
    const asset = await uploadImage(img);
    assetMap[img.slideKey] = { asset, alt: img.alt };
  }

  // Patch each slide in-place with its background image
  const patched = slides.map((slide) => {
    if (assetMap[slide._key]) {
      const { asset, alt } = assetMap[slide._key];
      return {
        ...slide,
        backgroundImage: {
          _type: 'imageWithAlt',
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
          alt,
        },
      };
    }
    return slide;
  });

  console.log('\n📝  Patching homePage with image references…');
  await client.patch('homePage').set({ heroSlides: patched }).commit();

  console.log('\n✅  All done! Slides updated with background images:');
  patched.forEach((s, i) => {
    const hasImg = !!s.backgroundImage;
    console.log(`   ${i + 1}. "${s.heading}" — image: ${hasImg ? '✅' : '⬜ none'}`);
  });
}

run().catch((err) => { console.error('❌', err.message); process.exit(1); });
