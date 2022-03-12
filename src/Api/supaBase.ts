import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cxbpfxtirdpjbqmkoxcs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YnBmeHRpcmRwamJxbWtveGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcxMTEzNjAsImV4cCI6MTk2MjY4NzM2MH0.a8fFF9sdomeDb8loKH5Wzp2O_nfjPG9QVdJrey_CdxY";
export const supabase = createClient(supabaseUrl, supabaseKey);
