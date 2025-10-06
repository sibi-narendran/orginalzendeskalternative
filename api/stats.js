// Stats API for Vercel deployment with shared storage
import { getEmails, getStats } from './db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get emails from shared storage and calculate real stats
    const emails = await getEmails();
    const stats = getStats(emails);

    res.json({ 
      success: true, 
      stats,
      message: emails.length > 0 ? `Live stats from ${emails.length} real submissions!` : 'No submissions yet. Demo stats shown when no data available.'
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false 
    });
  }
}
