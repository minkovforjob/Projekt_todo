// * Удаление заметок, * Поиск, * Редактирование заметки
const pencilBtn = document.querySelector("#pencilBtn");
const formAddTask = document.querySelector(".formAddTask");
const addTaskBtn = document.querySelector("#addTaskBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.querySelector("#taskList");
const tabAll = document.querySelector("#tabAll");
const tabActive = document.querySelector("#tabActive");
const tabEnded = document.querySelector("#tabEnded");
const spanAll = document.querySelector("#spanAll");
const spanActive = document.querySelector("#spanActive");
const spanEnded = document.querySelector("#spanEnded");

// console.log(taskList);


// const task = {
//     id: random,
//     textTask: inp_textTask.value,
//     dateTimeTask: inp_dateTimeTask.value,
//     checked: false
// };

// document.addEventListener("click", (event) => {
//     if (!formAddTask.contains(event.target)) {
//         console.log("formAddTask");
//         formAddTask.classList.add("hidden");
//     }
//     // if (pencilBtn.contains(event.target)) {
//     //     console.log("pencilBtn");
//     //     // formAddTask.classList.remove("hidden");
//     // }

//     // console.log(event);
// });

function updateVisualTaskList() {

    for (let task of tasks) {

        const el = document.createElement("li");
        el.setAttribute("class", "oneTask");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.checked;
        checkbox.addEventListener("change", (event) => {
            // console.log("Checkbox изменился");
            // console.log(event.target.checked);
            task.checked = event.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });
        const taskInfo = document.createElement("div");
        taskInfo.setAttribute("class", "taskInfo");
        const taskText = document.createElement("span");
        taskText.setAttribute("class", "taskName");
        taskText.textContent = task.textTask;
        const taskDate = document.createElement("span");
        taskDate.setAttribute("class", "taskDate");
        taskDate.textContent = task.dateTimeTask;
        taskInfo.appendChild(taskDate);
        taskInfo.appendChild(taskText);
        el.appendChild(checkbox);
        el.appendChild(taskInfo);
        // el.appendChild(checkbox);
        taskList.appendChild(el);
    }
}

updateVisualTaskList();


//  **************************      Filter      *******************
tabAll.addEventListener("click", () => {
    tabAll.classList.add("filtred");
    tabActive.classList.remove("filtred");
    tabEnded.classList.remove("filtred");
    spanAll.textContent = "✓";
    spanActive.textContent = "";
    spanEnded.textContent = "";
})

tabActive.addEventListener("click", () => {
    tabAll.classList.remove("filtred");
    tabActive.classList.add("filtred");
    tabEnded.classList.remove("filtred");
    spanAll.textContent = "";
    spanActive.textContent = "✓";
    spanEnded.textContent = "";
})

tabEnded.addEventListener("click", () => {
    tabAll.classList.remove("filtred");
    tabActive.classList.remove("filtred");
    tabEnded.classList.add("filtred");
    spanAll.textContent = "";
    spanActive.textContent = "";
    spanEnded.textContent = "✓";
})



// кнопка "Карандаш"
pencilBtn.addEventListener("click", () => {

    formAddTask.classList.remove("hidden");

});

formAddTask.addEventListener("reset", (event) => {
    formAddTask.classList.add("hidden");
});

formAddTask.addEventListener("submit", (event) => {


    event.preventDefault();
    let inp_textTask = event.target.elements.textTask;
    let inp_dateTimeTask = event.target.elements.dateTimeTask;
    if ((inp_textTask.value) && (inp_dateTimeTask.value)) {
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











        inp_textTask.value = "";
        inp_dateTimeTask.value = "";
    } else {
        // if (textStatusMessage.classList.contains("OKMassage")) {
        //     textStatusMessage.classList.replace("OKMassage", "errorMassage");
        // }
        // textStatusMessage.textContent = "Все поля должны быть заполнены!";
    }
    // console.log(textTask);
    // console.log(dateTimeTask);



});


// cancelBtn.addEventListener("click", () => { formAddTask.setAttribute("style", "display: none;"); })

// addTaskBtn.addEventListener("click", () => {
//     console.log("textTask");
//     console.log("dateTimeTask");
// })