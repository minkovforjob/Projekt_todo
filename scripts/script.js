// * Удаление заметок, * Поиск, * Редактирование заметки
const pencilBtn = document.querySelector("#pencilBtn");
const formAddTask = document.querySelector(".formAddTask");
const addTaskBtn = document.querySelector("#addTaskBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const textTask = document.querySelector("textTask");
const dateTimeTask = document.querySelector("dateTimeTask");



// кнопка "Карандаш"
pencilBtn.addEventListener("click", () => {

    formAddTask.setAttribute("style", "display: flex;");

})

cancelBtn.addEventListener("click", () => { formAddTask.setAttribute("style", "display: none;"); })

addTaskBtn.addEventListener("click", () => {
    console.log("textTask");
    console.log("dateTimeTask");
})