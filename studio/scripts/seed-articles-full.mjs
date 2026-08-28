/**
 * seed-articles-full.mjs
 *
 * Updates the two seeded articles with:
 *  - Professional cover images (via Unsplash external URL — no upload needed)
 *  - Full rich-text body content in Sanity Portable Text format
 *  - SEO metadata
 *
 * Usage (from the /studio directory):
 *   $env:SANITY_API_TOKEN="your-token"; node scripts/seed-articles-full.mjs
 *
 * Safe to re-run — uses createOrReplace (idempotent).
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper — creates a portable text paragraph block
const p = (text, marks = []) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 9),
  style: 'normal',
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks }],
  markDefs: [],
});

// Helper — creates an h2 heading block
const h2 = (text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 9),
  style: 'h2',
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks: [] }],
  markDefs: [],
});

// Helper — creates an h3 heading block
const h3 = (text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 9),
  style: 'h3',
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks: [] }],
  markDefs: [],
});

// Helper — creates a blockquote block
const quote = (text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 9),
  style: 'blockquote',
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks: [] }],
  markDefs: [],
});

// Helper — creates a bullet list item
const bullet = (text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 9),
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks: [] }],
  markDefs: [],
});

// Helper — inline body image block (Sanity image type in richText array)
const bodyImage = (url, alt, caption) => ({
  _type: 'image',
  _key: Math.random().toString(36).slice(2, 9),
  url,
  alt,
  caption,
});

// ─── Article 1: East African Macroeconomic Outlook ───────────────────────────
const article1 = {
  _id: 'seed-article-1',
  _type: 'article',
  isActive: true,
  title: 'East African Macroeconomic Outlook for H2 2026',
  slug: { _type: 'slug', current: 'east-african-macroeconomic-outlook-h2-2026' },
  excerpt:
    'An in-depth analysis of monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania.',
  category: 'Market Update',
  publishedAt: '2026-07-10T00:00:00Z',
  readTime: '6 min read',

  // Cover image via Unsplash external URL
  coverImage: {
    _type: 'imageWithAlt',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop',
    alt: 'Financial data charts and market analysis on screens',
  },

  seo: {
    metaTitle: 'East African Macroeconomic Outlook H2 2026 | Alpha Asset Managers',
    metaDescription:
      'Monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania for H2 2026.',
  },

  body: [
    p('The second half of 2026 presents a nuanced macroeconomic landscape across East Africa. While headline inflation has moderated from the peaks of 2024–2025, structural pressures — including elevated food prices, currency depreciation, and fiscal consolidation demands — continue to shape the investment environment across Uganda, Kenya, and Tanzania.'),

    h2('Monetary Policy: Cautious Easing Underway'),

    p('Central banks across the region have begun measured easing cycles following sustained tightening over the past 18 months. The Bank of Uganda cut its Central Bank Rate by 50 basis points in Q2 2026, reflecting improved inflation dynamics and a desire to stimulate credit growth in a slowing economy.'),

    p('In Kenya, the Central Bank of Kenya (CBK) has maintained a more cautious stance, holding its rate at 12.5% amid persistent core inflation and external account pressures. The CBK has signalled that any further cuts will be data-dependent, with the next Monetary Policy Committee meeting in September being a key watch point for investors.'),

    p('Tanzania\'s Bank of Tanzania remains in a holding pattern, prioritising exchange rate stability over growth stimulus — a posture that has helped anchor the Tanzanian shilling but has drawn criticism from private sector players seeking cheaper credit.'),

    bodyImage(
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop',
      'Central bank building representing monetary policy',
      'Monetary policy decisions across the region are increasingly data-driven'
    ),

    h2('Inflation: Progress, But Not Victory'),

    p('Year-on-year inflation across the three economies has declined meaningfully, averaging approximately 6.2% in Uganda, 5.8% in Kenya, and 4.4% in Tanzania as of June 2026. These represent significant improvements from the double-digit readings of 2024, driven by lower global commodity prices and improved agricultural output.'),

    p('However, food inflation remains elevated in Uganda and Kenya, underpinned by erratic rainfall patterns in key agricultural regions and persistent logistics bottlenecks. Core inflation — which strips out food and energy — remains sticky, suggesting that demand-side pressures have not fully unwound.'),

    quote('"Headline inflation is winning the battle, but core inflation tells us the war is not yet over. Investors should price in the possibility of rates staying higher for longer than current market expectations suggest." — Alpha Asset Managers Research Desk'),

    h2('Currency Performance and FX Risk'),

    p('The Ugandan Shilling has depreciated approximately 4.8% against the US Dollar year-to-date, driven by a strong dollar environment, subdued tourism receipts in Q1, and elevated import demand. The Central Bank has intervened selectively to smooth excessive volatility without defending a specific level.'),

    p('The Kenyan Shilling has shown relative resilience following the successful completion of the Eurobond buyback earlier in the year, which significantly reduced near-term external debt servicing pressure. The shilling is broadly stable, trading in the 128–132 range against the dollar.'),

    p('For portfolio managers, currency risk management remains a critical consideration. Investors with significant allocations to local currency fixed income should assess their hedging strategies, particularly given the potential for renewed dollar strength in H2 2026 as US Federal Reserve policy expectations shift.'),

    h2('Key Investment Implications'),

    bullet('Fixed Income: Short-to-medium duration local currency bonds offer attractive real yields in Uganda and Kenya, but require active currency risk management.'),
    bullet('Equities: Earnings growth is being squeezed by input cost pressures and subdued consumer demand. Selective exposure to financial sector stocks with strong capital positions is preferred.'),
    bullet('Private Credit: The environment continues to favour senior secured private credit, where lenders can price in macroeconomic uncertainty through covenant protection and floating rate structures.'),
    bullet('Real Assets: Infrastructure-linked investments remain attractive, particularly in Uganda\'s energy and Kenya\'s logistics sectors, where long-term demand fundamentals are intact.'),

    h2('Outlook'),

    p('The second half of 2026 is likely to be characterised by gradual monetary easing, continued fiscal consolidation, and a slowly improving growth trajectory. We maintain a cautiously optimistic view on East African assets, with a preference for quality, liquidity, and downside protection in portfolio construction.'),

    p('Our investment committee will continue to monitor key data releases — including Q2 GDP prints, August inflation figures, and central bank communications — to refine our positioning as the year progresses.'),
  ],
};

// ─── Article 2: Building a Resilient Portfolio ───────────────────────────────
const article2 = {
  _id: 'seed-article-2',
  _type: 'article',
  isActive: true,
  title: 'Building a Resilient Portfolio: The Case for Private Credit',
  slug: { _type: 'slug', current: 'building-resilient-portfolio-private-credit' },
  excerpt:
    'Discover why sophisticated investors are moving towards senior secured debt funds to secure yields in volatile markets.',
  category: 'Investment Advice',
  publishedAt: '2026-06-28T00:00:00Z',
  readTime: '4 min read',

  // Cover image via Unsplash external URL
  coverImage: {
    _type: 'imageWithAlt',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop',
    alt: 'Professional reviewing investment portfolio documents and financial data',
  },

  seo: {
    metaTitle: 'Building a Resilient Portfolio: The Case for Private Credit | Alpha Asset Managers',
    metaDescription:
      'Why sophisticated investors are turning to senior secured debt funds to generate yield and protect capital in volatile markets.',
  },

  body: [
    p('In an environment defined by elevated interest rate volatility, compressed public market valuations, and heightened geopolitical uncertainty, a growing number of sophisticated investors in East Africa and beyond are revisiting the role of private credit in their portfolios. The asset class — once the preserve of institutional giants — is increasingly accessible to qualified investors and is delivering compelling risk-adjusted returns.'),

    h2('What is Private Credit?'),

    p('Private credit refers to non-bank lending — debt provided directly by funds and asset managers to businesses, rather than originated through a traditional bank or publicly traded bond market. Instruments range from senior secured term loans and revolving credit facilities to mezzanine debt and unitranche structures.'),

    p('Unlike listed bonds, private credit instruments are not traded on an exchange. This illiquidity premium is precisely the source of the enhanced yield that investors seek — and it is supported by structural protections that public market creditors often cannot access.'),

    bodyImage(
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop',
      'Business professionals discussing investment strategy',
      'Private credit requires deep due diligence and active portfolio management'
    ),

    h2('The Case for Senior Secured Debt'),

    p('Within the private credit spectrum, senior secured debt sits at the top of the capital structure. In the event of borrower default, senior secured lenders have first claim on the borrower\'s assets — ahead of subordinated creditors, preferred shareholders, and equity holders. This structural seniority, combined with specific collateral pledged against the loan, significantly reduces recovery risk.'),

    quote('"Private credit\'s structural protections — covenants, security packages, and priority of claim — are instruments of capital preservation that public market investors simply cannot replicate at scale." — Alpha Asset Managers Investment Committee'),

    p('Key protective features of senior secured private credit include:'),

    bullet('Financial covenants: Ongoing obligations that require borrowers to maintain leverage ratios, interest coverage, and liquidity thresholds, giving lenders early warning of deteriorating credit quality.'),
    bullet('Security packages: Specific assets — receivables, inventory, property, or cash flows — pledged as collateral against the loan.'),
    bullet('Lender controls: Rights to approve significant business decisions, restrict additional borrowing, and trigger acceleration events.'),
    bullet('Floating rate structures: Most private credit instruments carry floating interest rates, providing natural protection in rising rate environments.'),

    h2('Performance in Volatile Markets'),

    p('The past two years have stress-tested most asset classes. Public equities experienced significant drawdowns, listed bonds suffered historic losses as rates rose sharply, and even alternative assets — including certain real estate segments — came under pressure. Against this backdrop, well-constructed private credit portfolios demonstrated meaningful resilience.'),

    p('Senior secured private credit funds targeting East African mid-market corporates have delivered net returns in the range of 14–18% per annum over this period, according to data tracked by our research team. Crucially, default rates in carefully underwritten portfolios remained well below public high yield benchmarks, reflecting the advantage of direct lender due diligence and ongoing monitoring.'),

    bodyImage(
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
      'Financial performance charts showing portfolio resilience',
      'Well-constructed private credit portfolios have demonstrated meaningful resilience through recent market volatility'
    ),

    h2('Who Should Consider Private Credit?'),

    p('Private credit is not suitable for all investors. The illiquid nature of the asset class means that capital is typically committed for three to seven years, with limited ability to exit early. Investors must have a genuine long-term investment horizon and the financial capacity to withstand periods without liquidity.'),

    p('That said, for qualified investors who meet these criteria — including high-net-worth individuals, family offices, endowments, and pension funds — the risk-return profile of senior secured private credit is compelling when compared to the alternatives currently available in public markets.'),

    h2('How Alpha Asset Managers Approaches Private Credit'),

    p('Our private credit strategy is anchored in three principles: rigorous origination, structural discipline, and active portfolio management. We target established East African businesses with proven cash flow generation, tangible assets, and experienced management teams. Every transaction undergoes a comprehensive credit process, including independent legal, financial, and operational due diligence.'),

    p('Our focus remains firmly on the senior secured segment of the capital structure. We do not chase yield by taking on subordinated risk or backing early-stage businesses without clear repayment paths. This conservative approach has served our investors well through challenging market conditions and remains central to our investment philosophy.'),

    h2('Getting Started'),

    p('Investors interested in learning more about private credit opportunities at Alpha Asset Managers are encouraged to speak with our investment advisory team. We offer a range of entry points and can structure exposures appropriate to your investment objectives, liquidity requirements, and risk tolerance.'),

    p('Capital markets in East Africa are evolving rapidly. Positioning your portfolio to benefit from this evolution — with appropriate protections — is one of the most important conversations you can have with your investment manager today.'),
  ],
};

// ─── Run ──────────────────────────────────────────────────────────────────────
async function seed() {
  if (!client.config().token) {
    console.error('❌  SANITY_API_TOKEN is not set.');
    process.exit(1);
  }

  console.log('🌱  Seeding full article content into dataset "production"…\n');

  const transaction = client.transaction();
  transaction.createOrReplace(article1);
  transaction.createOrReplace(article2);

  try {
    const result = await transaction.commit();
    console.log('✅  Done! Documents written:');
    result.results.forEach((r) => console.log(`    • ${r.id}`));
    console.log('\nOpen Sanity Studio → Articles to review the content.');
  } catch (err) {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
