import { useEffect, useMemo, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Chart({ chart }) {
  const { title, type, labels, values } = chart;
  const maxVal = Math.max(...values, 1);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-3 text-sm font-semibold text-white/90">{title}</h4>
      {type === 'stat' ? (
        <div className="text-3xl font-bold text-emerald-400">{values[0]?.toLocaleString?.() ?? values[0]}</div>
      ) : (
        <div className="grid grid-cols-12 gap-2">
          {labels.map((l, i) => (
            <div key={i} className="col-span-12">
              <div className="flex items-end gap-3">
                <div className="w-32 truncate text-xs text-gray-300" title={l}>{l}</div>
                <div className="h-4 flex-1 rounded bg-emerald-500/20">
                  <div
                    className="h-4 rounded bg-emerald-400"
                    style={{ width: `${(values[i] / maxVal) * 100}%` }}
                  />
                </div>
                <div className="w-20 text-right text-xs text-gray-400">{values[i]}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ dataset, query, onQueryChange }) {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const columns = dataset?.columns || [];

  const fetchDashboard = async () => {
    if (!dataset?.dataset_id) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataset_id: dataset.dataset_id, ...query }),
      });
      if (!res.ok) throw new Error('Failed to load dashboard');
      const data = await res.json();
      setCharts(data.charts || []);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset?.dataset_id, JSON.stringify(query)]);

  return (
    <section className="mx-auto mt-8 w-full max-w-6xl text-white">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Analytical Dashboard</h3>
            <p className="text-sm text-gray-400">Select columns to customize a focused comparison.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs text-gray-400">X (group)</label>
              <select
                value={query.x || ''}
                onChange={(e) => onQueryChange({ ...query, x: e.target.value || null })}
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm"
              >
                <option value="">Auto</option>
                {columns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Y (value)</label>
              <select
                value={query.y || ''}
                onChange={(e) => onQueryChange({ ...query, y: e.target.value || null })}
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm"
              >
                <option value="">Auto</option>
                {columns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Group by</label>
              <select
                value={query.group_by || ''}
                onChange={(e) => onQueryChange({ ...query, group_by: e.target.value || null })}
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm"
              >
                <option value="">None</option>
                {columns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Rows limit</label>
              <select
                value={query.limit || 1000}
                onChange={(e) => onQueryChange({ ...query, limit: Number(e.target.value) })}
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm"
              >
                {[100, 500, 1000, 2000, 5000].map((n) => (
                  <option key={n} value={n}>{n.toLocaleString()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && <p className="text-sm text-gray-400">Loading charts…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {charts.map((c, i) => (
            <Chart key={i} chart={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
