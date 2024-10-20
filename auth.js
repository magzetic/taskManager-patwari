async function authenticate(accessCode) {
  // Fetch the access code from the AccessControl table
  const { data, error } = await supabase
      .from('AccessControl') // Using your actual table name
      .select('access_code')  // Using the correct column name
      .eq('access_code', accessCode) // Filter to match the entered access code
      .single();             // We expect only one result

  if (error) {
      console.error('Error fetching access code:', error);
      return false; // Authentication failed due to error
  }

  // Check if a matching access code was found
  return data !== null; // Return true if an access code exists, false otherwise
}
