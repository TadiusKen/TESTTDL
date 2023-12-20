function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    // Generate a unique identifier based on IP address and user agent
    var uniqueIdentifier = getUniqueIdentifier();

    if (taskInput.value !== "") {
        var li = document.createElement("li");
        var taskId = "task-" + Date.now(); // Unique task ID
        li.id = taskId;
        li.appendChild(document.createTextNode(taskInput.value));
        taskList.appendChild(li);
        taskInput.value = "";

        // Save the task to local storage with the unique identifier
        saveTask(uniqueIdentifier, taskId, taskInput.value);

        // Add a click event listener to remove the task when clicked
        li.addEventListener("click", function() {
            this.remove();
            // Remove the task from local storage
            removeTask(uniqueIdentifier, taskId);
        });
    }
}

function getUniqueIdentifier() {
    // You can customize this based on your needs
    return window.navigator.userAgent + "@" + window.location.host;
}

function saveTask(identifier, taskId, taskValue) {
    // Retrieve existing tasks from local storage
    var savedTasks = JSON.parse(localStorage.getItem(identifier)) || {};

    // Save the new task
    savedTasks[taskId] = taskValue;

    // Store the updated tasks in local storage
    localStorage.setItem(identifier, JSON.stringify(savedTasks));
}

function removeTask(identifier, taskId) {
    // Retrieve existing tasks from local storage
    var savedTasks = JSON.parse(localStorage.getItem(identifier)) || {};

    // Remove the task
    delete savedTasks[taskId];

    // Store the updated tasks in local storage
    localStorage.setItem(identifier, JSON.stringify(savedTasks));
}
