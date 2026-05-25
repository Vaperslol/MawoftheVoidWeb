import {
    getNews,
    sortNewsByDate,
    formatNewsDate
} from "./news-api.js";

const newsContainer = document.getElementById("newsContainer");

const newsModal = document.getElementById("newsModal");
const closeNewsModal = document.getElementById("closeNewsModal");

const modalNewsImage = document.getElementById("modalNewsImage");
const modalNewsTitle = document.getElementById("modalNewsTitle");
const modalNewsDate = document.getElementById("modalNewsDate");
const modalNewsType = document.getElementById("modalNewsType");
const modalNewsText = document.getElementById("modalNewsText");

let newsItemsCache = [];

function getExcerpt(text) {
    if (text.length <= 150) {
        return text;
    }

    return text.slice(0, 150) + "...";
}

async function renderNews() {
    try {
        const newsItems = sortNewsByDate(await getNews());
        newsItemsCache = newsItems;

        newsContainer.innerHTML = "";

        if (newsItems.length === 0) {
            newsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted-custom">
                        Még nincs feltöltött hír.
                    </p>
                </div>
            `;
            return;
        }

        newsItems.forEach(function (newsItem) {
            const card = document.createElement("div");

            if (newsItems.length === 1) {
                card.className = "col-lg-4 col-md-7 col-sm-10 mx-auto";
            } else {
                card.className = "col-lg-4 col-md-6";
            }

            const imagePart = newsItem.image
                ? `<img src="${newsItem.image}" alt="${newsItem.title}" class="news-card-image">`
                : "";

            card.innerHTML = `
                <article class="news-card h-100">
                    ${imagePart}

                    <div class="news-card-content">
                        <p class="news-card-date">
                            ${formatNewsDate(newsItem.date)}
                        </p>

                        <p class="news-card-type">
                            ${newsItem.type}
                        </p>

                        <h3>
                            ${newsItem.title}
                        </h3>

                        <p class="text-muted-custom">
                            ${getExcerpt(newsItem.text)}
                        </p>

                        <button type="button" class="btn btn-custom news-open-button" data-open-news="${newsItem.id}">
                            Tovább olvasom
                        </button>
                    </div>
                </article>
            `;

            newsContainer.appendChild(card);
        });
    } catch (error) {
        newsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted-custom">
                    Nem sikerült betölteni a híreket. Ellenőrizd, hogy fut-e a backend.
                </p>
            </div>
        `;

        console.error(error);
    }
}

function openNewsModal(id) {
    const newsItem = newsItemsCache.find(function (item) {
        return Number(item.id) === Number(id);
    });

    if (!newsItem) {
        console.error("Nem található hír ezzel az ID-val:", id);
        return;
    }

    modalNewsTitle.textContent = newsItem.title;
    modalNewsDate.textContent = formatNewsDate(newsItem.date);
    modalNewsType.textContent = newsItem.type;
    modalNewsText.textContent = newsItem.text;

    if (newsItem.image) {
        modalNewsImage.src = newsItem.image;
        modalNewsImage.alt = newsItem.title;
        modalNewsImage.classList.remove("d-none");
    } else {
        modalNewsImage.src = "";
        modalNewsImage.classList.add("d-none");
    }

    newsModal.classList.remove("d-none");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    newsModal.classList.add("d-none");
    document.body.style.overflow = "";
}

newsContainer.addEventListener("click", function (event) {
    const button = event.target.closest("[data-open-news]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.openNews);
    openNewsModal(id);
});

closeNewsModal.addEventListener("click", closeModal);

newsModal.addEventListener("click", function (event) {
    if (event.target === newsModal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

renderNews();