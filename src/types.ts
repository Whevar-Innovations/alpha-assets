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

export interface ServiceItem {
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

export interface ArticleItem {
  _id: string;
  title: string;
  slug?: { current: string };
  category?: string;
  excerpt?: string;
  readTime?: number | string;
  publishedAt?: string;
  coverImage?: SanityImage;
  body?: unknown[];
  isFeatured?: boolean;
  author?: { name: string; role?: string; photo?: SanityImage; bio?: string };
}

export interface HomePageData {
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
  partnersHeading?: string;
  partnerLogos?: { name: string; logo: unknown; url?: string; isVisible?: boolean }[];
  faqVisible?: boolean;
  faqHeading?: string;
  faqSubtext?: string;
  faqItems?: { question: string; answer: string; isVisible?: boolean }[];
  footerCtaVisible?: boolean;
  footerCtaText?: string;
  footerCtaBoldText?: string;
  footerCtaButton?: { label: string; linkType?: string; url: string; variant?: string; isVisible?: boolean };
}

export interface PageHeaderData {
  heading?: string;
  backgroundImage?: SanityImage;
  ctaButton?: CTAButton;
}

export interface AboutPageData {
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

export interface InvestPageData {
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

export interface NewsPageData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
}

export interface ContactPageData {
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
  linkType: 'internal' | 'external' | 'custom' | 'none';
  externalUrl?: string;
  customPath?: string;
  internalLink?: {
    _type: string;
    slug?: string;
    policyType?: string;
  };
}

export interface SiteSettingsData {
  navItems?: { label: string; path: string; isDisabled: boolean; order?: number; isVisible?: boolean }[];
  primaryLogo?: SanityImage;
  whiteLogo?: SanityImage;
  socialLinks?: { platform: string; url: string; isVisible?: boolean }[];
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
  status?: 'Open' | 'Closed' | 'Draft';
  order?: number;
  seo?: SEOData;
}

export interface CareersPageData {
  seo?: SEOData;
  pageVisible?: boolean;
  heroVisible?: boolean;
  hero?: PageHeaderData;
  introHeading?: string;
  introDescription?: string;
  noVacanciesTitle?: string;
  noVacanciesMessage?: string;
}
