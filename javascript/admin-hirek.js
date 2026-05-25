import {
    getNews,
    addNews,
    updateNews,
    deleteNews,
    sortNewsByDate,
    formatNewsDate
} from "./news-api.js";

const newsForm = document.getElementById("newsForm");
const adminNewsList = document.getElementById("adminNewsList");
const resetNewsButton = document.getElementById("resetNewsButton");

const newsTitle = document.getElementById("newsTitle");
const newsDate = document.getElementById("newsDate");
const newsType = document.getElementById("newsType");
const newsText = document.getElementById("newsText");
const newsImage = document.getElementById("newsImage");

const newsEditIndex = document.getElementById("newsEditIndex");
const saveNewsButton = document.getElementById("saveNewsButton");
const cancelNewsEditButton = document.getElementById("cancelNewsEditButton");

let currentEditImage = "";

const defaultNews = [
    {
        title: "Elindult a Maw of the Void",
        date: "2026-05-01",
        type: "Bejelentés",
        text: "Elindult a Maw of the Void hivatalos weboldala. Itt jelennek majd meg a legfontosabb hírek, koncertinfók, képek és zenekari frissítések.",
        image: "https://picsum.photos/1000/700?random=930"
    },
    {
        title: "Készülünk az első koncertekre",
        date: "2026-06-10",
        type: "Koncert",
        text: "A banda folyamatosan próbál, új ötleteken dolgozik, és készül az első élő fellépésekre. A koncertekkel kapcsolatos frissítések itt lesznek elérhetők.",
        image: "https://picsum.photos/1000/700?random=931"
    }
];

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            reject("Nem sikerült beolvasni a képet.");
        };

        reader.readAsDataURL(file);
    });
}

function resetNewsFormMode() {
    newsForm.reset();

    newsEditIndex.value = "";
    currentEditImage = "";

    saveNewsButton.textContent = "Hír hozzáadása";
    cancelNewsEditButton.classList.add("d-none");
}

function fillNewsForm(newsItem) {
    newsTitle.value = newsItem.title;
    newsDate.value = newsItem.date;
    newsType.value = newsItem.type;
    newsText.value = newsItem.text;

    newsEditIndex.value = newsItem.id;
    currentEditImage = newsItem.image || "";

    saveNewsButton.textContent = "Hír mentése";
    cancelNewsEditButton.classList.remove("d-none");

    newsForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

async function renderAdminNews() {
    try {
        const newsItems = sortNewsByDate(await getNews());

        if (newsItems.length === 0) {
            adminNewsList.innerHTML = `
                <p class="text-muted-custom">
                    Még nincs feltöltött hír.
                </p>
            `;
            return;
        }

        adminNewsList.innerHTML = "";

        newsItems.forEach(function (newsItem) {
            const item = document.createElement("div");
            item.className = "admin-concert-item";

            item.innerHTML = `
                <h4>${newsItem.title}</h4>

                <p><strong>Dátum:</strong> ${formatNewsDate(newsItem.date)}</p>
                <p><strong>Típus:</strong> ${newsItem.type}</p>
                <p><strong>Szöveg:</strong> ${newsItem.text.slice(0, 120)}...</p>

                <div class="d-flex flex-wrap gap-2 mt-3">
                    <button class="btn btn-custom btn-sm" data-edit-news="${newsItem.id}">
                        Szerkesztés
                    </button>

                    <button class="btn btn-custom btn-sm" data-delete-news="${newsItem.id}">
                        Törlés
                    </button>
                </div>
            `;

            adminNewsList.appendChild(item);
        });

        const editButtons = document.querySelectorAll("[data-edit-news]");
        const deleteButtons = document.querySelectorAll("[data-delete-news]");

        editButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const id = Number(button.dataset.editNews);
                editNewsItem(id);
            });
        });

        deleteButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const id = Number(button.dataset.deleteNews);
                removeNewsItem(id);
            });
        });
    } catch (error) {
        adminNewsList.innerHTML = `
            <p class="text-muted-custom">
                Nem sikerült betölteni a híreket. Ellenőrizd, hogy fut-e a backend.
            </p>
        `;

        console.error(error);
    }
}

async function editNewsItem(id) {
    const newsItems = await getNews();

    const newsItem = newsItems.find(function (item) {
        return Number(item.id) === Number(id);
    });

    if (!newsItem) {
        alert("A hír nem található.");
        return;
    }

    fillNewsForm(newsItem);
}

async function removeNewsItem(id) {
    const sure = confirm("Biztosan törlöd ezt a hírt?");

    if (!sure) {
        return;
    }

    try {
        await deleteNews(id);
        resetNewsFormMode();
        await renderAdminNews();
    } catch (error) {
        alert("Nem sikerült törölni a hírt.");
        console.error(error);
    }
}

newsForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const editId = newsEditIndex.value;

    let imageValue = currentEditImage;

    if (newsImage.files.length > 0) {
        imageValue = await fileToBase64(newsImage.files[0]);
    }

    const newsItem = {
        title: newsTitle.value.trim(),
        date: newsDate.value,
        type: newsType.value,
        text: newsText.value.trim(),
        image: imageValue
    };

    try {
        if (editId === "") {
            await addNews(newsItem);
        } else {
            await updateNews(editId, newsItem);
        }

        resetNewsFormMode();
        await renderAdminNews();
    } catch (error) {
        alert("Nem sikerült menteni a hírt. Ellenőrizd, hogy fut-e a backend.");
        console.error(error);
    }
});

cancelNewsEditButton.addEventListener("click", function () {
    resetNewsFormMode();
});

if (resetNewsButton) {
    resetNewsButton.addEventListener("click", async function () {
        const sure = confirm("Biztosan visszaállítod az alap híreket? Ez törli a mostani híreket.");

        if (!sure) {
            return;
        }

        try {
            const newsItems = await getNews();

            for (const newsItem of newsItems) {
                await deleteNews(newsItem.id);
            }

            for (const defaultItem of defaultNews) {
                await addNews(defaultItem);
            }

            resetNewsFormMode();
            await renderAdminNews();
        } catch (error) {
            alert("Nem sikerült visszaállítani az alap híreket.");
            console.error(error);
        }
    });
}

renderAdminNews();