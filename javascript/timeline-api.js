import { API_BASE_URL } from "./api-config.js";

export async function getTimelineEvents() {
    const response = await fetch(`${API_BASE_URL}/api/timeline`);

    if (!response.ok) {
        throw new Error("Nem sikerült lekérni a timeline eseményeket.");
    }

    return await response.json();
}

export async function addTimelineEvent(eventItem) {
    const response = await fetch(`${API_BASE_URL}/api/timeline`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült hozzáadni a timeline eseményt.");
    }

    return await response.json();
}

export async function updateTimelineEvent(id, eventItem) {
    const response = await fetch(`${API_BASE_URL}/api/timeline/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült frissíteni a timeline eseményt.");
    }

    return await response.json();
}

export async function deleteTimelineEvent(id) {
    const response = await fetch(`${API_BASE_URL}/api/timeline/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült törölni a timeline eseményt.");
    }

    return await response.json();
}

export function sortTimelineByDate(events) {
    return events.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}

export function formatTimelineDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}