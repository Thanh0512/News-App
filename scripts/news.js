const currentUser = getFromStorage("currentUser");
if (!currentUser) {
    alert("⚠️ Vui lòng đăng nhập để xem tin tức!");
    window.location.href = "../index.html";
}

// DOM
const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumEl = document.getElementById("page-num");

// Config
let currentPage = 1;
const apiKey = "41b7e47852374b7882dbd5ab6dee3fe7";
let totalResults = 0;

// Lấy config từ user
const pageSize = currentUser.newsPerPage ? Number(currentUser.newsPerPage) : 5;
const category = currentUser.category ? currentUser.category.toLowerCase() : "general";

// Fetch API
async function fetchNews(page) {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Lỗi khi gọi API News!");

        const data = await res.json();
        if (!data.articles || data.articles.length === 0) {
            throw new Error("Không có bài báo nào!");
        }

        totalResults = data.totalResults; // lưu lại tổng kết quả

        renderNews(data.articles);
        updatePagination();
    } catch (err) {
        alert("❌ " + err.message);
    }
}

// Render news
function renderNews(articles) {
    newsContainer.innerHTML = "";
    articles.forEach(article => {
        const html = `
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${article.urlToImage || "../img/no-image.png"}" 
                     class="card-img" 
                     alt="${article.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.description || ""}</p>
                  <a href="${article.url}" target="_blank" class="btn btn-primary">View</a>
                </div>
              </div>
            </div>
          </div>
        `;
        newsContainer.insertAdjacentHTML("beforeend", html);
    });
}

// Update nút phân trang
function updatePagination() {
    pageNumEl.textContent = currentPage;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage >= Math.ceil(totalResults / pageSize);
}

// Events
btnPrev.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        fetchNews(currentPage);
    }
});

btnNext.addEventListener("click", function() {
    if (currentPage * pageSize < totalResults) {
        currentPage++;
        fetchNews(currentPage);
    }
});

// Init
fetchNews(currentPage);