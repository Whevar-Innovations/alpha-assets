import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const generateKey = () => Math.random().toString(36).substring(2, 9)

const createLink = (label: string, linkType: string, path: string = '') => {
  const base = { _key: generateKey(), _type: 'footerLink', label, linkType }
  if (linkType === 'custom') return { ...base, customPath: path }
  return base
}

const footerContent = [
  {
    _key: generateKey(),
    _type: 'footerColumn',
    title: 'Company',
    links: [
      createLink('Investment Philosophy', 'custom', '/about#investment-philosophy'),
      createLink('Our People', 'custom', '/about#our-team'),
      createLink('Corporate Governance', 'custom', '/about#corporate-governance'),
    ]
  },
  {
    _key: generateKey(),
    _type: 'footerColumn',
    title: 'Helpful Links',
    links: [
      createLink('Privacy Policy', 'custom', '/legal/privacy-policy'),
      createLink('Terms of Use', 'custom', '/legal/terms-of-use'),
      createLink('Cookie Policy', 'custom', '/legal/cookie-policy'),
      createLink('Careers', 'custom', '/careers'),
    ]
  },
  {
    _key: generateKey(),
    _type: 'footerColumn',
    title: 'Resources',
    links: [
      createLink('Macro Insights', 'custom', '/news?category=Market+Update#articles'),
      createLink('Finance knowledge', 'custom', '/news?category=Investment+Advice#articles'),
      createLink('Market research', 'custom', '/news?category=Market+Update#articles'),
      createLink('Risk advisory', 'none')
    ]
  }
]

async function seed() {
  console.log('Fetching siteSettings...')
  const doc = await client.getDocument('siteSettings')
  
  if (!doc) {
    console.log('Creating siteSettings document...')
    await client.create({ _id: 'siteSettings', _type: 'siteSettings', footerContent })
  } else {
    console.log('Patching existing siteSettings document...')
    await client.patch('siteSettings').set({ footerContent }).commit()
  }
  
  console.log('✅ Footer seeded successfully!')
}

seed().catch((err) => {
  console.error('❌ Error seeding footer:', err)
  process.exit(1)
})
