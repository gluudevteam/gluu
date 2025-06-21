import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; // pass supabase url
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY; // pass supabase key

const supabase = createClient(supabaseUrl, supabaseKey); // pass supabase url and key

export default supabase;