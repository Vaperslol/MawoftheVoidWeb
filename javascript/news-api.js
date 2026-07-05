import { API_BASE_URL } from "./api-config.js";

export async function getNews() {
    const response = await fetch(`${API_BASE_URL}/api/news`);

    if (!response.ok) {
        throw new Error("Nem sikerült lekérni a híreket.");
    }

    return await response.json();
}

export async function addNews(newsItem) {
    const response = await fetch(`${API_BASE_URL}/api/news`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newsItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült hozzáadni a hírt.");
    }

    return await response.json();
}

export async function updateNews(id, newsItem) {
    const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newsItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült frissíteni a hírt.");
    }

    return await response.json();
}

export async function deleteNews(id) {
    const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült törölni a hírt.");
    }

    return await response.json();
}

export function sortNewsByDate(newsItems) {
    return [...newsItems].sort(function (a, b) {
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