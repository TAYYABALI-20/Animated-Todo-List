const addTask = document.querySelector('.add-task'),
    searchTask = document.querySelector('.search-task'),
    submitBtn = document.querySelector('.submit-btn'),
    deleteBtn = document.querySelector('.delete-btn'),
    tasksContainer = document.querySelector('.tasks-container');

submitBtn.addEventListener('click', () => {

    if (addTask.value.trim() != 0) {

        let localTasks = JSON.parse(localStorage.getItem('localTasks'));

        if (localTasks === null) {
            localTask = [];
        } else {
            localTask = localTasks;
        };

        localTask.push(addTask.value);

        localStorage.setItem('localTasks', JSON.stringify(localTask));

    };

    showTasks();

});

function showTasks() {

    let task = '';

    let localTasks = JSON.parse(localStorage.getItem('localTasks'));

    if (localTasks === null) {
        localTask = [];
    } else {
        localTask = localTasks;
    };

    localTask.forEach((data, index) => {

        task += `
            <div class="task">
                <span>${index + 1 + '.'}</span>
                <p class="added-task">${data}</p>
                    <div class="icons">
                        <i class="bi bi-pencil-square" onclick="updateTask(${index})"></i>
                        <i class="bi bi-trash3" onclick="deleteTask(${index})"></i>
                    </div>
            </div>
    `;

    });

    tasksContainer.innerHTML = task;

    addTask.value = '';

};

showTasks();

function deleteTask(index) {

    let localTasks = JSON.parse(localStorage.getItem('localTasks'));

    localTask.splice(index, 1);

    localStorage.setItem('localTasks', JSON.stringify(localTask));

    showTasks();

};

function updateTask(index) {
    // Select the task to be updated
    let task = document.querySelectorAll('.task')[index];
    let addedTask = task.querySelector('.added-task');

    // Check if an input field already exists
    if (addedTask.querySelector('input')) {
        return; // If an input field exists, don't create another one
    }

    const scrollY = window.scrollY;

    // Create an input element to edit the task
    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('edit-input');
    editInput.value = addedTask.textContent;

    // Clear the current content and add the input field
    addedTask.textContent = '';
    addedTask.appendChild(editInput);
    editInput.focus();

    // Maintain scroll position
    window.scrollTo(0, scrollY);

    // Listen for Enter key to save the edited task
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Save the updated task in local storage
            let localTasks = JSON.parse(localStorage.getItem('localTasks')) || [];
            localTasks[index] = editInput.value;
            localStorage.setItem('localTasks', JSON.stringify(localTasks));

            // Update the task text and clean up the input field
            addedTask.textContent = editInput.value;

            // Remove the input field after saving
            editInput.remove();
        }
    });

    // Add event listener for blur event to handle when the input loses focus
    editInput.addEventListener('blur', () => {
        // If the user clicks away or focuses out, just display the current text without saving changes
        addedTask.textContent = editInput.value || localTasks[index];
    });
}

searchTask.addEventListener('input', () => {

    let addedTasks = document.querySelectorAll('.task');

    addedTasks.forEach(task => {

        let taskText = task.querySelector('.added-task').textContent.toLowerCase();

        if (taskText.includes(searchTask.value.toLowerCase())) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        };

    });

});