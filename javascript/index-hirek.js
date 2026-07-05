import {
    getNews,
    sortNewsByDate,
    formatNewsDate
} from "./news-api.js";

const homeNewsContainer = document.getElementById("homeNewsContainer");

function getExcerpt(text = "") {
    if (text.length <= 120) {
        return text;
    }

    return text.slice(0, 120).trim() + "...";
}

function createEmptyState(message) {
    const column = document.createElement("div");
    column.className = "col-12 text-center";

    const paragraph = document.createElement("p");
    paragraph.className = "text-muted-custom";
    paragraph.textContent = message;

    column.appendChild(paragraph);
    return column;
}

function createNewsCard(newsItem, isSingleItem) {
    const column = document.createElement("div");
    column.className = isSingleItem ? "col-lg-5 col-md-8 mx-auto" : "col-md-6";

    const card = document.createElement("article");
    card.className = "p-4 rounded card-custom h-100";

    const date = document.createElement("p");
    date.className = "news-date mb-1";
    date.textContent = formatNewsDate(newsItem.date);

    const title = document.createElement("h4");
    title.textContent = newsItem.title;

    const excerpt = document.createElement("p");
    excerpt.className = "text-muted-custom mb-3";
    excerpt.textContent = getExcerpt(newsItem.text);

    const link = document.createElement("a");
    link.href = "hirek.html";
    link.className = "btn btn-custom btn-sm";
    link.textContent = "Tovább a hírekhez";

    card.append(date, title, excerpt, link);
    column.appendChild(card);

    return column;
}

async function renderHomeNews() {
    if (!homeNewsContainer) {
        return;
    }

    try {
        const newsItems = sortNewsByDate(await getNews()).slice(0, 2);
        const fragment = document.createDocumentFragment();

        if (newsItems.length === 0) {
            fragment.appendChild(createEmptyState("Még nincs feltöltött hír."));
        } else {
            newsItems.forEach(function (newsItem) {
                fragment.appendChild(createNewsCard(newsItem, newsItems.length === 1));
            });
        }

        homeNewsContainer.replaceChildren(fragment);
    } catch (error) {
        homeNewsContainer.replaceChildren(
            createEmptyState("Nem sikerült betölteni a híreket. Ellenőrizd, hogy fut-e a backend.")
        );

        console.error(error);
    }
}

renderHomeNews();
