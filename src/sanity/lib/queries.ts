export const HOME_QUERY = `*[_type == "homePage" && _id == "homePage"][0]{
  pageVisible, seo, heroVisible, hero{ heading, highlightText, subtext,
    backgroundImage{ image{ asset->{url, metadata} }, alt },
    ctaButtons[]{ label, linkType, url, variant, isVisible }
  },
  servicesVisible, servicesHeading, servicesSubtext,
  servicesList[@->isActive == true]->{ _id, title, slug, shortDescription, icon, order },
  howWeWorkVisible, howWeWorkSubtitle, howWeWorkHeading, howWeWorkItems[],
  partnersVisible, partnersHeading, partnerLogos[]{ name, logo, url },
  faqVisible, faqHeading, faqSubtext, faqItems[],
  footerCtaVisible, footerCtaText, footerCtaBoldText, footerCtaButton
}`;

export const ABOUT_QUERY = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  pageVisible, seo,
  heroVisible, hero{ heading, backgroundImage{ image{ asset->{url, metadata} }, alt }, ctaButton{ label, linkType, url, variant, isVisible } },
  introVisible, introHeading, introParagraphs,
  quoteVisible,
  quoteLeftImage{ image{ asset->{url, metadata} }, alt },
  quoteText, quoteAuthor, quoteAuthorTitle,
  quoteRightImage{ image{ asset->{url, metadata} }, alt },
  coreValuesVisible, coreValuesSubtitle, coreValuesHeading, coreValues[],
  committeeVisible, committeeHeading, committeeText,
  teamVisible, teamSubtitle, teamHeading,
  teamMembers[@->isActive == true]->{_id, name, role, category, photo{ image{ asset->{url, metadata} }, alt }, bio, order} | order(order asc)
}`;

export const INVEST_QUERY = `*[_type == "investPage" && _id == "investPage"][0]{
  pageVisible, seo, heroVisible, hero{ heading, backgroundImage{ image{ asset->{url, metadata} }, alt }, ctaButton{ label, linkType, url, variant, isVisible } },
  servicesVisible, servicesSubtitle, servicesHeading,
  servicesList[@->isActive == true]->{ _id, title, slug, shortDescription, icon, order }
}`;

export const NEWS_QUERY = `*[_type == "newsPage" && _id == "newsPage"][0]{
  pageVisible, seo, heroVisible, hero{ heading, backgroundImage{ image{ asset->{url, metadata} }, alt }, ctaButton{ label, linkType, url, variant, isVisible } }
}`;

export const CONTACT_QUERY = `*[_type == "contactPage" && _id == "contactPage"][0]{
  pageVisible, seo, heroVisible, hero{ heading, backgroundImage{ image{ asset->{url, metadata} }, alt }, ctaButton{ label, linkType, url, variant, isVisible } },
  contactVisible, contactHeading, contactSubtext,
  formVisible, formHeading, formSuccessHeading, formSuccessMessage
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
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

export const SERVICE_DETAIL_QUERY = `*[_type == "service" && slug.current == $slug && isActive == true][0]{
  title, slug, category, description,
  detailImage, featuresVisible, bulletsTitle, bullets, factsheetVisible, factsheet{ asset->{url, originalFilename} }
}`;

export const ALL_SERVICES_QUERY = `*[_type == "service" && isActive == true] | order(order asc){
  _id, title, slug, shortDescription, icon, order
}`;

export const ARTICLES_QUERY = `*[_type == "article" && isActive == true] | order(publishedAt desc){
  _id, title, slug, excerpt, coverImage, category, publishedAt, readTime,
  author->{ name, photo }
}`;

export const ARTICLE_DETAIL_QUERY = `*[_type == "article" && slug.current == $slug && isActive == true][0]{
  title, slug, excerpt, coverImage, body, category, publishedAt, readTime,
  author->{ name, role, photo, bio }, seo
}`;

export const TEAM_QUERY = `*[_type == "teamMember" && isActive == true] | order(order asc){
  _id, name, role, category, photo, bio, order
}`;

export const POLICY_PAGE_QUERY = `*[_type == "policyPage" && policyType == $slug][0]{
  pageVisible, policyType, lastUpdated, pdfDocument{ asset->{url} }, content
}`;
