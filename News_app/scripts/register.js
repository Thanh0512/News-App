'use strict'
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
// Xử lý sự kiện khi nhấn nút
btnSubmit.addEventListener("click", function() {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value;
    // Validate
    if (!firstName || !lastName || !username || !password || !passwordConfirm) {
        alert("❌ Không được bỏ trống trường nào!");
        return;
    }

    if (userArr.some((user) => user.username === username)) {
        alert("❌ Username đã tồn tại, vui lòng chọn username khác!");
        return;
    }

    if (password.length <= 8) {
        alert("❌ Password phải nhiều hơn 8 ký tự!");
        return;
    }

    if (password !== passwordConfirm) {
        alert("❌ Password và Confirm Password không trùng khớp!");
        return;
    }
    const newUser = new User(firstName, lastName, username, password);
    userArr.push(newUser);
    saveToStorage(KEY, userArr);

    alert("✅ Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
    window.location.href = "./login.html";
})