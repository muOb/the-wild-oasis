import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kusvadebsmsqecmhtbru.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1c3ZhZGVic21zcWVjbWh0YnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MTY5OTIsImV4cCI6MjA1MjE5Mjk5Mn0.N2i_q7cU4g5HdoRJudgG2C0uE2bgOAmJJsZBBlZHZVE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
