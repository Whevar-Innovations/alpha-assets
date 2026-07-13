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
      <section 
        className="relative h-48 sm:h-56 flex items-center bg-brand-dark"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 46, 46, 0.85), rgba(0, 46, 46, 0.85)), url(${bannerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
            {data.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            {data.title}
          </h1>
        </div>
      </section>

      {/* Main Two-Column Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar Navigation */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-gray-150 rounded-lg p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-extrabold text-brand-dark mb-6 border-b border-gray-100 pb-4">
                  Our Services
                </h3>
                <nav className="flex flex-col space-y-4">
                  {services.map((item) => {
                    const isActive = currentId === item.id;
                    return (
                      <Link
                        key={item.id}
                        to={`/invest/${item.id}`}
                        className={`text-sm font-semibold flex items-center justify-between group transition-all duration-150 py-1 ${
                          isActive 
                            ? 'text-brand-accent border-b-2 border-brand-accent w-fit font-extrabold' 
                            : 'text-brand-dark hover:text-brand-accent'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-accent' : 'bg-transparent group-hover:bg-brand-accent'}`} />
                          {item.title}
                        </span>
                        {!isActive && (
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-brand-accent" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Detailed Content */}
            <article className="lg:col-span-8 space-y-10">
              
              {/* Detailed image */}
              <div className="rounded-lg overflow-hidden h-[300px] sm:h-[400px] shadow-sm">
                <img 
                  src={investTablet} 
                  alt="Hands holding tablet displaying finance chart" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service copy */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight">
                  {data.heading}
                </h2>
                <div className="text-teal-900 opacity-90 text-sm sm:text-base leading-relaxed space-y-4 font-light">
                  <p>{data.description1}</p>
                  <p>{data.description2}</p>
                </div>
              </div>

              {/* Bullets List */}
              <div className="space-y-6 bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-100">
                <h3 className="text-lg font-extrabold text-brand-dark">
                  {data.bulletsTitle}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm font-medium text-brand-dark flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-accent font-bold text-xs select-none">
                        ✓
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Factsheet Download Section */}
              <div className="border border-brand-cardBg bg-brand-cardBg bg-opacity-20 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 bg-brand-accent text-white rounded">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark leading-snug">{data.factsheetName}</h4>
                    <p className="text-xs text-brand-grayText font-medium">Factsheet Document (PDF)</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(data.factsheetName)}
                    className="flex items-center gap-1.5 px-4 py-2 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white rounded text-xs font-bold uppercase tracking-wider transition-all duration-150"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(data.factsheetName)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-brand-accent hover:bg-brand-dark text-white rounded text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-sm"
                  >
                    <Download size={14} />
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
