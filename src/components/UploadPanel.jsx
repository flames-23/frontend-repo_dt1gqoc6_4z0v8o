import { useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function UploadPanel({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch(`${BACKEND}/upload`, { method: 'POST', body: form });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onUploaded(data);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="uploader" className="relative mx-auto -mt-16 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/60 p-6 text-white backdrop-blur">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Upload your dataset</h2>
          <p className="text-sm text-gray-400">CSV or tab-separated text supported.</p>
        </div>
        <div className="flex w-full max-w-md items-center gap-3">
          <input
            type="file"
            accept=".csv,.txt,.tsv,.data"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </section>
  );
}
