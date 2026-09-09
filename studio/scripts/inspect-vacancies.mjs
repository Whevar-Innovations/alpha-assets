import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skWPcUqdeiy5mOt8iQmvuUiDy6M8GjxWPDFFKaKtqUNMGcvfORobmUHosA7GPVp7Uf4ntiACIgsVOhUjGG24oD9ymyMIV6eSnckOIVp80e5jqP4DaSKhLr4mVauFfoIzRwVeqLZtCCOxqmrCt22gjML8K1JqYF8cG3H1a4xVBz63Z4u5JX6l',
});

async function main() {
  const vacancies = await client.fetch('*[_type == "jobVacancy"]{ _id, title, description }');
  console.log('Vacancies found:', vacancies.length);
  for (const v of vacancies) {
    console.log('ID:', v._id, 'Title:', v.title);
    console.log('Description blocks:', JSON.stringify(v.description, null, 2));
  }
}

main().catch(console.error);
