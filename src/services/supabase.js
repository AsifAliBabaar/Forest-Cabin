
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://omqoflrmyxrtjftyiamr.supabase.co'
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tcW9mbHJteXhydGpmdHlpYW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1OTM3MzgsImV4cCI6MjA3MDE2OTczOH0.jJzwxOXqmMZYVc2t6Sv4uQIJCjE7NOILEkdqwBZu5rg";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;