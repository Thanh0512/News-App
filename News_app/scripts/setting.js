'use strict'
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");
let currentUser = getFromStorage("currentUser");
// Khi load trang, hiển thị lại giá trị đã lưu
if (currentUser) {
    if (currentUser.newsPerPage) {
        inputPageSize.value = currentUser.newsPerPage;
    }
    if (currentUser.category) {
        inputCategory.value = currentUser.category;
    }
}
// Xử lý khi bấm nút Save Settings
btnSubmit.addEventListener("click", function() {
    const pageSize = Number(inputPageSize.value);
    const category = inputCategory.value;

    // Validate dữ liệu
    if (!pageSize || pageSize <= 0) {
        alert("News per page phải lớn hơn 0!");
        return;
    }

    // Cập nhật vào currentUser
    currentUser.newsPerPage = pageSize;
    currentUser.category = category;
    // Lưu vào localStorage
    saveToStorage("currentUser", currentUser);

    alert("Lưu cài đặt thành công!");
});