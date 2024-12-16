// Select key elements from the DOM
let ul = document.querySelector("ul"); // The task list
let inp = document.querySelector("input"); // Input field for tasks
let btn = document.querySelector("button"); // Button to add tasks

// Initialize tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
    let item = document.createElement("li"); // Create a list item
    item.innerText = taskText; // Set the task text

    let delBtn = document.createElement("button"); // Create delete button
    delBtn.innerText = "Delete";
    delBtn.classList.add("delete"); // Add class for styling
    item.appendChild(delBtn); // Append delete button to the list item

    ul.appendChild(item); // Add the list item to the unordered list
    item.classList.add("fade-in"); // Add animation class

    showNotification("Task added!"); // Show notification
}

// Function to update tasks in local storage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => addTaskToDOM(task)); // Add each task to the DOM
});

// Add task when the button is clicked
btn.addEventListener("click", function () {
    let taskText = inp.value.trim(); // Get input value and trim whitespace
    if (taskText) {
        tasks.push(taskText); // Add task to the tasks array
        updateLocalStorage(); // Save updated tasks to local storage
        addTaskToDOM(taskText); // Add the task to the DOM
        inp.value = ""; // Clear the input field
    } else {
        showNotification("Please enter a valid task!"); // Show error notification
    }
});

// Add delete functionality for tasks
ul.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        let listItem = event.target.parentElement; // Get the list item
        listItem.classList.add("fade-out"); // Add fade-out animation
        setTimeout(() => {
            let taskIndex = Array.from(ul.children).indexOf(listItem); // Find the task index
            tasks.splice(taskIndex, 1); // Remove the task from the array
            updateLocalStorage(); // Update local storage
            listItem.remove(); // Remove the list item from the DOM
            showNotification("Task deleted!"); // Show notification
        }, 300); // Wait for animation to finish
    }
});

// Function to show notifications
function showNotification(message) {
    let notification = document.createElement("div"); // Create notification element
    notification.innerText = message; // Set notification text
    notification.classList.add("notification"); // Add class for styling
    document.body.appendChild(notification); // Add to the body

    // Remove the notification after 3 seconds
    setTimeout(() => notification.remove(), 3000);
}
