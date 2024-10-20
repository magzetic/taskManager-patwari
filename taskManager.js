async function loadTasks() {
  // Fetch tasks from Supabase and display them
  const { data: tasks, error } = await supabase
      .from('Tasks')
      .select('*');
  
  if (error) {
      console.error('Error fetching tasks:', error);
      return;
  }

  const tbody = document.querySelector('#task-table tbody');
  tbody.innerHTML = ''; // Clear existing tasks

  tasks.forEach((task, index) => {
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
          <td>
              <button class="edit" onclick="editTask(${task.id})">Edit</button>
              <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
          </td>
      `;
      tbody.appendChild(row);
  });
}

async function editTask(taskId) {
  // Logic to edit a task
}

async function deleteTask(taskId) {
  // Logic to delete a task
  const { error } = await supabase
      .from('Tasks')
      .delete()
      .eq('id', taskId);

  if (error) {
      console.error('Error deleting task:', error);
  } else {
      loadTasks(); // Refresh task list after deletion
  }
}
