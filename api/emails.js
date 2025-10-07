// Email collection API for Vercel with shared storage
import { getEmails, addEmail, clearEmails } from './db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      // Submit new email
      const { email } = req.body;
      
      // Validate email
      if (!email || !email.includes('@')) {
        return res.status(400).json({ 
          error: 'Valid email address is required',
          success: false 
        });
      }

      const emailData = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).substr(2, 9),
        email: email.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
        ip_address: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown'
      };

      // Save email to Supabase database
      try {
        const savedEmail = await addEmail(emailData);
        
        console.log(`New email saved: ${emailData.email} at ${emailData.timestamp}`);
        
        return res.status(201).json({ 
          success: true, 
          message: 'Email saved successfully to database',
          id: savedEmail.id,
          email: savedEmail.email,
          timestamp: savedEmail.timestamp
        });
      } catch (dbError) {
        console.error('Database save failed:', dbError);
        return res.status(500).json({ 
          error: 'Failed to save email to database',
          success: false,
          details: 'Database connection issue. Please try again.'
        });
      }
    }

    if (req.method === 'GET') {
      // Get all emails from Supabase database
      try {
        const emails = await getEmails();
        
        // Check if we got demo data (fallback when DB is not configured)
        const isDemo = emails.some(email => email.id.startsWith('demo-'));
        
        return res.json({ 
          success: true, 
          emails: emails,
          total: emails.length,
          message: isDemo 
            ? 'Showing demo data. Configure Supabase to see real submissions!' 
            : `${emails.length} real email submissions collected from database!`,
          database_status: isDemo ? 'demo_mode' : 'connected'
        });
      } catch (dbError) {
        console.error('Database fetch failed:', dbError);
        return res.status(500).json({ 
          error: 'Failed to fetch emails from database',
          success: false,
          details: 'Database connection issue. Please check Supabase configuration.'
        });
      }
    }

    if (req.method === 'DELETE') {
      // Clear all emails from Supabase database
      try {
        const deletedCount = await clearEmails();
        
        return res.json({ 
          success: true, 
          message: `Deleted ${deletedCount} email records from database`,
          deletedCount
        });
      } catch (dbError) {
        console.error('Database clear failed:', dbError);
        return res.status(500).json({ 
          error: 'Failed to clear emails from database',
          success: false,
          details: 'Database connection issue. Please check Supabase configuration.'
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false,
      details: error.message
    });
  }
}
