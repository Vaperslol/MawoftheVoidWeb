import { API_BASE_URL } from "./api-config.js";

export async function sendMessage(messageItem) {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült elküldeni az üzenetet.");
    }

    return await response.json();
}

export async function getMessages() {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült lekérni az üzeneteket.");
    }

    return await response.json();
}

export async function markMessageAsOpened(id) {
    const response = await fetch(`${API_BASE_URL}/api/messages/${id}/opened`, {
        method: "PUT",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült megnyitottnak jelölni az üzenetet.");
    }

    return await response.json();
}

export async function deleteMessage(id) {
    const response = await fetch(`${API_BASE_URL}/api/messages/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült törölni az üzenetet.");
    }

    return await response.json();
}

export async function deleteAllMessages() {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült törölni az összes üzenetet.");
    }

    return await response.json();
}

export function sortMessagesByDate(messages) {
    return messages.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

export function formatMessageDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}