document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const taskManager = document.getElementById("task-manager");

    // Handle login form submission
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const accessCode = document.getElementById("access-code").value;
        const isAuthenticated = await authenticate(accessCode);
        
        if (isAuthenticated) {
            loginContainer.style.display = "none";
            taskManager.style.display = "block";
            loadTasks(); // Load tasks after successful login
        } else {
            document.getElementById("error-message").innerText = "Invalid Access Code!";
        }
    });
});
