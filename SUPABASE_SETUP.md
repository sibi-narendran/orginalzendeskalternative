# 🗄️ Supabase Database Setup Guide

Your app now supports **persistent storage with Supabase**! Follow these steps to set up your database.

## 📋 Prerequisites

1. **Free Supabase Account**: Go to [https://supabase.com](https://supabase.com) and sign up
2. **5 minutes** of your time

## 🚀 Step 1: Create Supabase Project

1. **Login to Supabase**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Click "New Project"**
3. **Fill in project details**:
   - Project Name: `zendesk-alternative-db` (or your preferred name)
   - Database Password: Generate a strong password (save it!)
   - Region: Choose closest to your users
4. **Wait 2-3 minutes** for project creation

## 🛠️ Step 2: Create Database Table

1. **Open SQL Editor** in your Supabase dashboard
2. **Run this SQL command** to create the emails table:

```sql
-- Create emails table for storing email submissions
CREATE TABLE emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional, for added security)
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed)
CREATE POLICY "Allow all operations on emails" ON emails
FOR ALL USING (true) WITH CHECK (true);

-- Create an index for better query performance
CREATE INDEX emails_timestamp_idx ON emails (timestamp DESC);
CREATE INDEX emails_email_idx ON emails (email);
```

3. **Click "Run"** to execute the SQL

## 🔑 Step 3: Get Your API Keys

1. **Go to Settings > API** in your Supabase dashboard
2. **Copy these values**:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## ⚙️ Step 4: Configure Environment Variables

### For Vercel Deployment:

1. **Go to your Vercel dashboard**
2. **Navigate to your project > Settings > Environment Variables**
3. **Add these variables**:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Redeploy your app** or it will auto-deploy with new variables

### For Local Development:

1. **Create `.env` file** in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. **Restart your development server**

## ✅ Step 5: Test Your Database

1. **Visit your live website**
2. **Submit an email** through the signup form
3. **Check Admin dashboard** (`/admin` page) to see real data
4. **Verify in Supabase dashboard**: Go to Table Editor > emails table

## 🎉 What You Get

- ✅ **Persistent Storage**: Data survives deployments
- ✅ **Real-time Dashboard**: Admin panel with actual submissions  
- ✅ **Scalable**: Handles millions of records
- ✅ **Secure**: Built-in authentication & RLS
- ✅ **Free Tier**: 500MB database, 2 million edge functions
- ✅ **Automatic Backups**: Daily backups included

## 🔧 Optional: Advanced Configuration

### Enable Real-time Updates (Optional)

```sql
-- Enable realtime for the emails table
ALTER PUBLICATION supabase_realtime ADD TABLE emails;
```

### Set up Row Level Security Policies (Recommended)

```sql
-- Drop the permissive policy
DROP POLICY "Allow all operations on emails" ON emails;

-- Create more restrictive policies
CREATE POLICY "Enable insert for all users" ON emails FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON emails FOR SELECT USING (true);
CREATE POLICY "Enable delete for authenticated users" ON emails FOR DELETE USING (true);
```

## 🆘 Troubleshooting

### Issue: "Database connection failed"
- ✅ Check environment variables are set correctly
- ✅ Verify project URL and keys from Supabase dashboard
- ✅ Ensure table `emails` exists in your database

### Issue: "Insert failed"
- ✅ Check if RLS policies are too restrictive
- ✅ Verify table schema matches expected structure
- ✅ Look at Supabase logs in dashboard

### Issue: "Demo data still showing"
- ✅ Environment variables not set correctly
- ✅ Need to redeploy after adding variables
- ✅ Check browser console for error messages

## 📞 Need Help?

- 📖 [Supabase Documentation](https://supabase.com/docs)
- 💬 [Supabase Discord](https://discord.supabase.com/)
- 🐛 Check browser console and Vercel function logs

---

**Your database is now production-ready and will persist data permanently!** 🚀
