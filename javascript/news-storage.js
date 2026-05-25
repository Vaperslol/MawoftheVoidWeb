const defaultNews = [
    {
        id: crypto.randomUUID(),
        title: "Elindult a Maw of the Void",
        date: "2026-05-01",
        type: "Bejelentés",
        text: "Megszületett a Maw of the Void. Még az elején járunk, de már most elkezdődött a próbák, ötletek és dalok építése.",
        image: "https://picsum.photos/1000/700?random=930"
    },
    {
        id: crypto.randomUUID(),
        title: "Készülünk az első koncertekre",
        date: "2026-06-10",
        type: "Koncert",
        text: "A banda elkezdett készülni az első fellépésekre. A cél, hogy minél erősebb élő hangzással álljunk színpadra.",
        image: "https://picsum.photos/1000/700?random=931"
    }
];

export function getNews() {
    const savedNews = localStorage.getItem("newsItems");

    if (!savedNews) {
        localStorage.setItem("newsItems", JSON.stringify(defaultNews));
        return defaultNews;
    }

    return JSON.parse(savedNews);
}

export function saveNews(newsItems) {
    localStorage.setItem("newsItems", JSON.stringify(newsItems));
}

export function resetNews() {
    localStorage.setItem("newsItems", JSON.stringify(defaultNews));
    return defaultNews;
}

export function sortNewsByDate(newsItems) {
    return newsItems.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
}

export function formatNewsDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}