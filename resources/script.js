let taskList = [];

// to store tasks into local storage
if (localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

document.querySelector("#addTask").addEventListener("click", newTask);
btnClear.addEventListener("click", clear);

// That's why we can see only selected filter's items
displayTask(document.querySelector("span.active").id);

function displayTask(filter) {
    let ul = document.getElementById("task-list");

    //prevents adding extra tasks
    ul.innerHTML = "";

    // to add tasks dynamically
    if (taskList.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0' >Task List is Empty!</p>";
    } else {
        for (let task of taskList) {
            let completed = task.status == "completed" ? "checked" : "";

            if (filter == task.status || filter == "all") {
                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input
                                type="checkbox"
                                onclick="updateStatus(this)"
                                class="form-check-input" ${completed}
                                id="${task.id}"
                            />
                            <label
                                for="${task.id}"
                                class="form-check-label ${completed}"
                                >${task.taskTitle}</label
                            >
                        </div>

                        <div class="icons">
                            <button 
                                class="btn btn-trash"
                                type="button"
                                onclick="deleteTask(${task.id})"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                            <button
                                class="btn btn-edit"
                                type="button"
                                onclick='editTask(${task.id}, "${task.taskTitle}")'
                            >
                            <i class="fa-solid fa-pen"></i>
                            </button>
                        </div>
                    </li>
                `;

                // adds li element before end of ul
                ul.insertAdjacentHTML("beforeend", li);
            }
        }
    }
}

// For filters
for (let span of filters) {
    span.addEventListener("click", function () {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");

        displayTask(span.id);
    });
}

// Adds new task
function newTask(event) {
    if (taskInput.value == "") {
        alert("You have to type something!");
    } else {
        if (!isEditTask) {
            //adding
            taskList.push({
                id: taskList.length + 1,
                taskTitle: taskInput.value,
                status: "pending",
            });
            taskInput.value = "";
        } else {
            //updating
            for (let task of taskList) {
                if (task.id == editId) {
                    task.taskTitle = taskInput.value;
                }
                isEditTask = false;
            }
        }
        displayTask(document.querySelector("span.active").id);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }
    event.preventDefault();
}

// Deletes task
function deleteTask(id) {
    let deleteId;

    deleteId = taskList.findIndex((task) => task.id == id);

    taskList.splice(deleteId, 1);
    displayTask(document.querySelector("span.active").id);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Edit task
function editTask(taskId, taskTitle) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskTitle;
    taskInput.focus();
    taskInput.classList.add("active");
}

// Clears all tasks
function clear() {
    taskList.splice(0, taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTask();
}

// Updates task status
function updateStatus(selectedTask) {
    let label = selectedTask.nextElementSibling;
    let status;

    if (selectedTask.checked) {
        label.classList.add("checked");
        status = "completed";
    } else {
        label.classList.remove("checked");
        status = "pending";
    }

    for (let task of taskList) {
        if (task.id == selectedTask.id) {
            task.status = status;
        }
    }

    // no need to change tabs to reload task status
    displayTask(document.querySelector("span.active").id)

    localStorage.setItem("taskList", JSON.stringify(taskList));
}
