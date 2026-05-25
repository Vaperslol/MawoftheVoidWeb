import {
    getGalleryAlbums,
    saveGalleryAlbums,
    resetGalleryAlbums,
    sortAlbumsByDate,
    formatGalleryDate
} from "./gallery-storage.js";

const galleryForm = document.getElementById("galleryForm");
const adminGalleryList = document.getElementById("adminGalleryList");
const resetGalleryButton = document.getElementById("resetGalleryAlbums");

const galleryTitle = document.getElementById("galleryTitle");
const galleryDate = document.getElementById("galleryDate");
const galleryDescription = document.getElementById("galleryDescription");
const galleryImages = document.getElementById("galleryImages");

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
            resolve({
                src: reader.result,
                name: file.name
            });
        };

        reader.onerror = function () {
            reject("Nem sikerült beolvasni a képet.");
        };

        reader.readAsDataURL(file);
    });
}

async function handleGallerySubmit(event) {
    event.preventDefault();

    const files = Array.from(galleryImages.files);

    if (files.length === 0) {
        alert("Válassz ki legalább egy képet.");
        return;
    }

    const imageList = await Promise.all(files.map(fileToBase64));

    const newAlbum = {
        id: crypto.randomUUID(),
        title: galleryTitle.value.trim(),
        date: galleryDate.value,
        description: galleryDescription.value.trim(),
        images: imageList
    };

    const albums = getGalleryAlbums();
    albums.push(newAlbum);

    saveGalleryAlbums(albums);

    galleryForm.reset();
    renderAdminGallery();
}

function renderAdminGallery() {
    const albums = sortAlbumsByDate(getGalleryAlbums());

    if (albums.length === 0) {
        adminGalleryList.innerHTML = `
            <p class="text-muted-custom">
                Még nincs feltöltött galéria.
            </p>
        `;
        return;
    }

    adminGalleryList.innerHTML = "";

    albums.forEach(function (album, index) {
        const item = document.createElement("div");
        item.className = "admin-concert-item";

        item.innerHTML = `
            <h4>${album.title}</h4>

            <p><strong>Dátum:</strong> ${formatGalleryDate(album.date)}</p>
            <p><strong>Leírás:</strong> ${album.description}</p>
            <p><strong>Képek száma:</strong> ${album.images.length}</p>

            <button class="btn btn-custom btn-sm mt-2" data-delete-gallery="${index}">
                Album törlése
            </button>
        `;

        adminGalleryList.appendChild(item);
    });

    const deleteButtons = document.querySelectorAll("[data-delete-gallery]");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(button.dataset.deleteGallery);
            deleteGalleryAlbum(index);
        });
    });
}

function deleteGalleryAlbum(index) {
    const albums = sortAlbumsByDate(getGalleryAlbums());

    const sure = confirm("Biztosan törlöd ezt a galéria-albumot?");

    if (!sure) {
        return;
    }

    albums.splice(index, 1);
    saveGalleryAlbums(albums);
    renderAdminGallery();
}

galleryForm.addEventListener("submit", handleGallerySubmit);

resetGalleryButton.addEventListener("click", function () {
    const sure = confirm("Biztosan visszaállítod az alap galériát?");

    if (sure) {
        resetGalleryAlbums();
        renderAdminGallery();
    }
});

renderAdminGallery();