# 🌐 InfoHub — Full Stack React + Node.js Utility Dashboard

**InfoHub** is a responsive single-page full-stack web application (SPA) built using **React (Vite)** and **Node.js (Express)**.  
It combines three everyday utilities — 🌦️ Weather, 💱 Currency Conversion, and 💬 Motivational Quotes — into one modern, dynamic dashboard.

This project was developed as part of real-world skills in **frontend, backend, and API integration**.

---

## 🚀 **Live Demo**
🔗 **[View the deployed project on Vercel](https://your-vercel-app-url.vercel.app)**  
*(Replace with your actual deployment link after uploading to Vercel.)*

---

## 🌟 **Key Features**

### 🌤️ Weather Dashboard
- Real-time weather data from the **Open-Meteo API** (no key required)
- City search bar with dynamic results
- Displays:
  - Current temperature 🌡️  
  - Feels like temperature 🥵  
  - Humidity 💧  
  - Wind speed 🌬️  
  - 12-hour hourly forecast 🕒  
  - 5-day daily forecast 📅  
- Uses **emoji icons** (☀️ 🌧️ 🌩️ ❄️) — no image files required

### 💱 Currency Converter
- Converts **INR → USD / EUR** instantly using live API data
- Auto-fallback to secondary API for high reliability
- Input validation and clean result cards

### 💬 Quote Generator
- Displays random motivational quotes fetched from the **Quotable API**
- Includes fallback quotes for offline use


---

## 🛠️ **Tech Stack**

| Layer | Technology | Description |
|--------|-------------|-------------|
| Frontend | **React (Vite)** | Modern SPA frontend with hooks |
| Styling | **Tailwind CSS** | Clean, responsive design |
| Backend | **Node.js + Express** | RESTful API for weather, currency & quotes |
| HTTP Client | **Axios** | Simplified API calls between client & server |
| Deployment | **Vercel** | Full-stack hosting (Frontend + Serverless API) |

---

## 📁 **Project Structure**
```bash
InfoHub/
├── client/                      # React Frontend (Vite)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── QuoteGenerator.jsx
│   │   ├── App.jsx              # Main App component (includes dark mode + tabs)
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind styles
│   ├── package.json
│   └── vite.config.js
│
└── server/                      # Node.js / Express Backend
    ├── server.js                # API routes for weather, currency, and quotes
    ├── package.json
    ├── .env                     # Optional (for API keys)
    └── node_modules/
