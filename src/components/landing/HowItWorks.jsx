const steps = [
  "Create an account using secure authentication.",
  "Add cryptocurrencies and enter the quantities you want to track.",
  "Monitor portfolio performance with live market updates."
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <h3 className="text-3xl font-semibold text-center mb-12">
        How CryptoFolio Works
      </h3>
      <div className="max-w-4xl mx-auto space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="text-indigo-500 font-bold">{idx + 1}</span>
            <p className="text-slate-300">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
