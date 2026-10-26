import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

interface CategorySeed {
  _id: string
  title: string
  slug: string
  description: string
  order: number
}

const DEFAULT_CATEGORIES: CategorySeed[] = [
  {
    _id: 'category-market-update',
    title: 'Market Update',
    slug: 'market-update',
    description: 'Macroeconomic outlooks, monetary policy shifts, and market research across East Africa.',
    order: 1,
  },
  {
    _id: 'category-investment-advice',
    title: 'Investment Advice',
    slug: 'investment-advice',
    description: 'Portfolio construction, financial knowledge, and asset allocation insights.',
    order: 2,
  },
  {
    _id: 'category-company-news',
    title: 'Company News',
    slug: 'company-news',
    description: 'Corporate announcements, milestones, and updates from Alpha Asset Managers.',
    order: 3,
  },
]

const toSlug = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

async function run() {
  console.log('1. Seeding default Article Categories...')
  const categoryMap = new Map<string, string>()

  for (const cat of DEFAULT_CATEGORIES) {
    await client.createOrReplace({
      _id: cat._id,
      _type: 'articleCategory',
      isActive: true,
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      order: cat.order,
    })
    categoryMap.set(cat.title.toLowerCase(), cat._id)
    console.log(`   ✅ Created/Updated category "${cat.title}" (${cat._id})`)
  }

  console.log('2. Checking existing articles for string categories to migrate...')
  const articles = await client.fetch<
    Array<{ _id: string; title: string; category?: unknown }>
  >(`*[_type == "article"]{ _id, title, category }`)

  let nextOrder = DEFAULT_CATEGORIES.length + 1
  for (const article of articles) {
    if (typeof article.category === 'string' && article.category.trim().length > 0) {
      const catTitle = article.category.trim()
      let categoryId = categoryMap.get(catTitle.toLowerCase())

      if (!categoryId) {
        const slug = toSlug(catTitle)
        categoryId = `category-${slug}`
        await client.createOrReplace({
          _id: categoryId,
          _type: 'articleCategory',
          isActive: true,
          title: catTitle,
          slug: { _type: 'slug', current: slug },
          order: nextOrder++,
        })
        categoryMap.set(catTitle.toLowerCase(), categoryId)
        console.log(`   ✅ Created custom category from article: "${catTitle}" (${categoryId})`)
      }

      await client
        .patch(article._id)
        .set({
          category: {
            _type: 'reference',
            _ref: categoryId,
          },
        })
        .commit()
      console.log(`   🔄 Migrated article "${article.title}" (${article._id}) → ref(${categoryId})`)
    }
  }

  console.log('3. Updating Footer Resources links in siteSettings to reference Article Categories directly...')
  const footerContent = [
    {
      _key: '359b1cde5f77',
      _type: 'footerColumn',
      title: 'Company',
      links: [
        {
          _key: 'ad0e60ef51dd',
          _type: 'footerLink',
          label: 'Investment Philosophy',
          linkType: 'internal',
          internalLink: { _type: 'reference', _ref: 'aboutPage' },
          sectionAnchor: '#investment-philosophy',
        },
        {
          _key: 'd2b86881c0f3',
          _type: 'footerLink',
          label: 'Our People',
          linkType: 'internal',
          internalLink: { _type: 'reference', _ref: 'aboutPage' },
          sectionAnchor: '#our-team',
        },
        {
          _key: '3dbfecc09f48',
          _type: 'footerLink',
          label: 'Corporate Governance',
          linkType: 'internal',
          internalLink: { _type: 'reference', _ref: 'aboutPage' },
          sectionAnchor: '#corporate-governance',
        },
      ],
    },
    {
      _key: '658ba543d6b2',
      _type: 'footerColumn',
      title: 'Helpful Links',
      links: [
        {
          _key: 'f5542d64835b',
          _type: 'footerLink',
          internalLink: {
            _ref: '321760ea-f0bb-4cfa-9771-c8b56287ba0c',
            _type: 'reference',
          },
          label: 'Privacy Policy',
          linkType: 'internal',
        },
        {
          _key: '43eaffd6b40b',
          _type: 'footerLink',
          customPath: '/legal/terms-of-use',
          label: 'Terms of Use',
          linkType: 'custom',
        },
        {
          _key: 'fc245814ac81',
          _type: 'footerLink',
          customPath: '/legal/cookie-policy',
          label: 'Cookie Policy',
          linkType: 'custom',
        },
        {
          _key: 'ef2d0beb7cdf',
          _type: 'footerLink',
          internalLink: {
            _ref: 'careersPage',
            _type: 'reference',
          },
          label: 'Careers',
          linkType: 'internal',
        },
      ],
    },
    {
      _key: '4bb148b7a7f9',
      _type: 'footerColumn',
      title: 'Resources',
      links: [
        {
          _key: '264e5195ec39',
          _type: 'footerLink',
          label: 'Macro Insights',
          linkType: 'internal',
          internalLink: {
            _type: 'reference',
            _ref: 'category-market-update',
          },
        },
        {
          _key: 'c8932302511a',
          _type: 'footerLink',
          label: 'Finance knowledge',
          linkType: 'internal',
          internalLink: {
            _type: 'reference',
            _ref: 'category-investment-advice',
          },
        },
        {
          _key: 'd79f13ac70f8',
          _type: 'footerLink',
          label: 'Market research',
          linkType: 'internal',
          internalLink: {
            _type: 'reference',
            _ref: 'category-market-update',
          },
        },
        {
          _key: '463cbf8c5c88',
          _type: 'footerLink',
          label: 'Risk advisory',
          linkType: 'none',
        },
      ],
    },
  ]

  for (const docId of ['siteSettings', 'drafts.siteSettings']) {
    const existing = await client.fetch(`*[_id == $id][0]{ _id }`, { id: docId })
    if (existing) {
      await client.patch(docId).set({ footerContent }).commit()
      console.log(`   ✅ Patched ${docId} with direct category & section references`)
    }
  }

  console.log('\n🎉 Dynamic Category Taxonomy migration completed successfully!')
}

run().catch((err) => {
  console.error('❌ Error migrating categories:', err)
  process.exit(1)
})
