export default function Footer() {
  return (
    <footer className="py-8 text-center text-slate-500 text-sm">
      © {new Date().getFullYear()} CryptoFolio. Market data provided by CoinGecko.
    </footer>
  );
}
