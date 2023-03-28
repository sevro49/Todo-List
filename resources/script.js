let taskList = [
    { id: 1, taskTitle: "Task 1" },
    { id: 2, taskTitle: "Task 2" },
    { id: 3, taskTitle: "Task 3" },
    { id: 4, taskTitle: "Task 4" },
];

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");

document.querySelector("#addTask").addEventListener("click", newTask);
btnClear.addEventListener("click", clear);

// to store tasks into local storage
if (localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

displayTask();

function displayTask() {
    let ul = document.getElementById("task-list");

    //prevents adding extra tasks
    ul.innerHTML = "";

    // to add tasks dynamically
    if (taskList.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0' >Task List is Empty!</p>";
    } else {
        for (let task of taskList) {
            let li = `
                    <li class=" task list-group-item">
                        <div class="form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="${task.id} "
                            />
                            <label
                                for="${task.id}"
                                class="form-check-label"
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

            // adds li element before en ul
            ul.insertAdjacentHTML("beforeend", li);
        }
    }
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
            });
            taskInput.value = "";
        } else {
            for (let task of taskList) {
                if (task.id == editId) {
                    task.taskTitle = taskInput.value;
                }
                isEditTask = false;
            }
        }

        displayTask();
    }
    event.preventDefault();
}

// Deletes task
function deleteTask(id) {
    let deleteId;

    deleteId = taskList.findIndex((task) => task.id == id);

    taskList.splice(deleteId, 1);
    displayTask();
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
    displayTask();
}
