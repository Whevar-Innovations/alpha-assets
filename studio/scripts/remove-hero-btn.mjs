import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skWPcUqdeiy5mOt8iQmvuUiDy6M8GjxWPDFFKaKtqUNMGcvfORobmUHosA7GPVp7Uf4ntiACIgsVOhUjGG24oD9ymyMIV6eSnckOIVp80e5jqP4DaSKhLr4mVauFfoIzRwVeqLZtCCOxqmrCt22gjML8K1JqYF8cG3H1a4xVBz63Z4u5JX6l',
});

async function main() {
  const docs = await client.fetch('*[_type == "careersPage"]{ _id, hero }');
  console.log('Current careersPage docs:', JSON.stringify(docs, null, 2));

  for (const doc of docs) {
    console.log(`Updating ${doc._id}...`);
    await client
      .patch(doc._id)
      .set({
        'hero.ctaButton': {
          isVisible: false,
          label: '',
        },
      })
      .commit();
    console.log(`Updated ${doc._id} successfully.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
