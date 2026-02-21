import { supabase } from './lib/supabase';

// Test Supabase connection
async function testConnection() {
  console.log('🔄 Testing Supabase connection...');
  
  try {
    // Test 1: Check connection
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Connection error:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connected successfully!');
    console.log('📊 Profiles table exists');
    
    // Test 2: Check all tables
    const tables = ['profiles', 'links', 'products', 'clicks', 'page_views', 'purchased_templates', 'integrations', 'custom_domains', 'notifications'];
    
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('count', { count: 'exact', head: true });
      if (tableError) {
        console.error(`❌ Table '${table}' error:`, tableError.message);
      } else {
        console.log(`✅ Table '${table}' exists`);
      }
    }
    
    return true;
  } catch (err) {
    console.error('❌ Connection failed:', err);
    return false;
  }
}

// Run test
testConnection();
