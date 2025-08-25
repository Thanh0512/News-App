'use strict';
const API_KEY = "41b7e47852374b7882dbd5ab6dee3fe7";
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const pageNumEl = document.getElementById("page-num");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const navPageNum = document.getElementById("nav-page-num");
// Settings từ localStorage
const user = JSON.parse(localStorage.getItem("currentUser")) || {};
const pageSize = user.pageSize || 3;
let currentPage = 1;
let totalResults = 0;
let currentQuery = "";

// Hàm gọi API
async function getNews(query, page) {
    try {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`
        );
        const data = await res.json();

        if (data.status !== "ok") {
            throw new Error(data.message);
        }

        totalResults = data.totalResults;
        renderNews(data.articles);
        renderPagination();
    } catch (err) {
        newsContainer.innerHTML = `<p class="text-danger">❌ ${err.message}</p>`;
    }
}

// Hàm render tin tức
function renderNews(articles) {
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<p class="text-warning">⚠️ Không tìm thấy bài viết nào.</p>`;
        return;
    }

    let html = "";
    articles.forEach((article) => {
        html += `
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${article.urlToImage || "../img/no-image.jpg"}" class="card-img" alt="news">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description || ""}</p>
              <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </div>
    `;
    });

    newsContainer.innerHTML = html;
}

// Hàm render phân trang
function renderPagination() {
    pageNumEl.textContent = currentPage;

    const maxPage = Math.ceil(totalResults / pageSize);

    // Ẩn/hiện pagination
    navPageNum.classList.remove("hide");

    // Disable Prev nếu ở trang đầu
    btnPrev.parentElement.classList.toggle("disabled", currentPage === 1);

    // Disable Next nếu ở trang cuối
    btnNext.parentElement.classList.toggle(
        "disabled",
        currentPage === maxPage
    );
}

// Sự kiện click nút Search
btnSubmit.addEventListener("click", function() {
    const query = inputQuery.value.trim();
    if (!query) {
        alert("⚠️ Vui lòng nhập từ khóa để tìm kiếm!");
        return;
    }
    currentQuery = query;
    currentPage = 1;
    getNews(currentQuery, currentPage);
});

// Nút Previous
btnPrev.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        getNews(currentQuery, currentPage);
    }
});

// Nút Next
btnNext.addEventListener("click", function() {
    const maxPage = Math.ceil(totalResults / pageSize);
    if (currentPage < maxPage) {
        currentPage++;
        getNews(currentQuery, currentPage);
    }
});