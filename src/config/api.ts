// API Configuration for different environments
const API_CONFIG = {
  development: 'http://localhost:3001',
  production: '' // Will be set to Vercel URL
};

export const getApiUrl = () => {
  // Check if we're on Vercel/production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app') || hostname.includes('zendesk-alternative')) {
      return ''; // Use relative URLs for Vercel functions
    }
  }
  
  return API_CONFIG.development;
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}/api/${endpoint}`;
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};
