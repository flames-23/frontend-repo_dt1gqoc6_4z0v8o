import { useState } from 'react';

export default function Pricing({ onSelect }) {
  const [plan, setPlan] = useState('free');

  const tiers = [
    {
      id: 'free',
      name: 'Starter',
      price: '$0',
      desc: '7 built-in comparisons',
      features: ['Row count, types, top categories', 'Distributions & correlations', 'Missing & unique values'],
      cta: 'Use Starter',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9',
      desc: 'Unlock up to 15 comparisons',
      features: ['Advanced breakdowns', 'Larger limits', 'Priority processing'],
      cta: 'Upgrade',
    },
  ];

  return (
    <section id="pricing" className="mx-auto mt-12 w-full max-w-6xl text-white">
      <h3 className="mb-6 text-center text-2xl font-semibold">Simple pricing</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tiers.map((t) => (
          <div key={t.id} className={`rounded-2xl border ${plan === t.id ? 'border-emerald-400' : 'border-white/10'} bg-black/60 p-6 backdrop-blur`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-400">{t.desc}</p>
              </div>
              <div className="text-2xl font-bold text-emerald-400">{t.price}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {t.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <button
              onClick={() => { setPlan(t.id); onSelect?.(t.id); }}
              className="mt-5 w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
