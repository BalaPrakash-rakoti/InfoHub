// client/src/api.js
// Centralized API helper. If VITE_API_BASE is set (on production),
// requests will go there; otherwise they hit the same origin (Vite proxy in dev).
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
})
