export default function Footer() {
  return (
    <footer className="border-t border-slate-900 py-8 px-6 text-center">
      <p className="text-sm text-slate-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-slate-300 font-medium">
          CryptoFolio
        </span>
        . Market data provided by{" "}
        <span className="text-slate-400">
          CoinGecko
        </span>
        .
      </p>
    </footer>
  );
}
