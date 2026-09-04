/**
 * seed-invest-strategies.mjs
 *
 * Seeds the "Our Investment Strategies" data into both 'investPage'
 * and 'drafts.investPage' documents in Sanity so it is editable in Studio.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4earmfty',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const STRATEGIES_DATA = {
  strategiesVisible: true,
  strategiesHeading: 'Our Investment Strategies',
  strategiesDescription:
    'Alpha currently delivers Fixed Income and Multi-Asset strategies through customized Separately Managed Accounts. Private Credit, Private Equity and Real Assets are pursued only through approved client mandates or appropriately authorised vehicles. The launch of any pooled private-market fund remains subject to regulatory approval and its final offering documents.',
  strategiesList: [
    {
      _key: 'strategy-fixed-income',
      _type: 'strategyItem',
      title: 'Fixed Income',
      description:
        'Our Fixed Income strategy seeks to preserve capital, generate dependable income and manage liquidity through disciplined investment in government securities, deposits and other permitted fixed-income instruments. Portfolios are tailored to each client’s objectives, cash-flow requirements and risk limits, using yield-curve positioning, maturity laddering and active duration management. Clients retain direct ownership of assets and receive transparent portfolio and performance reporting.',
    },
    {
      _key: 'strategy-multi-asset',
      _type: 'strategyItem',
      title: 'Multi-Asset',
      description:
        'Our Multi-Asset strategy combines fixed income, cash, listed equities and other permitted investments within a single, diversified mandate. Where appropriate and legally permitted, portfolios may include regional securities and international exchange-traded funds. Strategic asset allocation is aligned with each client’s return objectives, liquidity needs, investment horizon and risk tolerance, supported by disciplined security selection and rebalancing.',
    },
    {
      _key: 'strategy-private-credit',
      _type: 'strategyItem',
      title: 'Private Credit',
      description:
        'Alpha is developing private-credit solutions designed to provide appropriately structured financing to established Ugandan and East African businesses. The strategy emphasises cash-flow-based underwriting, strong borrower due diligence, enforceable security, financial covenants and active post-investment monitoring. Private-credit investments are available only through approved mandates or authorised vehicles for eligible investors.',
    },
    {
      _key: 'strategy-private-equity',
      _type: 'strategyItem',
      title: 'Private Equity',
      description:
        'Our Private Equity capability focuses on identifying scalable businesses with credible management teams, defensible market positions and clear pathways to sustainable growth. Alpha’s approach combines rigorous commercial and financial due diligence with active ownership, stronger governance, improved reporting and value-creation planning. Any private-equity vehicle or investment opportunity is offered only to eligible investors and remains subject to applicable regulatory approvals and definitive legal documentation.',
    },
    {
      _key: 'strategy-real-assets',
      _type: 'strategyItem',
      title: 'Real Assets',
      description:
        'Alpha evaluates selective real-asset opportunities supported by identifiable assets and sustainable operating or contractual cash flows. These may include infrastructure-linked investments, income-producing property and asset-backed businesses where permitted by the relevant mandate. Our assessment prioritises legal title, independent valuation, cash-flow resilience, governance, liquidity and a credible exit pathway. Alpha does not currently offer a standalone public Real Assets fund.',
    },
  ],
};

async function run() {
  if (!client.config().token) {
    console.error('❌ SANITY_API_TOKEN is not set.');
    process.exit(1);
  }

  const ids = ['investPage', 'drafts.investPage'];

  for (const id of ids) {
    try {
      const exists = await client.fetch(`*[_id == "${id}"][0]{ _id }`);
      if (!exists) {
        if (id === 'drafts.investPage') {
          const published = await client.fetch('*[_id == "investPage"][0]');
          if (published) {
            const draft = { ...published, _id: 'drafts.investPage', ...STRATEGIES_DATA };
            delete draft._rev;
            await client.createOrReplace(draft);
            console.log('✅ Created drafts.investPage with strategies.');
          }
        }
        continue;
      }

      console.log(`📝 Patching "${id}"…`);
      await client.patch(id).set(STRATEGIES_DATA).commit();
      console.log(`✅ Done for ${id}`);
    } catch (err) {
      console.error(`❌ Failed for ${id}: ${err.message}`);
    }
  }

  console.log('\n🎉 Successfully seeded Our Investment Strategies into Sanity!');
}

run().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
