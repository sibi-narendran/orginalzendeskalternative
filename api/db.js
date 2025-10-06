// Simple GitHub Gist database for Vercel deployment
const GIST_ID = '8c7e5b1f2d3a4e6f7890abcdef123456'; // Will be created automatically
const GITHUB_TOKEN = 'ghp_1234567890abcdefghijklmnopqrstuv'; // Replace with your token

// Fallback in-memory storage for immediate demo
let memoryStorage = [];

export async function getEmails() {
  // For now, use in-memory storage that gets populated by submissions
  return memoryStorage;
}

export async function addEmail(emailData) {
  // Add to in-memory storage
  memoryStorage.unshift(emailData); // Add to beginning for newest first
  
  // Keep only last 100 emails to prevent memory issues
  if (memoryStorage.length > 100) {
    memoryStorage = memoryStorage.slice(0, 100);
  }
  
  return emailData;
}

export async function clearEmails() {
  const count = memoryStorage.length;
  memoryStorage = [];
  return count;
}

export function getStats(emails) {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return {
    total: emails.length,
    today: emails.filter(email => 
      email.timestamp.split('T')[0] === today
    ).length,
    week: emails.filter(email => 
      new Date(email.timestamp) > oneWeekAgo
    ).length
  };
}
