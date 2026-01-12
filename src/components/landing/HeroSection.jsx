export default function HeroSection() {
  return (
    <section className="text-center py-24 px-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Track Your Crypto Portfolio with Confidence
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto mb-8">
        Monitor your digital assets, analyze performance, and stay informed
        with real-time cryptocurrency market data.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-md">
          Get Started
        </button>
        <button className="border border-slate-700 px-6 py-3 rounded-md text-slate-300 hover:text-white">
          Log In
        </button>
      </div>
    </section>
  );
}
