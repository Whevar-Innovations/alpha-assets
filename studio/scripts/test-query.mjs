import { createClient } from '@sanity/client';

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  navItems[] | order(order asc),
  footerContent[]{
    title,
    links[]{
      label,
      linkType,
      externalUrl,
      customPath,
      internalLink->{
        _type,
        "slug": slug.current,
        policyType
      }
    }
  }, contactInfo, socialLinks[],
  primaryLogo{ image{ asset->{url} }, alt },
  whiteLogo{ image{ asset->{url} }, alt },
  regulatoryText, copyrightText
}`;

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  const data = await client.fetch(SITE_SETTINGS_QUERY);
  console.log(JSON.stringify(data.footerContent, null, 2));
}

run().catch(console.error);
