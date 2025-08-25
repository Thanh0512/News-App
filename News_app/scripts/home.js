'use strict';
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Ẩn/hiện giao diện khi load trang
function displayHome() {
    const currentUser = getFromStorage("currentUser");

    if (currentUser) {
        // Đã đăng nhập
        loginModal.style.display = "none";
        mainContent.style.display = "block";

        // Hiển thị thông điệp chào mừng
        welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
    } else {
        // Chưa đăng nhập
        loginModal.style.display = "block";
        mainContent.style.display = "none";
    }
}

// Xử lý logout
btnLogout.addEventListener("click", function() {
    // Xóa thông tin người dùng hiện tại
    localStorage.removeItem("currentUser");

    // Chuyển hướng về trang login
    window.location.href = "./pages/login.html";
});

// Gọi khi load trang
displayHome();