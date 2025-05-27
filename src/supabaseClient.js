import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ibfwbijmxmtgvehymrmq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZndiaWpteG10Z3ZlaHltcm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjgwMDQsImV4cCI6MjA2Mzg0NDAwNH0.mOfoROakPcD_PEar6e-MXAK8e3OsAHDd53Za4gtORmI'

export const supabase = createClient(supabaseUrl, supabaseKey)
