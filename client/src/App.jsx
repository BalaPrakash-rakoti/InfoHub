// client/src/App.jsx
// Main SPA layout with tabbed navigation
import React, { useState } from 'react'
import WeatherModule from './components/WeatherModule.jsx'
import CurrencyConverter from './components/CurrencyConverter.jsx'
import QuoteGenerator from './components/QuoteGenerator.jsx'

const TABS = ['Weather', 'Converter', 'Quotes']

export default function App() {
  const [activeTab, setActiveTab] = useState('Weather')

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">InfoHub</h1>
        <p className="muted mt-1">Real-time weather, currency conversion, and motivational quotes — all in one place.</p>
      </header>

      <nav className="flex gap-2 mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="space-y-6">
        {activeTab === 'Weather' && <WeatherModule />}
        {activeTab === 'Converter' && <CurrencyConverter />}
        {activeTab === 'Quotes' && <QuoteGenerator />}
      </main>

      <footer className="mt-10 text-center muted">
        Built with React + Vite + Tailwind · Backend: Express
      </footer>
    </div>
  )
}
