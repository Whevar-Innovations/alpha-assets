import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const docs = await client.fetch('*[_type == "siteSettings"]{ _id, footerContent }');
  console.log(JSON.stringify(docs, null, 2));
}

run().catch(console.error);
