'use strict'
const currentUser = getFromStorage("currentUser");
if (!currentUser) {
    alert("Vui lòng đăng nhập để sử dụng Todo List!");
    window.location.href = "../index.html";
}
class Task {
    constructor(task, owner, isDone = false) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}
let todoArr = getFromStorage("todoArr") || [];

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoListEl = document.getElementById("todo-list");
// Hàm hiển thị todo list
function renderTodoList() {
    // Xóa nội dung cũ
    todoListEl.innerHTML = "";

    // Lọc task của user hiện tại
    const todos = todoArr.filter((t) => t.owner === currentUser.username);

    // Render từng task
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.task;

        // Nếu task đã hoàn thành → thêm class "checked"
        if (todo.isDone) li.classList.add("checked");

        // Khi click vào li → toggle hoàn thành
        li.addEventListener("click", () => {
            todo.isDone = !todo.isDone;
            saveToStorage("todoArr", todoArr);
            renderTodoList();
        });

        // Nút xóa task
        const span = document.createElement("span");
        span.textContent = "×";
        span.classList.add("close");
        span.addEventListener("click", (e) => {
            e.stopPropagation(); // tránh việc toggle khi xóa
            todoArr.splice(todoArr.indexOf(todo), 1);
            saveToStorage("todoArr", todoArr);
            renderTodoList();
        });

        li.appendChild(span);
        todoListEl.appendChild(li);
    });
}

// Thêm task mới
btnAdd.addEventListener("click", () => {
    const taskText = inputTask.value.trim();

    if (!taskText) {
        alert("Vui lòng nhập nội dung công việc!");
        return;
    }

    // Tạo task mới
    const newTask = new Task(taskText, currentUser.username, false);

    // Đẩy vào mảng và lưu
    todoArr.push(newTask);
    saveToStorage("todoArr", todoArr);

    // Reset input và render lại
    inputTask.value = "";
    renderTodoList();
});

// Lần đầu load trang → hiển thị danh sách
renderTodoList();