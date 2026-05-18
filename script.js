// DOM Elements
var form = document.getElementById("task-form");
var input = document.getElementById("task-input");
var date = document.getElementById("task-date");
var list = document.getElementById("task-list");
var pending = document.getElementById("pending-count");
var search = document.getElementById("search");

// Local Storage Initialization
var tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks === null) {
    tasks = [];
}

render(); //to show existing tasks on the page

// Form Submission
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    var newTask = { // creating a new object 
        text: input.value,
        date: date.value,
        completed: false
    };
    
    tasks.push(newTask); 
    save();
    
    input.value = ""; //to clear input fields
    date.value = "";
});

// Save to Local Storage
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

function render() {
    list.innerHTML = ""; // clearing the list to add it again later  
    var count = 0;
    var completed = 0;

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];

        if (task.completed === false) {
            count = count + 1;
        } else {
            completed = completed + 1;
        }

        var li = document.createElement("li");
        
        var dateHTML = "";
        if (task.date !== "") {
            dateHTML = "<br><small><i class='fa-regular fa-calendar'></i> " + task.date + "</small>";
        }

       // creating the task content 
        li.innerHTML =
        "<div>" +
        "<span>" + task.text + "</span>" +
        dateHTML +
        "</div>" +
        "<div class='button-container'>" +
        "<button class='complete-btn' onclick='done(" + i + ")'>" +
        "<i class='fa-solid fa-check'></i>" +
        "</button>" +
        "<button class='delete-btn' onclick='removeTask(" + i + ")'>" +
        "<i class='fa-solid fa-trash'></i>" +
        "</button>" +
        "</div>";
        if (task.completed === true) {
            li.classList.add("completed");
        }

        list.appendChild(li);
    }

    pending.textContent = count;

    var progress = 0; // update progress par 
    if (tasks.length > 0) {
        progress = (completed / tasks.length) * 100;
    }

    var progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progress + "%";
}

// changing the Task Status
function done(index) {
    if (tasks[index].completed === true) {
        tasks[index].completed = false;
    } else {
        tasks[index].completed = true;
    }
    save();
}

function removeTask(index) {
    tasks.splice(index, 1);
    save();
}

// Search and Filter Feature
search.addEventListener("keyup", function() { 
    var value = search.value.toLowerCase();
    var allTasks = document.querySelectorAll("#task-list li"); // selecting all tasks in the list
    
    for (var i = 0; i < allTasks.length; i++) {
        var currentTask = allTasks[i];
        var text = currentTask.innerText.toLowerCase();
        
        if (text.includes(value) === true) {
            currentTask.style.display = "flex"; // flex: to show the task in a row
        } else {
            currentTask.style.display = "none";
        }
    }
}); 