//  DOM Elements
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const date = document.getElementById("task-date");
const list = document.getElementById("task-list");
const pending = document.getElementById("pending-count");
const search = document.getElementById("search");

//Local Storage Initialization
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

render();

//Form Submission & Validation
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    tasks.push({
        text: input.value,
        date: date.value,
        completed: false
    });
    
    save();
    
    input.value = "";
    date.value = "";
});

// Save to Local Storage
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

//  Dynamic Content Rendering & Progress Bar
function render() {
    list.innerHTML = "";
    let count = 0;
    let completed = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) count++;
        if (task.completed) completed++;

        let li = document.createElement("li");
        
        let dateHTML = task.date ? `<br><small><i class="fa-regular fa-calendar"></i> ${task.date}</small>` : '';

        li.innerHTML = `
            <div>
                <span>${task.text}</span>
                ${dateHTML}
            </div>
            <div style="display: flex; gap: 5px;">
                <button class="complete-btn" onclick="done(${index})" title="Complete Task">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="delete-btn" onclick="removeTask(${index})" title="Delete Task">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        list.appendChild(li);
    });

    pending.textContent = count;

    let progress = (completed / tasks.length) * 100;
    if (isNaN(progress)) progress = 0;

    document.getElementById("progress-bar").style.width = progress + "%";
}

//  Toggle Task Completion Status
function done(index) {
    tasks[index].completed = !tasks[index].completed;
    save();
}

//  Delete Task Component
function removeTask(index) {
    tasks.splice(index, 1);
    save();
}

// Search and Filter Feature
search.addEventListener("keyup", function() {
    let value = search.value.toLowerCase();
    document.querySelectorAll("#task-list li").forEach(task => {
        task.style.display = task.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
});