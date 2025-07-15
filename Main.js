document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText, false);
            savedTasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
            taskInput.value = '';
        }
    });

    function addTaskToDOM(text, completed) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;

        const span = document.createElement('span');
        span.textContent = text;
        if (completed) span.style.textDecoration = 'line-through';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';

        checkbox.addEventListener('change', () => {
            span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            const task = savedTasks.find(t => t.text === text);
            if (task) {
                task.completed = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }
        });

        removeBtn.addEventListener('click', () => {
            li.remove();
            savedTasks = savedTasks.filter(t => t.text !== text);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }
});