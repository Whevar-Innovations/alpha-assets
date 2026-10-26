import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  const publishedDoc = await client.getDocument('careersPage');
  if (publishedDoc) {
    const draftDoc = {
      ...publishedDoc,
      _id: 'drafts.careersPage',
    };
    await client.createOrReplace(draftDoc);
    console.log('Synchronized drafts.careersPage with published document.');
  }
}

main().catch(console.error);
