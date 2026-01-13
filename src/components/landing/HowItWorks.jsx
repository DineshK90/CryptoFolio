const steps = [
  "Create an account using secure authentication.",
  "Add cryptocurrencies and enter the quantities you want to track.",
  "Monitor portfolio performance with live market updates.",
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-slate-950">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          How CryptoFolio Works
        </h3>
        <p className="text-slate-400 text-lg">
          Get started in minutes with a simple, guided workflow.
        </p>
      </div>

      {/* Steps */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={step}
            className="flex items-start gap-6 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-semibold">
              {idx + 1}
            </div>

            <p className="text-slate-300 leading-relaxed">
              {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
