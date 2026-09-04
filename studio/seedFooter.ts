import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const generateKey = () => Math.random().toString(36).substring(2, 9)

const createLink = (label: string, linkType: string, path: string = '') => {
  const base = { _key: generateKey(), label, linkType }
  if (linkType === 'custom') return { ...base, customPath: path }
  return base
}

const footerContent = [
  {
    _key: generateKey(),
    title: 'Helpful Links',
    links: [
      createLink('Privacy Policy', 'custom', '/legal/privacy-policy'),
      createLink('Terms of Use', 'custom', '/legal/terms-of-use'),
      createLink('Cookie Policy', 'custom', '/legal/cookie-policy'),
      createLink('Risk Disclosures', 'custom', '/legal/risk-disclosures'),
      createLink('Complaints Procedure', 'custom', '/legal/complaints-procedure'),
      createLink('Regulatory Information', 'custom', '/legal/regulatory-information')
    ]
  },
  {
    _key: generateKey(),
    title: 'Resources',
    links: [
      createLink('Finance knowledge', 'none'),
      createLink('Market research', 'none'),
      createLink('Steps for 2026', 'none'),
      createLink('Risk advisory', 'none')
    ]
  },
  {
    _key: generateKey(),
    title: 'Company',
    links: [
      createLink('Investment Philosophy', 'custom', '/about'),
      createLink('Our People', 'custom', '/about'),
      createLink('Corporate Governance', 'custom', '/about'),
      createLink('Macro Insights', 'custom', '/about')
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
