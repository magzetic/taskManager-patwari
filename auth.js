import supabase from './supabaseClient.js'; // Ensure this matches the export in supabaseClient.js

async function authenticate(accessCode) {
    const { data, error } = await supabase
        .from('AccessControl')
        .select('access_code')
        .eq('access_code', accessCode)
        .single();

    if (error) {
        console.error('Error fetching access code:', error);
        return false;
    }

    return data !== null;
}

// Event listener for login button
document.getElementById('login-button').addEventListener('click', async () => {
    const accessCode = document.getElementById('access-code').value;

    const isAuthenticated = await authenticate(accessCode);

    if (isAuthenticated) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('task-manager').style.display = 'block';
    } else {
        alert('Invalid access code!');
    }
});
