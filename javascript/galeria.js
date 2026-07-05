import {
    getGalleryAlbums,
    sortGalleryAlbumsByDate,
    formatGalleryDate
} from "./gallery-api.js";

const galleryAlbumContainer = document.getElementById("galleryAlbumContainer");

const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");

const closeGalleryModal = document.getElementById("closeGalleryModal");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let galleryAlbumsCache = [];
let currentImages = [];
let currentImageIndex = 0;

function getCoverImage(album) {
    if (!album.images || album.images.length === 0) {
        return "";
    }

    return album.images[0];
}

function openGalleryModal(images, startIndex) {
    if (!images || images.length === 0) {
        return;
    }

    currentImages = images;
    currentImageIndex = startIndex;

    updateModalImage();

    galleryModal.classList.remove("d-none");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    galleryModal.classList.add("d-none");
    document.body.style.overflow = "";
}

function updateModalImage() {
    galleryModalImage.src = currentImages[currentImageIndex];
    galleryModalImage.alt = `Galéria kép ${currentImageIndex + 1}`;
}

function showPreviousImage() {
    if (currentImages.length === 0) {
        return;
    }

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    }

    updateModalImage();
}

function showNextImage() {
    if (currentImages.length === 0) {
        return;
    }

    currentImageIndex++;

    if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }

    updateModalImage();
}

async function renderGalleryAlbums() {
    try {
        const albums = sortGalleryAlbumsByDate(await getGalleryAlbums());
        galleryAlbumsCache = albums;

        galleryAlbumContainer.innerHTML = "";

        if (albums.length === 0) {
            galleryAlbumContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted-custom">
                        Még nincs feltöltött galéria-album.
                    </p>
                </div>
            `;
            return;
        }

        albums.forEach(function (album) {
            const card = document.createElement("div");
            card.className = "col-lg-4 col-md-6";

            const coverImage = getCoverImage(album);

            card.innerHTML = `
                <article class="gallery-card h-100">
                    ${
                        coverImage
                            ? `
                                <button class="gallery-cover-button" data-open-album="${album.id}">
                                    <img src="${coverImage}" alt="${album.title}" class="gallery-cover-image">
                                </button>
                            `
                            : `
                                <div class="gallery-empty-cover">
                                    Nincs kép
                                </div>
                            `
                    }

                    <div class="gallery-card-content">
                        <p class="gallery-date">
                            ${formatGalleryDate(album.date)}
                        </p>

                        <h3>
                            ${album.title}
                        </h3>

                        <p class="text-muted-custom">
                            ${album.description}
                        </p>

                        <p class="gallery-count">
                            ${album.images ? album.images.length : 0} kép
                        </p>

                        ${
                            album.images && album.images.length > 0
                                ? `
                                    <button class="btn btn-custom btn-sm" data-open-album="${album.id}">
                                        Album megnyitása
                                    </button>
                                `
                                : ""
                        }
                    </div>
                </article>
            `;

            galleryAlbumContainer.appendChild(card);
        });
    } catch (error) {
        galleryAlbumContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted-custom">
                    Nem sikerült betölteni a galériát. Ellenőrizd, hogy fut-e a backend.
                </p>
            </div>
        `;

        console.error(error);
    }
}

galleryAlbumContainer.addEventListener("click", function (event) {
    const openButton = event.target.closest("[data-open-album]");

    if (!openButton) {
        return;
    }

    const id = Number(openButton.dataset.openAlbum);

    const album = galleryAlbumsCache.find(function (item) {
        return Number(item.id) === id;
    });

    if (!album || !album.images || album.images.length === 0) {
        return;
    }

    openGalleryModal(album.images, 0);
});

if (closeGalleryModal) {
    closeGalleryModal.addEventListener("click", closeModal);
}

if (prevImage) {
    prevImage.addEventListener("click", showPreviousImage);
}

if (nextImage) {
    nextImage.addEventListener("click", showNextImage);
}

if (galleryModal) {
    galleryModal.addEventListener("click", function (event) {
        if (event.target === galleryModal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }

    if (!galleryModal.classList.contains("d-none")) {
        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }
    }
});

renderGalleryAlbums();