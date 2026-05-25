const defaultGalleryAlbums = [
    {
        id: crypto.randomUUID(),
        title: "Első próbák",
        date: "2026-05-01",
        description: "Az első próbák hangulata, amikor elkezdett összeállni a banda.",
        images: [
            {
                src: "https://picsum.photos/1000/700?random=801",
                name: "Próba kép 1"
            },
            {
                src: "https://picsum.photos/1000/700?random=802",
                name: "Próba kép 2"
            },
            {
                src: "https://picsum.photos/1000/700?random=803",
                name: "Próba kép 3"
            }
        ]
    },
    {
        id: crypto.randomUUID(),
        title: "UMSZKI évnyitó koncert",
        date: "2026-09-01",
        description: "Képek az UMSZKI évnyitó koncertről.",
        images: [
            {
                src: "https://picsum.photos/1000/700?random=804",
                name: "Évnyitó kép 1"
            },
            {
                src: "https://picsum.photos/1000/700?random=805",
                name: "Évnyitó kép 2"
            }
        ]
    }
];

export function getGalleryAlbums() {
    const savedAlbums = localStorage.getItem("galleryAlbums");

    if (!savedAlbums) {
        localStorage.setItem("galleryAlbums", JSON.stringify(defaultGalleryAlbums));
        return defaultGalleryAlbums;
    }

    return JSON.parse(savedAlbums);
}

export function saveGalleryAlbums(albums) {
    localStorage.setItem("galleryAlbums", JSON.stringify(albums));
}

export function resetGalleryAlbums() {
    localStorage.setItem("galleryAlbums", JSON.stringify(defaultGalleryAlbums));
    return defaultGalleryAlbums;
}

export function sortAlbumsByDate(albums) {
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