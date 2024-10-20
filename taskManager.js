import supabase from './supabaseClient.js'; // Ensure this matches the export in supabaseClient.js

async function fetchTasks() {
    const { data, error } = await supabase
        .from('Tasks')
        .select('*');

    if (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }

    return data;
}

async function addTask(task) {
    const { error } = await supabase
        .from('Tasks')
        .insert([task]);

    if (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(taskId) {
    const { error } = await supabase
        .from('Tasks')
        .delete()
        .match({ id: taskId });

    if (error) {
        console.error('Error deleting task:', error);
    }
}

// Event listener for adding a task
document.getElementById('add-task-button').addEventListener('click', async () => {
    const task = {
        name: document.getElementById('task-name').value,
        mobile_number: document.getElementById('mobile-number').value,
        remark1: document.getElementById('remark1').value,
        remark2: document.getElementById('remark2').value,
        deadline: document.getElementById('deadline').value,
        amount: document.getElementById('amount').value,
        village: document.getElementById('village').value
    };

    await addTask(task);
    loadTasks();
});

async function loadTasks() {
    const tasks = await fetchTasks();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <div>${task.name} - ${task.amount}</div>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

loadTasks();
