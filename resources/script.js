let taskList = [
    { id: 1, taskTitle: "Task 1" },
    { id: 2, taskTitle: "Task 2" },
    { id: 3, taskTitle: "Task 3" },
    { id: 4, taskTitle: "Task 4" },
];

// to store tasks into local storage
if (localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

displayTask();

function displayTask() {
    ul = document.getElementById("task-list");

    //prevents adding extra tasks
    ul.innerHTML = "";

    // to add tasks dynamically
    for (let task of taskList) {
        let li = `
            <li class="list-group-item">
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
            </li>
        `;

        ul.insertAdjacentHTML("beforeend", li);
    }
}

document.querySelector("#addTask").addEventListener("click", newTask);

function newTask(event) {
    let taskInput = document.querySelector("#txtTaskName");

    if (taskInput.value == "") {
        alert("You have to type something!");
    } else {
        taskList.push({
            id: taskList.length + 1,
            taskTitle: taskInput.value,
        });
        taskInput.value = "";
        displayTask();
    }
    event.preventDefault();
}
