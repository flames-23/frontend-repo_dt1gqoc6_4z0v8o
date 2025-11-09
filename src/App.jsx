import { useState } from 'react';
import Hero from './components/Hero';
import UploadPanel from './components/UploadPanel';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';

function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-white">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="font-semibold">DataDash</span>
      </div>
      <nav className="hidden gap-6 text-sm text-white/80 sm:flex">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#pricing" className="hover:text-white">Pricing</a>
        <a href="#uploader" className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Upload</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-12 w-full max-w-6xl px-6 py-8 text-center text-xs text-white/50">
      © {new Date().getFullYear()} DataDash. All rights reserved.
    </footer>
  );
}

export default function App() {
  const [dataset, setDataset] = useState(null);
  const [query, setQuery] = useState({ limit: 1000 });
  const [plan, setPlan] = useState('free');

  return (
    <div className="min-h-screen bg-black font-inter">
      <Header />
      <Hero />

      <main className="px-6">
        <UploadPanel onUploaded={(d) => setDataset(d)} />

        {dataset && (
          <Dashboard
            dataset={dataset}
            query={{ ...query, limit: plan === 'pro' ? 5000 : 1000 }}
            onQueryChange={setQuery}
          />
        )}

        <section id="features" className="mx-auto mt-12 w-full max-w-6xl text-white">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              'Instant upload & parse',
              'Auto-detected columns',
              '7 core comparisons',
              'Flexible column picker',
              'Smart binning',
              'Correlation scan',
              'Upgrade to 15 charts',
            ].map((f, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
                {f}
              </div>
            ))}
          </div>
        </section>

        <Pricing onSelect={setPlan} />
      </main>

      <Footer />
    </div>
  );
}
