// client/src/components/QuoteGenerator.jsx
// Pulls a motivational quote from the backend. Starts with mock quotes.
import React, { useState } from 'react'
import { api } from '../api'

export default function QuoteGenerator() {
  const [quote, setQuote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const getQuote = async () => {
    setIsLoading(true)
  }
  const fetchQuote = async () => {
    setIsLoading(true)
    setError('')
    try {
      const res = await api.get('/api/quote')
      setQuote(res.data.quote)
    } catch (e) {
      setError(e?.response?.data?.error || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="card">
      <h2 className="heading">Motivational Quote</h2>
      <p className="muted mb-4">Click to get inspired.</p>

      <button onClick={fetchQuote} className="tab tab-active">New Quote</button>

      {isLoading && <div className="muted mt-3">Fetching quote...</div>}
      {error && <div className="text-red-600 mt-3">{error}</div>}
      {quote && !isLoading && !error && (
        <blockquote className="mt-4 text-lg text-slate-800 border-l-4 border-slate-300 pl-4 italic">
          “{quote}”
        </blockquote>
      )}
    </section>
  )
}
