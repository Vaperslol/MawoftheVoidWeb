import { API_BASE_URL } from "./api-config.js";

export async function getConcerts() {
    const response = await fetch(`${API_BASE_URL}/api/concerts`);

    if (!response.ok) {
        throw new Error("Nem sikerült lekérni a koncerteket.");
    }

    return await response.json();
}

export async function addConcert(concertItem) {
    const response = await fetch(`${API_BASE_URL}/api/concerts`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(concertItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült hozzáadni a koncertet.");
    }

    return await response.json();
}

export async function updateConcert(id, concertItem) {
    const response = await fetch(`${API_BASE_URL}/api/concerts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(concertItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült frissíteni a koncertet.");
    }

    return await response.json();
}

export async function deleteConcert(id) {
    const response = await fetch(`${API_BASE_URL}/api/concerts/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült törölni a koncertet.");
    }

    return await response.json();
}

export function sortConcertsByDate(concerts) {
    return concerts.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}

export function formatConcertDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}