import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skWPcUqdeiy5mOt8iQmvuUiDy6M8GjxWPDFFKaKtqUNMGcvfORobmUHosA7GPVp7Uf4ntiACIgsVOhUjGG24oD9ymyMIV6eSnckOIVp80e5jqP4DaSKhLr4mVauFfoIzRwVeqLZtCCOxqmrCt22gjML8K1JqYF8cG3H1a4xVBz63Z4u5JX6l',
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
