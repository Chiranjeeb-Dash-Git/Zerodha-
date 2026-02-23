const DEFAULT_LOCAL = 'http://localhost:5000';
const PROD_FALLBACK = 'https://zerodha-e1nb.onrender.com';

export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === 'production' ? PROD_FALLBACK : DEFAULT_LOCAL);
