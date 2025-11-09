import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black pointer-events-none" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
          Turn Raw Data into Visual Dashboards
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
          Upload CSV or tabular files and instantly get 7+ insights. Upgrade to unlock up to 15 comparisons.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#uploader" className="rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">
            Get Started
          </a>
          <a href="#features" className="rounded-md border border-white/20 px-5 py-3 text-sm text-white/90 hover:bg-white/10">
            See Features
          </a>
        </div>
      </div>
    </section>
  );
}
