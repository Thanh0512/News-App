'use strict'
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", function() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validate: không được để trống
    if (!username || !password) {
        alert("❌ Vui lòng nhập đầy đủ Username và Password!");
        return;
    }

    // Tìm user trong userArr
    const foundUser = userArr.find(
        (user) => user.username === username && user.password === password
    );

    if (!foundUser) {
        alert("❌ Username hoặc Password không đúng!");
        return;
    }

    // Lưu currentUser vào localStorage
    saveToStorage("currentUser", foundUser);

    alert(`✅ Xin chào ${foundUser.firstName} ${foundUser.lastName}!`);

    // Chuyển hướng về trang Home
    window.location.href = "../index.html";
});