const accessForm = document.getElementById('access-form');
const errorMessage = document.getElementById('error-message');
const loginContainer = document.getElementById('login-container');
const taskManagerContainer = document.getElementById('task-manager');

// Handle authentication
accessForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the user input
  const userAccessCode = document.getElementById('accessCode').value;

  // Fetch the stored access code from Supabase
  const { data, error } = await supabase
    .from('AccessControl')
    .select('access_code')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching access code:', error);
    return;
  }

  // Compare the access codes
  if (data.access_code === userAccessCode) {
    // Store authenticated status in local storage
    localStorage.setItem('authenticated', true);
    showTaskManager();
  } else {
    // Access denied: Show error message
    errorMessage.style.display = 'block';
  }
});

// Check if user is already authenticated
if (localStorage.getItem('authenticated')) {
  showTaskManager();
}

// Show task manager UI and hide login UI
function showTaskManager() {
  loginContainer.style.display = 'none';
  taskManagerContainer.style.display = 'block';
}
