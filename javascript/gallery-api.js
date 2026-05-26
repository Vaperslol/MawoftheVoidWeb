import { API_BASE_URL } from "./api-config.js";

export async function getGalleryAlbums() {
    const response = await fetch(`${API_BASE_URL}/api/gallery`);

    if (!response.ok) {
        throw new Error("Nem sikerült lekérni a galéria albumokat.");
    }

    return await response.json();
}

export async function uploadGalleryImages(files) {
    if (!files || files.length === 0) {
        return [];
    }

    const formData = new FormData();

    Array.from(files).forEach(function (file) {
        formData.append("images", file);
    });

    const response = await fetch(`${API_BASE_URL}/api/uploads`, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json().catch(function () {
            return {};
        });

        throw new Error(errorData.error || errorData.message || "Nem sikerült feltölteni a képeket.");
    }

    const data = await response.json();

    return data.images || [];
}

export async function addGalleryAlbum(albumItem) {
    const response = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(albumItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült hozzáadni a galéria albumot.");
    }

    return await response.json();
}

export async function updateGalleryAlbum(id, albumItem) {
    const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(albumItem)
    });

    if (!response.ok) {
        throw new Error("Nem sikerült frissíteni a galéria albumot.");
    }

    return await response.json();
}

export async function deleteGalleryAlbum(id) {
    const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Nem sikerült törölni a galéria albumot.");
    }

    return await response.json();
}

export function sortGalleryAlbumsByDate(albums) {
    return albums.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
}

export function formatGalleryDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}