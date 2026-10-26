import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

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
        linkType: 'custom',
        customPath: '/about#investment-philosophy',
      },
      {
        _key: 'd2b86881c0f3',
        _type: 'footerLink',
        label: 'Our People',
        linkType: 'custom',
        customPath: '/about#our-team',
      },
      {
        _key: '3dbfecc09f48',
        _type: 'footerLink',
        label: 'Corporate Governance',
        linkType: 'custom',
        customPath: '/about#corporate-governance',
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
        linkType: 'custom',
        customPath: '/news?category=Market+Update#articles',
      },
      {
        _key: 'c8932302511a',
        _type: 'footerLink',
        label: 'Finance knowledge',
        linkType: 'custom',
        customPath: '/news?category=Investment+Advice#articles',
      },
      {
        _key: 'd79f13ac70f8',
        _type: 'footerLink',
        label: 'Market research',
        linkType: 'custom',
        customPath: '/news?category=Market+Update#articles',
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

const serviceCtaUpdates: Record<string, string> = {
  'pension-and-retirement-mandates': 'Request a Confidential Trustee Briefing',
  'pension-retirement': 'Request a Confidential Trustee Briefing',
  'separately-managed-accounts': 'Request a Confidential Portfolio Review',
  'direct-lending': 'Request a Direct Lending Briefing',
  'direct-lending-fund': 'Request a Direct Lending Briefing',
  'unit-trusts': 'Go to Client Portal',
}

async function run() {
  console.log('1. Updating siteSettings Global Footer CTA...')
  const globalCtaPatch = {
    footerCtaVisible: true,
    footerCtaText: 'Let us help you build a strategy that works for you',
    footerCtaBoldText: 'Start investing today',
    footerCtaButton: {
      _type: 'ctaButton',
      label: 'Request your Confidential Portfolio Review',
      linkType: 'internal',
      url: '/contact',
      variant: 'primary',
      isVisible: true,
    },
  }

  for (const docId of ['siteSettings', 'drafts.siteSettings']) {
    const existing = await client.fetch<{ _id: string; footerContent?: unknown[] } | null>(
      `*[_id == $id][0]{ _id, footerContent }`,
      { id: docId }
    )
    if (existing) {
      const patchData = existing.footerContent?.length
        ? globalCtaPatch
        : { ...globalCtaPatch, footerContent }
      await client.patch(docId).set(patchData).commit()
      console.log(`   ✅ Patched ${docId}`)
    }
  }

  console.log('2. Updating service Footer CTA buttons...')
  const services = await client.fetch<Array<{ _id: string; title: string; slug?: string }>>(
    `*[_type == "service"]{ _id, title, "slug": slug.current }`
  )

  for (const svc of services) {
    const slug = svc.slug ?? ''
    const buttonLabel = serviceCtaUpdates[slug]
    if (!buttonLabel) continue

    await client
      .patch(svc._id)
      .set({
        footerCtaVisible: true,
        footerCtaButton: {
          _type: 'ctaButton',
          label: buttonLabel,
          linkType: 'internal',
          url: '/contact',
          variant: 'primary',
          isVisible: true,
        },
      })
      .commit()
    console.log(`   ✅ Patched service "${svc.title}" (${svc._id}) → "${buttonLabel}"`)
  }

  console.log('\n🎉 All Sanity updates completed successfully!')
}

run().catch((err) => {
  console.error('❌ Error updating Sanity:', err)
  process.exit(1)
})
