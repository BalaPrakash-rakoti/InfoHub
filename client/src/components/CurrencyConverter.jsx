// client/src/components/CurrencyConverter.jsx
import React, { useState } from "react";
import { api } from "../api";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid INR amount.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.get("/api/currency", { params: { amount } });
      setResult(res.data);
    } catch (err) {
      console.error("Currency fetch failed:", err);
      setError("Could not fetch currency rates. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="card">
      <h2 className="heading">Currency Converter</h2>
      <p className="muted mb-4">
        Convert Indian Rupees (INR) to USD and EUR using real-time exchange rates.
      </p>

      <form onSubmit={handleConvert} className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="number"
          className="border border-slate-200 rounded-xl p-2 flex-1"
          placeholder="Enter amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="tab tab-active min-w-[120px]"
          disabled={isLoading}
        >
          {isLoading ? "Converting..." : "Convert"}
        </button>
      </form>

      {error && <div className="text-red-600">{error}</div>}

      {!error && result && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <div className="bg-slate-50 rounded-xl p-4 inline-block shadow">
            <p className="text-xl font-bold text-slate-800">{result.amount} INR</p>
            <div className="mt-2 text-slate-700 space-y-1">
              <p>💵 <strong>{result.usd}</strong> USD</p>
              <p>💶 <strong>{result.eur}</strong> EUR</p>
            </div>
            <p className="muted mt-2 text-sm">
              Provider: {result.provider || "ExchangeRate API"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
