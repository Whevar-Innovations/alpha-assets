import type { AboutPageData } from '../../types';

export const aboutDefaults: AboutPageData = {
  seo: { metaTitle: '', metaDescription: '', ogImage: undefined },
  pageVisible: true,
  heroVisible: true,
  hero: {
    heading: 'Who We Are',
    highlightText: '',
    subtext: '',
  },
  introVisible: true,
  introHeading: 'For Those Who Want More',
  introParagraphs: [
    {
      _key: 'intro-1',
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'Alpha Asset Managers is an investment management firm dedicated to helping clients grow and preserve wealth through disciplined and well-structured financial strategies.' }],
    },
    {
      _key: 'intro-2',
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'We believe successful investing requires patience, discipline, and clarity. Our investment philosophy focuses on long-term value creation, guided by rigorous research, risk awareness, and strategic asset allocation.' }],
    },
    {
      _key: 'intro-3',
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: "Alpha Asset Managers is a fully licensed fund manager, regulated by Uganda's " },
        { _type: 'span', text: 'Capital Markets Authority (CMA)', marks: ['strong'] },
        { _type: 'span', text: ' ensuring your investments are managed under the highest standards of governance, transparency, and investor protection.' }
      ],
    },
  ],
  quoteVisible: true,
  quoteText: "\"We take a structured approach to investment management from understanding our clients' objectives, developing tailored strategies to diversification across asset classes.\"",
  quoteAuthor: 'Robert Katuntu',
  quoteAuthorTitle: 'Chief Investment Officer',
  coreValuesVisible: true,
  coreValuesSubtitle: 'Core Values',
  coreValuesHeading: "Alpha's defining characteristic is its culture, \\nwhich is shaped by our Core Values.",
  coreValues: [
    { title: 'Clients First', description: 'Invest in long-term relationships with our clients through independent and trusted advice.', icon: { name: 'Users' }, isVisible: true },
    { title: 'Integrity', description: 'Adhere to the principle of doing the ethical thing at all times and in all circumstances.', icon: { name: 'Shield' }, isVisible: true },
    { title: 'Excellence', description: 'Strive to achieve the highest standards of quality across all investment products and reports.', icon: { name: 'Star' }, isVisible: true },
    { title: 'Respect', description: 'Treat all people with the utmost dignity, respect, and professional appreciation.', icon: { name: 'Heart' }, isVisible: true },
    { title: 'Partnership & Collaboration', description: 'Promote a culture of openness, shared metrics, teamwork, and client accountability.', icon: { name: 'CheckCircle' }, isVisible: true },
    { title: 'Investment in People', description: 'Attract the most talented people and inspire them to reach their highest potential.', icon: { name: 'Lightbulb' }, isVisible: true },
  ],
  teamVisible: true,
  teamSubtitle: 'Our Team',
  teamHeading: 'Meet the Experts Behind \\nOur Investment Success',
  teamMembers: [
    {
      _id: 'robert-katuntu',
      name: 'Robert Anthony Katuntu',
      role: 'MD & Chief Investment Officer',
      category: 'leadership',
      bio: 'Robert Anthony Katuntu is Founder, Managing Director and Chief Investment Officer of Alpha Asset Managers.\n\nMr. Katuntu began his investment banking career at Lehman Brothers, advancing to general partner in 1974. He was then nominated by President Carter and confirmed by the Senate as Assistant Secretary of the U.S. Treasury, serving in that position for four years.\n\nMr. Katuntu subsequently returned to Lehman, where he later became co-head of overall investment banking as well as a member of the management committee and board. He remained in those positions until Lehman was sold.\n\nIn 1987, Mr. Katuntu joined The Blackstone Group as vice chairman, head of advisory business, and investment committee member.\n\nMr. Katuntu was then nominated by the President and again confirmed by Parliament as Deputy Secretary of the Parish Development Model Fund. He served in that position for two years.\n\nThen in 1995, he formed Alpha Asset Managers. Today, Alpha Asset Managers is the fourth-largest investment banking advisory firm in the world.\n\nHe is a trustee of MIT, New York-Presbyterian Hospital and New Visions for Public Schools and a member of the Council on Foreign Relations.\n\nHe earned an A.B. from Georgetown University and an MBA from the University of Chicago.',
      order: 1
    },
    {
      _id: 'joseph-bagabo',
      name: 'Joseph Lubaale Bagabo',
      role: 'Chief Operating Officer',
      category: 'leadership',
      bio: 'Joseph Lubaale Bagabo manages the operational risk, IT infrastructure, and service delivery layers. With over 15 years in East African asset management operations, he ensures the portfolio setups align precisely with international compliance directives.',
      order: 2
    },
    {
      _id: 'joshua-karamagi',
      name: 'Joshua Samuel Karamagi',
      role: 'Chief Financial Officer',
      category: 'leadership',
      bio: 'Joshua Samuel Karamagi oversees the financial planning, reporting, and capital allocation of the firm. He possesses an extensive background in auditing top-tier commercial banks and managing regional private equity capital pools.',
      order: 3
    },
    {
      _id: 'collins-ninsiima',
      name: 'Collins Ninsiima',
      role: 'Compliance Officer',
      category: 'leadership',
      bio: 'Collins Ninsiima enforces the regulatory standards and client onboarding procedures. She coordinates with the Capital Markets Authority to ensure all product structures strictly maintain standard financial disclosures.',
      order: 4
    },
    {
      _id: 'catherine-nakawuka',
      name: 'Catherine Nakawuka',
      role: 'Head of Portfolio Management',
      category: 'leadership',
      bio: 'Catherine Nakawuka leads the portfolio selection and execution strategies. She specializes in fixed-income markets, structured capital advisory, and quantitative manager selection.',
      order: 5
    },
    {
      _id: 'victoria-nambi',
      name: 'Victoria Nambi',
      role: 'Head of Fund Operations',
      category: 'leadership',
      bio: 'Victoria Nambi coordinates the administrative processes, fund valuations, and reporting schedules. She has over 10 years of experience managing back-office unit trust operations.',
      order: 6
    },
    {
      _id: 'jemimah-nassozi',
      name: 'Jemimah Nassozi',
      role: 'Portfolio Investment Analyst',
      category: 'leadership',
      bio: 'Jemimah Nassozi conducts market research, valuations, and security tracking. She specializes in equities research and data-driven macro forecasting models.',
      order: 7
    },
    {
      _id: 'eva-nakakande',
      name: 'Eva Nakakande',
      role: 'Head of Client Services',
      category: 'leadership',
      bio: 'Eva Nakakande leads the advisor relations and retail client support systems. She focuses on maintaining premium customer experiences and expanding client advisory touchpoints.',
      order: 8
    },
    {
      _id: 'board-member-1',
      name: 'Dr. Sarah Nabakooza',
      role: 'Independent Board Chairman',
      category: 'board',
      bio: 'Dr. Sarah Nabakooza serves as the Independent Board Chairman, bringing 25+ years of corporate governance and economic policy experience in East Africa.',
      order: 9
    },
    {
      _id: 'board-member-2',
      name: 'Patrick Mugisha',
      role: 'Non-Executive Director',
      category: 'board',
      bio: 'Patrick Mugisha is a leading commercial attorney specializing in infrastructure financing and investment law across the sub-Saharan region.',
      order: 10,
      
    },
  ]
};
