// * Удаление заметок, * Поиск, * Редактирование заметки

const pencilBtn = document.querySelector("#pencilBtn");
const findBtn = document.querySelector("#findBtn");
const findInput = document.querySelector("#findInput");

const formAddTask = document.querySelector(".formAddTask");
const addTaskBtn = document.querySelector("#addTaskBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.querySelector("#taskList");
console.log(tasks);
const tabAll = document.querySelector("#tabAll");
const tabActive = document.querySelector("#tabActive");
const tabEnded = document.querySelector("#tabEnded");
const spanAll = document.querySelector("#spanAll");
const spanActive = document.querySelector("#spanActive");
const spanEnded = document.querySelector("#spanEnded");

//      Текущая дата
const currentDateMonthYear = document.querySelector("#currentDateMonthYear");
const currentWeekDay = document.querySelector("#currentWeekDay");
const now = new Date();
// console.log(now.getFullYear()); // год
// console.log(now.getMonth());    // месяц (0–11!)
// console.log(now.getDate());     // день месяца
const monthName = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июль", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

currentDateMonthYear.textContent = `${now.getDate()} ${monthName[now.getMonth()]} ${now.getFullYear()}`

const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
];
currentWeekDay.textContent = days[now.getDay()];



updateVisualTaskList(tasks);
// console.log(taskList);


// const task = {
//     id: random,
//     textTask: inp_textTask.value,
//     dateTimeTask: inp_dateTimeTask.value,
//     checked: false
// };


function delTask(idTask) {
    console.log("idTask = " + idTask);
    let ind = -1;
    console.log(tasks.length);
    for (let i = 0; i < tasks.length - 1; i++) {
        if (idTask == tasks[i].id) {
            console.log(tasks[i]);
            ind = i; break;
        }
    };
    console.log(ind);
    tasks.splice(ind, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateVisualTaskList(tasks);
}

function updateVisualTaskList(listOfTasks) {
    taskList.replaceChildren();
    for (let task of listOfTasks) {

        const el = document.createElement("li");
        el.setAttribute("class", "oneTask");
        el.dataset.id = task.id;
        const taskInfo = document.createElement("div");
        taskInfo.setAttribute("class", "taskInfo");
        const taskText = document.createElement("span");
        taskText.setAttribute("class", "taskName");
        taskText.textContent = task.textTask;
        const taskDate = document.createElement("span");
        taskDate.setAttribute("class", "taskDate");

        const date = new Date(task.dateTimeTask);

        const formatDate = date.toLocaleString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
        // taskDate.textContent = task.dateTimeTask;
        taskDate.textContent = formatDate;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;
        if (task.checked) { taskText.classList.add("checked") }
        else { taskText.classList.remove("checked") }
        checkbox.addEventListener("change", (event) => {
            // console.log("Checkbox изменился");
            // console.log(event.target.checked);
            task.checked = event.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            if (task.checked) { taskText.classList.add("checked") }
            else { taskText.classList.remove("checked") }
        });

        const delTaskBtn = document.createElement("button")
        delTaskBtn.setAttribute("class", "delTask");
        delTaskBtn.textContent = "x";
        delTaskBtn.addEventListener("click", (event) => {
            // const idForDel = event.target.id;
            // console.log(event.target.closest(".oneTask"));
            // console.log(event.target.closest(".oneTask").dataset.id);

            delTask(event.target.closest(".oneTask").dataset.id);
        })




        taskInfo.appendChild(taskDate);
        taskInfo.appendChild(taskText);
        el.appendChild(checkbox);
        el.appendChild(taskInfo);
        el.appendChild(delTaskBtn);
        // el.appendChild(checkbox);
        taskList.appendChild(el);
    }
}

//************  sort */
function sortTasks() {
    tasks.sort((a, b) => { return new Date(a.dateTimeTask) - new Date(b.dateTimeTask) });
}


//  **************************      Filter      *******************

function allTasksSettings() {
    tabAll.classList.add("filtred");
    tabActive.classList.remove("filtred");
    tabEnded.classList.remove("filtred");
    spanAll.textContent = "✓";
    spanActive.textContent = "";
    spanEnded.textContent = "";


}

tabAll.addEventListener("click", () => {
    allTasksSettings();
    updateVisualTaskList(tasks);
})

tabActive.addEventListener("click", () => {
    tabAll.classList.remove("filtred");
    tabActive.classList.add("filtred");
    tabEnded.classList.remove("filtred");
    spanAll.textContent = "";
    spanActive.textContent = "✓";
    spanEnded.textContent = "";

    const tasksActive = tasks.filter((task) => { return (!task.checked); })
    console.log(tasksActive);
    updateVisualTaskList(tasksActive);
})

tabEnded.addEventListener("click", () => {
    tabAll.classList.remove("filtred");
    tabActive.classList.remove("filtred");
    tabEnded.classList.add("filtred");
    spanAll.textContent = "";
    spanActive.textContent = "";
    spanEnded.textContent = "✓";
    const tasksEnded = tasks.filter((task) => { return (task.checked); })
    console.log(tasksEnded);
    updateVisualTaskList(tasksEnded);
})

// find
findBtn.addEventListener("click", () => {
    if (findInput.value !== "") {
        allTasksSettings();
        const findTasks = tasks.filter((task) => { return (task.textTask.toLowerCase().includes(findInput.value.toLowerCase())) })
        console.log(findTasks);
        updateVisualTaskList(findTasks);
    }
    else {
        allTasksSettings();
        updateVisualTaskList(tasks);
    }

})

// кнопка "Карандаш"
pencilBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    formAddTask.classList.remove("hidden");
    textStatusMessage.textContent = "";
});


// ****   close  formAddTask
formAddTask.addEventListener("reset", (event) => {
    formAddTask.classList.add("hidden");
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { formAddTask.classList.add("hidden"); }
});
document.addEventListener("click", () => {
    formAddTask.classList.add("hidden");
});


// ****     formAddTask
formAddTask.addEventListener("click", (event) => {
    event.stopPropagation();
});

formAddTask.addEventListener("submit", (event) => {
    event.stopPropagation();
    event.preventDefault();
    let inp_textTask = event.target.elements.textTask;
    let inp_dateTimeTask = event.target.elements.dateTimeTask;
    if ((inp_textTask.value) && (inp_dateTimeTask.value)) {
        textStatusMessage.textContent = "";
        const random = Math.floor(Math.random() * 100);
        console.log(inp_textTask);
        console.log(inp_dateTimeTask);
        const task = {
            id: random,
            textTask: inp_textTask.value,
            dateTimeTask: inp_dateTimeTask.value,
            checked: false
        };
        console.log(task);
        tasks.push(task);
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));


        // подумать куда лучше поставить сортировку
        sortTasks();

        inp_textTask.value = "";
        inp_dateTimeTask.value = "";
    } else {
        if (textStatusMessage.classList.contains("OKMassage")) {
            textStatusMessage.classList.replace("OKMassage", "errorMassage");
        }
        textStatusMessage.textContent = "Все поля должны быть заполнены!";
    }
    // console.log(textTask);
    // console.log(dateTimeTask);



});



// //  ************          edit task
// const oneTask = document.querySelector(".oneTask");

// oneTask.addEventListener("dblclick", (event) => {
//     formAddTask.classList.remove("hidden");
//     textStatusMessage.textContent = "";

//     // let inp_textTask.value = event.target.taskText.value;
//     // let inp_dateTimeTask.value = event.target.dateTimeTask.value;
//     console.log(event.target);
//     console.log(event.target.dateTimeTask);

// })

