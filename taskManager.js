// Example code to fetch and display tasks
const taskTableBody = document.querySelector('#task-table tbody');

async function loadTasks() {
  const { data, error } = await supabase.from('Tasks').select('*');

  if (error) {
    console.error('Error loading tasks:', error);
    return;
  }

  // Clear the table first
  taskTableBody.innerHTML = '';

  // Add tasks to the table
  data.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.name}</td>
      <td>${task.task}</td>
      <td>${task.mobile_number}</td>
      <td>${task.village}</td>
      <td>${task.remark1}</td>
      <td>${task.remark2}</td>
      <td>${task.deadline}</td>
      <td>${task.amount}</td>
      <td><button onclick="editTask(${
        task.id
      })">Edit</button><button onclick="deleteTask(${
      task.id
    })">Delete</button></td>
    `;
    taskTableBody.appendChild(row);
  });
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add functions for editing and deleting tasks
async function editTask(taskId) {
  // Fetch and edit task logic
}

async function deleteTask(taskId) {
  const { error } = await supabase.from('Tasks').delete().eq('id', taskId);

  if (error) {
    console.error('Error deleting task:', error);
    return;
  }

  loadTasks(); // Reload tasks after deletion
}
