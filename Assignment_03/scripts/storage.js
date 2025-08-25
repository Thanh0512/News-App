'use strict'

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Key để lưu danh sách User
const KEY = "USER_ARRAY";

// Nếu LocalStorage chưa có thì userArr = []
let userArr = getFromStorage(KEY) || [];