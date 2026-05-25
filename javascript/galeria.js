import {
    getGalleryAlbums,
    sortAlbumsByDate,
    formatGalleryDate
} from "./gallery-storage.js";

const albumContainer = document.getElementById("galleryAlbumContainer");

const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("galleryModalImage");
const modalAlbumTitle = document.getElementById("galleryAlbumTitle");
const imageCounter = document.getElementById("galleryImageCounter");

const closeButton = document.getElementById("closeGalleryModal");
const prevButton = document.getElementById("prevImage");
const nextButton = document.getElementById("nextImage");

let currentAlbum = null;
let currentImageIndex = 0;

function renderAlbums() {
    const albums = sortAlbumsByDate(getGalleryAlbums());

    albumContainer.innerHTML = "";

    if (albums.length === 0) {
        albumContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted-custom">
                    Még nincs feltöltött galéria.
                </p>
            </div>
        `;
        return;
    }

    albums.forEach(function (album, index) {
        const coverImage = album.images.length > 0
            ? album.images[0].src
            : "https://picsum.photos/1000/700?random=999";

        const card = document.createElement("div");
        card.className = "col-xl-4 col-md-6";

        card.innerHTML = `
            <article class="album-card" data-album-index="${index}">
                <div class="album-cover">
                    <img src="${coverImage}" alt="${album.title}">
                    <div class="album-folder-icon">▣</div>
                </div>

                <div class="album-content">
                    <p class="album-date">${formatGalleryDate(album.date)}</p>

                    <h3>${album.title}</h3>

                    <p class="text-muted-custom">
                        ${album.description}
                    </p>

                    <p class="album-count">
                        ${album.images.length} kép
                    </p>
                </div>
            </article>
        `;

        albumContainer.appendChild(card);
    });

    const albumCards = document.querySelectorAll(".album-card");

    albumCards.forEach(function (card) {
        card.addEventListener("click", function () {
            const index = Number(card.dataset.albumIndex);
            openAlbum(index);
        });
    });
}

function openAlbum(albumIndex) {
    const albums = sortAlbumsByDate(getGalleryAlbums());
    currentAlbum = albums[albumIndex];
    currentImageIndex = 0;

    if (!currentAlbum || currentAlbum.images.length === 0) {
        return;
    }

    modal.classList.remove("d-none");
    showImage();
}

function showImage() {
    const image = currentAlbum.images[currentImageIndex];

    modalImage.src = image.src;
    modalImage.alt = image.name || currentAlbum.title;
    modalAlbumTitle.textContent = currentAlbum.title;

    imageCounter.textContent =
        currentImageIndex + 1 + " / " + currentAlbum.images.length;
}

function nextImage() {
    if (!currentAlbum) return;

    currentImageIndex++;

    if (currentImageIndex >= currentAlbum.images.length) {
        currentImageIndex = 0;
    }

    showImage();
}

function prevImage() {
    if (!currentAlbum) return;

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = currentAlbum.images.length - 1;
    }

    showImage();
}

function closeModal() {
    modal.classList.add("d-none");
    currentAlbum = null;
    currentImageIndex = 0;
}

nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", prevImage);
closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

renderAlbums();