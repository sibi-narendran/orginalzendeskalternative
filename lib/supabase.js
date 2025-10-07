// Server-side Supabase client for API routes
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

// Use service role key for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Email submission functions
export async function getEmails() {
  try {
    const { data, error } = await supabaseAdmin
      .from('emails')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.error('Error fetching emails:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

export async function addEmail(emailData) {
  try {
    const { data, error } = await supabaseAdmin
      .from('emails')
      .insert([emailData])
      .select()
      .single()

    if (error) {
      console.error('Error adding email:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

export async function clearEmails() {
  try {
    const { data: existingEmails } = await supabaseAdmin
      .from('emails')
      .select('id')

    const count = existingEmails?.length || 0

    const { error } = await supabaseAdmin
      .from('emails')
      .delete()
      .gte('id', 0) // Delete all records

    if (error) {
      console.error('Error clearing emails:', error)
      throw error
    }

    return count
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

export function getStats(emails) {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  return {
    total: emails.length,
    today: emails.filter(email => 
      email.timestamp.split('T')[0] === today
    ).length,
    week: emails.filter(email => 
      new Date(email.timestamp) > oneWeekAgo
    ).length
  }
}
