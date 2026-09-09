/**
 * seed-careers.mjs
 *
 * Seeds Careers Page settings and 3 initial job vacancies into Sanity
 * so non-developers can manage them immediately in Sanity Studio.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const CAREERS_PAGE_DATA = {
  _id: 'careersPage',
  _type: 'careersPage',
  pageVisible: true,
  heroVisible: true,
  hero: {
    heading: 'Careers',
    ctaButton: {
      label: 'View Open Roles',
      linkType: 'custom',
      url: '#vacancies',
      variant: 'white',
      isVisible: true,
    },
  },
  introHeading: 'Shape the Future of East African Investing',
  introDescription:
    'We are always looking for ambitious, disciplined, and forward-thinking individuals to contribute to institutional asset management in East Africa. Join our team of professionals committed to long-term value creation.',
  noVacanciesTitle: 'No Open Vacancies Currently',
  noVacanciesMessage:
    'There are currently no active job openings at Alpha Asset Managers. However, we welcome spontaneous applications from exceptional candidates. Send your resume to careers@alphaeastafrica.com.',
};

const JOB_VACANCIES = [
  {
    _id: 'job-vacancy-senior-portfolio-manager',
    _type: 'jobVacancy',
    title: 'Senior Portfolio Manager — Fixed Income',
    slug: { _type: 'slug', current: 'senior-portfolio-manager-fixed-income' },
    department: 'Investment Management',
    location: 'Kampala, Uganda',
    employmentType: 'Full-time',
    datePosted: '2026-08-15',
    deadline: '2026-10-31',
    summary:
      'Lead our sovereign and corporate debt investment strategies, managing duration, yield-curve positioning, and credit risk across East African markets.',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's1', _type: 'span', text: 'About the Role' }],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 's2',
            _type: 'span',
            text: 'Alpha Asset Managers is seeking an experienced Senior Portfolio Manager to lead our Fixed Income investment capabilities. In this role, you will formulate and execute duration, yield curve, and credit strategies across Uganda, Kenya, and regional East African fixed-income markets for institutional clients and segregated mandates.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's3', _type: 'span', text: 'Key Responsibilities' }],
      },
      {
        _key: 'b4',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's4', _type: 'span', text: 'Manage sovereign debt and corporate credit portfolios in line with approved investment mandates.' }],
      },
      {
        _key: 'b5',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's5', _type: 'span', text: 'Perform fundamental macroeconomic research, yield-curve analysis, and credit underwriting.' }],
      },
      {
        _key: 'b6',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's6', _type: 'span', text: 'Participate actively in the Investment Committee and present strategy proposals.' }],
      },
      {
        _key: 'b7',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's7', _type: 'span', text: 'Candidate Qualifications' }],
      },
      {
        _key: 'b8',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's8', _type: 'span', text: 'Bachelor’s degree in Finance, Economics, Actuarial Science, or related quantitative field. Master’s degree preferred.' }],
      },
      {
        _key: 'b9',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's9', _type: 'span', text: 'CFA Charterholder or progress toward CFA qualification strongly preferred.' }],
      },
      {
        _key: 'b10',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's10', _type: 'span', text: 'Minimum 5–7 years of proven fixed-income investment management or treasury trading experience.' }],
      },
    ],
    applicationType: 'Email',
    applicationEmail: 'careers@alphaeastafrica.com',
    status: 'Open',
    order: 1,
  },
  {
    _id: 'job-vacancy-investment-analyst',
    _type: 'jobVacancy',
    title: 'Investment Analyst — Private Markets',
    slug: { _type: 'slug', current: 'investment-analyst-private-markets' },
    department: 'Private Equity & Credit',
    location: 'Kampala, Uganda',
    employmentType: 'Full-time',
    datePosted: '2026-08-20',
    deadline: '2026-10-15',
    summary:
      'Perform financial modeling, commercial due diligence, and portfolio monitoring across private debt and private equity transactions.',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's1', _type: 'span', text: 'Role Overview' }],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 's2',
            _type: 'span',
            text: 'We are looking for an Investment Analyst to support our expanding Private Credit and Private Equity operations. You will build dynamic financial models, evaluate direct lending opportunities, and assist in monitoring portfolio companies across East Africa.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's3', _type: 'span', text: 'Core Duties' }],
      },
      {
        _key: 'b4',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's4', _type: 'span', text: 'Construct 3-statement financial models, sensitivity analyses, and debt-service coverage evaluations.' }],
      },
      {
        _key: 'b5',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's5', _type: 'span', text: 'Draft investment memos, credit committee presentations, and term sheets.' }],
      },
      {
        _key: 'b6',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's6', _type: 'span', text: 'Requirements' }],
      },
      {
        _key: 'b7',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's7', _type: 'span', text: 'Strong financial modeling skills in Excel with 2–4 years in corporate finance or private equity.' }],
      },
      {
        _key: 'b8',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's8', _type: 'span', text: 'Excellent analytical and report-writing skills.' }],
      },
    ],
    applicationType: 'Email',
    applicationEmail: 'careers@alphaeastafrica.com',
    status: 'Open',
    order: 2,
  },
  {
    _id: 'job-vacancy-compliance-risk',
    _type: 'jobVacancy',
    title: 'Compliance & Risk Officer',
    slug: { _type: 'slug', current: 'compliance-and-risk-officer' },
    department: 'Legal & Risk',
    location: 'Kampala, Uganda',
    employmentType: 'Full-time',
    datePosted: '2026-08-28',
    summary:
      'Ensure strict regulatory compliance with Capital Markets Authority guidelines and oversee portfolio risk management controls.',
    description: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's1', _type: 'span', text: 'Role Summary' }],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 's2',
            _type: 'span',
            text: 'The Compliance & Risk Officer will oversee adherence to regulatory mandates, internal investment limits, AML/CFT requirements, and risk monitoring frameworks under Capital Markets Authority (CMA) regulations.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 's3', _type: 'span', text: 'Responsibilities' }],
      },
      {
        _key: 'b4',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's4', _type: 'span', text: 'Monitor daily portfolio compliance against regulatory limits and mandate investment guidelines.' }],
      },
      {
        _key: 'b5',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 's5', _type: 'span', text: 'Manage regulatory reporting schedules and statutory filings with the CMA and FIA.' }],
      },
    ],
    applicationType: 'Email',
    applicationEmail: 'careers@alphaeastafrica.com',
    status: 'Open',
    order: 3,
  },
];

async function run() {
  if (!client.config().token) {
    console.error('❌ SANITY_API_TOKEN is not set.');
    process.exit(1);
  }

  console.log('Seeding Careers Page Settings…');
  await client.createOrReplace(CAREERS_PAGE_DATA);
  await client.createOrReplace({ ...CAREERS_PAGE_DATA, _id: 'drafts.careersPage' });
  console.log('✅ Careers Page settings created.');

  console.log('Seeding Job Vacancies…');
  for (const vacancy of JOB_VACANCIES) {
    await client.createOrReplace(vacancy);
    await client.createOrReplace({ ...vacancy, _id: `drafts.${vacancy._id}` });
    console.log(`✅ Vacancy: ${vacancy.title}`);
  }

  console.log('\n🎉 Successfully seeded Careers data into Sanity!');
}

run().catch((err) => {
  console.error('❌ Error seeding careers:', err.message);
  process.exit(1);
});
