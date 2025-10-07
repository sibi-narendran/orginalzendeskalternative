import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface EmailSubmission {
  id: string
  email: string
  timestamp: string
  ip_address?: string
  user_agent?: string
  created_at?: string
}
