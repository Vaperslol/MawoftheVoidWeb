import {
    getNews,
    sortNewsByDate,
    formatNewsDate
} from "./news-api.js";

const homeNewsContainer = document.getElementById("homeNewsContainer");

function getExcerpt(text) {
    if (text.length <= 120) {
        return text;
    }

    return text.slice(0, 120) + "...";
}

async function renderHomeNews() {
    try {
        const newsItems = sortNewsByDate(await getNews()).slice(0, 2);

        homeNewsContainer.innerHTML = "";

        if (newsItems.length === 0) {
            homeNewsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted-custom">
                        Még nincs feltöltött hír.
                    </p>
                </div>
            `;
            return;
        }

        newsItems.forEach(function (newsItem) {
            const newsCard = document.createElement("div");
            if (newsItems.length === 1) {
                newsCard.className = "col-lg-5 col-md-8 mx-auto";
            } else {
                newsCard.className = "col-md-6";
            }

            newsCard.innerHTML = `
                <div class="p-4 rounded card-custom h-100">
                    <p class="news-date mb-1">
                        ${formatNewsDate(newsItem.date)}
                    </p>

                    <h4>
                        ${newsItem.title}
                    </h4>

                    <p class="text-muted-custom mb-3">
                        ${getExcerpt(newsItem.text)}
                    </p>

                    <a href="hirek.html" class="btn btn-custom btn-sm">
                        Tovább a hírekhez
                    </a>
                </div>
            `;

            homeNewsContainer.appendChild(newsCard);
        });
    } catch (error) {
        homeNewsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted-custom">
                    Nem sikerült betölteni a híreket. Ellenőrizd, hogy fut-e a backend.
                </p>
            </div>
        `;

        console.error(error);
    }
}

renderHomeNews();