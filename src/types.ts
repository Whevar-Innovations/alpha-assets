export interface SanityImage {
  asset?: { url?: string };
  image?: unknown;
  url?: string;
  alt?: string;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface CTAButton {
  label: string;
  linkType: 'internal' | 'external';
  url: string;
  variant: 'primary' | 'secondary' | 'white' | 'outline';
  isVisible: boolean;
}

export interface HeroData {
  heading?: string;
  highlightText?: string;
  subtext?: string;
  backgroundImage?: SanityImage;
  ctaButtons?: CTAButton[];
}

// A single slide in the hero carousel — same shape as HeroData
export type HeroSlide = HeroData;

export interface VideoFeatureItem {
  _key?: string;
  youtubeUrl: string;
  thumbnail?: SanityImage;
  watchLabel?: string;
  quoteText?: string;
  speakerPhoto?: SanityImage;
  speakerName?: string;
  speakerTitle?: string;
}

export interface ServiceItem extends FooterCTAData {
  _id: string;
  title: string;
  slug?: { current: string };
  shortDescription?: string;
  icon?: { name?: string };
  category?: string;
  description?: unknown;
  detailImage?: SanityImage;
  featuresVisible?: boolean;
  bulletsTitle?: string;
  bullets?: { _type: 'serviceFeatureItem'; _key?: string; text: string; isVisible?: boolean }[];
  factsheetVisible?: boolean;
  factsheet?: { asset?: { url?: string; originalFilename?: string } };
  order?: number;
  isActive?: boolean;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  category: 'leadership' | 'board';
  bio: string;
  photo?: SanityImage;
  order?: number;
}

export interface ArticleCategoryItem {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  order?: number;
}

export interface ArticleItem {
  _id: string;
  title: string;
  slug?: { current: string };
  category?: string;
  categorySlug?: string;
  excerpt?: string;
  readTime?: number | string;
  publishedAt?: string;
  coverImage?: SanityImage;
  body?: unknown[];
  isFeatured?: boolean;
  author?: { name: string; role?: string; photo?: SanityImage; bio?: string };
}

export interface PartnerLogoItem {
  name: string;
  logo?: SanityImage;
  url?: string;
  isVisible?: boolean;
}

export interface FooterCTAData {
  footerCtaVisible?: boolean;
  footerCtaText?: string;
  footerCtaBoldText?: string;
  footerCtaButton?: CTAButton;
}

export interface HomePageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  heroSlides?: HeroSlide[];
  hero?: HeroData;
  videoFeaturesVisible?: boolean;
  videoFeatures?: VideoFeatureItem[];
  servicesVisible?: boolean;
  servicesHeading?: string;
  servicesSubtext?: string;
  servicesList?: ServiceItem[];
  howWeWorkVisible?: boolean;
  howWeWorkSubtitle?: string;
  howWeWorkHeading?: string;
  howWeWorkItems?: { title: string; description: string; icon?: { name?: string }; isVisible?: boolean }[];
  partnersVisible?: boolean;
  partnersSubtitle?: string;
  partnersHeading?: string;
  partnersSubtext?: string;
  partnerLogos?: PartnerLogoItem[];
  faqVisible?: boolean;
  faqHeading?: string;
  faqSubtext?: string;
  faqItems?: { question: string; answer: string; isVisible?: boolean }[];
}

export interface PageHeaderData {
  heading?: string;
  backgroundImage?: SanityImage;
  ctaButton?: CTAButton;
}

export interface AboutPageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
  introVisible?: boolean;
  introHeading?: string;
  introParagraphs?: unknown[];
  videoFeaturesVisible?: boolean;
  videoFeatures?: VideoFeatureItem[];
  quoteVisible?: boolean;
  quoteLeftImage?: SanityImage;
  quoteText?: string;
  quoteAuthor?: string;
  quoteAuthorTitle?: string;
  quoteRightImage?: SanityImage;
  coreValuesVisible?: boolean;
  coreValuesSubtitle?: string;
  coreValuesHeading?: string;
  coreValues?: { title: string; description: string; icon?: { name?: string }; isVisible?: boolean }[];
  committeeVisible?: boolean;
  committeeHeading?: string;
  committeeText?: unknown[];
  teamVisible?: boolean;
  teamSubtitle?: string;
  teamHeading?: string;
  teamMembers?: TeamMember[];
}

export interface StrategyItem {
  _key?: string;
  title: string;
  description: string;
}

export interface InvestPageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
  strategiesVisible?: boolean;
  strategiesHeading?: string;
  strategiesDescription?: string;
  strategiesList?: StrategyItem[];
  servicesVisible?: boolean;
  servicesSubtitle?: string;
  servicesHeading?: string;
  servicesList?: ServiceItem[];
}

export interface NewsPageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
}

export interface ContactPageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
  contactVisible?: boolean;
  contactHeading?: string;
  contactSubtext?: string;
  formVisible?: boolean;
  formHeading?: string;
  formSuccessHeading?: string;
  formSuccessMessage?: string;
}

export interface FooterLink {
  label: string;
  linkType: 'internal' | 'external' | 'custom' | 'file' | 'none';
  externalUrl?: string;
  customPath?: string;
  sectionAnchor?: string;
  fileUrl?: string;
  fileName?: string;
  internalLink?: {
    _type: string;
    title?: string;
    slug?: string;
    policyType?: string;
  };
}

export interface SocialLink {
  platform: 'Facebook' | 'X' | 'LinkedIn' | 'Instagram' | 'YouTube' | 'TikTok';
  url: string;
  isVisible?: boolean;
}

export interface SiteSettingsData extends FooterCTAData {
  navItems?: { label: string; path: string; isDisabled: boolean; order?: number; isVisible?: boolean }[];
  primaryLogo?: SanityImage;
  whiteLogo?: SanityImage;
  socialLinks?: SocialLink[];
  contactInfo?: { address?: string; phone?: string; email?: string; officeHours?: string };
  regulatoryText?: string;
  copyrightText?: string;
  footerContent?: { title: string; links?: FooterLink[] }[];
}

export interface PolicyPageData {
  pageVisible?: boolean;
  policyType?: string;
  lastUpdated?: string;
  pdfDocument?: { asset?: { url?: string } };
  content?: unknown[];
}

export interface JobVacancyItem {
  _id: string;
  title: string;
  slug?: { current: string };
  department?: string;
  location?: string;
  employmentType?: string;
  datePosted?: string;
  deadline?: string;
  summary?: string;
  description?: unknown[];
  applicationType?: 'Email' | 'External Link';
  applicationEmail?: string;
  applicationUrl?: string;
  showApplyButton?: boolean;
  status?: 'Open' | 'Closed' | 'Draft';
  order?: number;
  seo?: SEOData;
}

export interface CareersPageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
  introHeading?: string;
  introDescription?: string;
  noVacanciesTitle?: string;
  noVacanciesMessage?: string;
}

export interface PensionAdvantageItem {
  _key?: string;
  title: string;
  description: string;
  icon?: { name?: string };
  isVisible?: boolean;
}

export interface PensionFAQItem {
  _key?: string;
  id?: string;
  question: string;
  answer: string;
  isVisible?: boolean;
}

export interface PensionCalculatorPageData extends FooterCTAData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  heroSubtitle?: string;
  heroHeading?: string;
  heroDescription?: string;
  advantagesVisible?: boolean;
  advantagesSubtitle?: string;
  advantagesHeading?: string;
  advantagesItems?: PensionAdvantageItem[];
  faqVisible?: boolean;
  faqSubtitle?: string;
  faqHeading?: string;
  faqItems?: PensionFAQItem[];
}
