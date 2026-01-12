export default function AddAssetForm({ coins, loading, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-lg w-full"
    >
      <h2 className="text-xl font-semibold mb-6">Add Crypto Asset</h2>

      <div className="space-y-4">
        {/* Coin Selector */}
        <div>
          <label className="block text-sm mb-1 text-slate-400">
            Cryptocurrency
          </label>

          <select
            name="coin"
            required
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="">
              {loading ? "Loading coins..." : "Select a coin"}
            </option>

            {!loading &&
              coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </option>
              ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm mb-1 text-slate-400">
            Quantity Owned
          </label>
          <input
            type="number"
            name="quantity"
            step="any"
            min="0"
            required
            placeholder="e.g. 0.25"
            className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-md font-medium disabled:opacity-50"
        >
          Save Asset
        </button>

        <a
          href="/app"
          className="px-6 py-2 rounded-md border border-slate-700 text-slate-300 hover:text-white text-center"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
