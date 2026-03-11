import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://liujmvveyaoyargpxbjn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdWptdnZleWFveWFyZ3B4YmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzI2MjksImV4cCI6MjA4ODgwODYyOX0.Xd7WcJVB-laj57ewIqE4nYsxlTM5YHKGPC_ulfyUpbg";

export const supabase = createClient(supabaseUrl, supabaseKey);