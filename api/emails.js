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
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        email: email.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
        ip_address: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown'
      };

      // Save email to shared storage
      const savedEmail = await addEmail(emailData);
      
      console.log(`New email saved: ${emailData.email} at ${emailData.timestamp}`);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Email saved successfully',
        id: savedEmail.id,
        email: savedEmail.email,
        timestamp: savedEmail.timestamp
      });
    }

    if (req.method === 'GET') {
      // Get all emails from shared storage
      const emails = await getEmails();
      
      // If no emails yet, show some demo data so admin page looks good
      if (emails.length === 0) {
        const demoEmails = [
          {
            id: 'demo-3',
            email: 'sarah.johnson@shopify.com',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            ip_address: '192.168.1.45',
            user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
          },
          {
            id: 'demo-2', 
            email: 'mike.chen@bigcommerce.com',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            ip_address: '10.0.0.123',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          },
          {
            id: 'demo-1',
            email: 'alex.rodriguez@woocommerce.com', 
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            ip_address: '172.16.0.67',
            user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)'
          }
        ];
        
        return res.json({ 
          success: true, 
          emails: demoEmails,
          total: demoEmails.length,
          message: 'Showing demo data. Submit an email to see real submissions appear!'
        });
      }
      
      return res.json({ 
        success: true, 
        emails: emails,
        total: emails.length,
        message: `${emails.length} real email submissions collected!`
      });
    }

    if (req.method === 'DELETE') {
      // Clear all emails from shared storage
      const deletedCount = await clearEmails();
      
      return res.json({ 
        success: true, 
        message: `Deleted ${deletedCount} email records`,
        deletedCount
      });
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
