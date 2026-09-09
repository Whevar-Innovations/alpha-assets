import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function run() {
  const res = await client.fetch('*[_id in ["siteSettings", "drafts.siteSettings"]]{ _id, footerContent }');
  console.log(JSON.stringify(res, null, 2));
}

run().catch(console.error);
