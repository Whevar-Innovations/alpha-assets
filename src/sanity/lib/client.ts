import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // Use CDN for read-only fast fetching
});
