import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lyoxgrmflmgcmukiakvz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5b3hncm1mbG1nY211a2lha3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTAzMjcsImV4cCI6MjA3MDk4NjMyN30.Dud3gkmwbzTtAgbfqYhKBLO3xg55GkRvZOlpNrnDUHg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
