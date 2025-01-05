
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pcsaivhiooqieavmsmko.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjc2Fpdmhpb29xaWVhdm1zbWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzgyNTcsImV4cCI6MjA1MTM1NDI1N30.6WBrQvTDJPRJ3THARpC59IDmTWTtonSE4Hmut7NCfNE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase