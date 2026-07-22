import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FooterCTA } from '../components/UI/FooterCTA';
import bannerBg from '../assets/images/banner_bg.jpg';
import investTablet from '../assets/images/invest_tablet.jpg';
import { FileText, ArrowRight, Download, Eye } from 'lucide-react';

interface ServiceContent {
  id: string;
  title: string;
  category: string;
  heading: string;
  description1: string;
  description2: string;
  bulletsTitle: string;
  bullets: string[];
  factsheetName: string;
}

export const InvestDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const services = [
    { id: 'separately-managed-accounts', title: 'Separately Managed Accounts' },
    { id: 'advisory-capital-solutions', title: 'Advisory & Capital Solutions' },
    { id: 'direct-lending-fund', title: 'Direct Lending Fund' },
    { id: 'private-equity', title: 'Private Equity' },
    { id: 'unit-trusts', title: 'Unit Trusts' },
    { id: 'pension-retirement', title: 'Pension & Retirement Mandates' },
  ];

  const contentMap: Record<string, ServiceContent> = {
    'advisory-capital-solutions': {
      id: 'advisory-capital-solutions',
      title: 'Advisory & Capital Solutions',
      category: 'OUR SERVICES',
      heading: 'Strategic Advisory & Capital Structuring',
      description1: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
      description2: 'Alpha advises corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring. We also support capital raising, transaction preparation, and financial modelling. Whether the mandate is treasury optimisation, investment policy design, capital mobilisation, or transaction readiness, Alpha acts as a trusted capital partner from strategy through execution.',
      bulletsTitle: 'Comprehensive Advisory Services',
      bullets: [
        'Portfolio Strategy & Asset Allocation',
        'Investment Structuring',
        'Manager Selection',
        'Capital Raising Support',
        'Financial Modelling',
      ],
      factsheetName: 'Advisory_Capital_Solutions_Factsheet_2026.pdf',
    },
    'direct-lending-fund': {
      id: 'direct-lending-fund',
      title: 'Direct Lending Fund',
      category: 'OUR SERVICES',
      heading: 'Private Debt & Senior Secured Lending',
      description1: 'Secured senior lending strategy for institutional and sophisticated investors seeking attractive risk-adjusted income.',
      description2: 'Our Direct Lending Fund targets mid-market lending opportunities offering high cash yield and senior security protections. We perform rigorous credit assessments and structuring to ensure downside protection while maximizing yields. Investors gain exposure to a diversified portfolio of private credit assets uncorrelated with traditional public equities.',
      bulletsTitle: 'Key Fund Characteristics',
      bullets: [
        'Corporate Debt Financing',
        'Acquisition Finance Solutions',
        'Secured Term Loans & Collateral',
        'Capital Preservation & Strict Covenants',
        'Consistent Monthly Cash Distribution',
      ],
      factsheetName: 'Direct_Lending_Fund_Factsheet_2026.pdf',
    },
    'private-equity': {
      id: 'private-equity',
      title: 'Private Equity',
      category: 'OUR SERVICES',
      heading: 'Growth Capital for Mid-Market Enterprises',
      description1: 'Long-term growth capital through disciplined investment in promising businesses with active ownership approach.',
      description2: 'Alpha partners with high-potential businesses across East Africa to scale operations, upgrade management systems, and expand market footprints. We take an active, hands-on role in corporate governance, implementing strategic improvements and unlocking sustainable value for our portfolio companies and institutional investors alike.',
      bulletsTitle: 'Investment Approach',
      bullets: [
        'Mid-Market Growth Equity',
        'Strategic Expansion Support',
        'Active Board & Management Engagement',
        'Operational Value Creation Initiatives',
        'Clear Institutional Path to Exit',
      ],
      factsheetName: 'Private_Equity_Factsheet_2026.pdf',
    },
    'separately-managed-accounts': {
      id: 'separately-managed-accounts',
      title: 'Separately Managed Accounts',
      category: 'OUR SERVICES',
      heading: 'Tailored Discretionary Portfolio Management',
      description1: 'Bespoke discretionary portfolios in UGX or USD, tailored to your objectives, liquidity profile, risk tolerance, and reporting requirements.',
      description2: 'For individuals and institutions requiring customized asset management, Separately Managed Accounts (SMAs) offer personalized allocations across bonds, equities, and cash equivalents. Assets are held directly in your custodian name, providing complete security, custom tax optimizations, and bespoke portfolio reporting frequencies.',
      bulletsTitle: 'SMA Features & Customization',
      bullets: [
        'Customized USD & UGX Asset Allocations',
        'Direct Ownership of Underlying Securities',
        'Tax-Optimized Portfolios & Liquidity Planning',
        'Tactical Adjustments by Dedicated Managers',
        'Real-time Access & Personalized Advisory',
      ],
      factsheetName: 'Separately_Managed_Accounts_Factsheet_2026.pdf',
    },
    'unit-trusts': {
      id: 'unit-trusts',
      title: 'Unit Trusts',
      category: 'OUR SERVICES',
      heading: 'Comprehensive Investment Pools for Retail & Institutions',
      description1: 'Professionally managed unit trusts for liquidity, capital preservation, and disciplined income generation.',
      description2: 'Our Unit Trusts consolidate funds from diverse investors into premium corporate paper, government treasury bonds, and high-yielding money market assets. Under active professional management, the fund offers daily liquidity, flexible top-ups, and compounding interest structures, making it an ideal vehicle for both short-term capital parking and long-term wealth accumulation.',
      bulletsTitle: 'Comprehensive Advisory Services',
      bullets: [
        'Portfolio Strategy & Asset Allocation',
        'Investment Structuring',
        'Manager Selection',
        'Capital Raising Support',
        'Financial Modelling',
      ],
      factsheetName: 'Unit_Trusts_Factsheet_2026.pdf',
    },
    'pension-retirement': {
      id: 'pension-retirement',
      title: 'Pension & Retirement Mandates',
      category: 'OUR SERVICES',
      heading: 'Liability-Driven Portfolio Management for Schemes',
      description1: 'Retirement-focused portfolio management with liability-aware construction for trustees and scheme sponsors.',
      description2: 'Alpha works closely with board of trustees and corporate scheme sponsors to design portfolios matching the long-term pension payment schedules. We employ robust asset-liability modeling (ALM) to ensure solvency, optimize capital returns under regulatory limits, and secure stable returns for retiring beneficiaries.',
      bulletsTitle: 'Mandate Scopes',
      bullets: [
        'Asset-Liability Matching (ALM) Strategy',
        'Trustee Investment Guidance & Policy Drafting',
        'Statutory & Regulatory Compliance Reports',
        'Capital Protection during Downside Markets',
        'Diversified Real Estate & Bond Allocation',
      ],
      factsheetName: 'Pension_Retirement_Factsheet_2026.pdf',
    },
  };

  const currentId = serviceId || 'unit-trusts';
  const data = contentMap[currentId] || contentMap['unit-trusts'];

  const handleDownload = (fileName: string) => {
    alert(`Mock Downloading: ${fileName}\nIn a production environment, this will download the actual factsheet PDF.`);
  };

  const handleView = (fileName: string) => {
    alert(`Mock Opening PDF Preview: ${fileName}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Banner */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <section className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] bg-gradient-to-br from-[#005b5c] to-[#002e2e]"
        >
          <div className="text-center w-full px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4 block">
              {data.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-light text-white tracking-wide">
              {data.title}
            </h1>
          </div>
        </section>
      </div>

      {/* Main Two-Column Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar Navigation */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-brand-primary rounded-[1.5rem] p-6 sm:p-8">
                <h3 className="text-3xl font-light text-brand-primary mb-6">
                  Our Services
                </h3>
                <nav className="flex flex-col">
                  {services.map((item) => {
                    const isActive = currentId === item.id;
                    return (
                      <div key={item.id} className="border-b border-brand-dark">
                        <Link
                          to={`/invest/${item.id}`}
                          className="group transition-all duration-150 py-3 flex items-center gap-2 w-full"
                        >
                          <span className={`text-base ${isActive ? 'text-brand-primary font-bold' : 'text-gray-500 font-light group-hover:text-brand-primary'}`}>
                            •
                          </span>
                          <span className={`text-base ${isActive ? 'text-brand-primary font-bold' : 'text-gray-500 font-light group-hover:text-brand-primary'}`}>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Detailed Content */}
            <article className="lg:col-span-8 space-y-10">
              
              {/* Detailed image */}
              <div className="rounded-[1.5rem] overflow-hidden h-[300px] sm:h-[400px] shadow-sm">
                <img 
                  src={investTablet} 
                  alt="Hands holding tablet displaying finance chart" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service copy */}
              <div className="text-gray-500 text-sm sm:text-base leading-relaxed space-y-6 font-light">
                <p>{data.description1}</p>
                <p>{data.description2}</p>
              </div>

              {/* Bullets List */}
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl font-bold text-brand-primary">
                  {data.bulletsTitle}
                </h3>
                <ul className="flex flex-col space-y-3">
                  {data.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm sm:text-base font-light text-gray-500 flex items-start gap-2">
                      <span className="text-brand-primary font-bold text-lg leading-none mt-[1px]">
                        ›
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Factsheet Download Section */}
              <div className="bg-[#e8f4e8] border border-brand-primary rounded-md px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="text-left">
                  <h4 className="text-sm font-bold text-gray-800">{data.factsheetName}</h4>
                </div>
                
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleView(data.factsheetName)}
                    className="text-brand-primary hover:text-brand-dark text-sm font-bold transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(data.factsheetName)}
                    className="text-gray-500 hover:text-brand-dark text-sm font-light transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>

            </article>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />

    </div>
  );
};
