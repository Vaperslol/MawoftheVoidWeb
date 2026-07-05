import {
    getGalleryAlbums,
    uploadGalleryImages,
    addGalleryAlbum,
    deleteGalleryAlbum,
    sortGalleryAlbumsByDate,
    formatGalleryDate
} from "./gallery-api.js";

const galleryForm = document.getElementById("galleryForm");

const galleryTitle = document.getElementById("galleryTitle");
const galleryDate = document.getElementById("galleryDate");
const galleryDescription = document.getElementById("galleryDescription");
const galleryImages = document.getElementById("galleryImages");

const adminGalleryList = document.getElementById("adminGalleryList");
const resetGalleryAlbums = document.getElementById("resetGalleryAlbums");

function getCoverImage(album) {
    if (!album.images || album.images.length === 0) {
        return "";
    }

    return album.images[0];
}

async function renderAdminGallery() {
    try {
        const albums = sortGalleryAlbumsByDate(await getGalleryAlbums());

        adminGalleryList.innerHTML = "";

        if (albums.length === 0) {
            adminGalleryList.innerHTML = `
                <p class="text-muted-custom">
                    Még nincs feltöltött galéria-album.
                </p>
            `;
            return;
        }

        albums.forEach(function (album) {
            const item = document.createElement("div");
            item.className = "admin-concert-item";

            const coverImage = getCoverImage(album);

            item.innerHTML = `
                ${
                    coverImage
                        ? `<img src="${coverImage}" alt="${album.title}" class="admin-gallery-preview">`
                        : ""
                }

                <h4>
                    ${album.title}
                </h4>

                <p>
                    <strong>Dátum:</strong>
                    ${formatGalleryDate(album.date)}
                </p>

                <p>
                    <strong>Leírás:</strong>
                    ${album.description}
                </p>

                <p>
                    <strong>Képek száma:</strong>
                    ${album.images ? album.images.length : 0}
                </p>

                <div class="d-flex flex-wrap gap-2 mt-3">
                    <button class="btn btn-custom btn-sm" data-delete-gallery="${album.id}">
                        Album törlése
                    </button>
                </div>
            `;

            adminGalleryList.appendChild(item);
        });
    } catch (error) {
        adminGalleryList.innerHTML = `
            <p class="text-muted-custom">
                Nem sikerült betölteni a galéria albumokat. Ellenőrizd, hogy fut-e a backend.
            </p>
        `;

        console.error(error);
    }
}

galleryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = galleryTitle.value.trim();
    const date = galleryDate.value;
    const description = galleryDescription.value.trim();

    if (!title || !date || !description) {
        alert("Az album neve, dátuma és leírása kötelező.");
        return;
    }

    if (galleryImages.files.length === 0) {
        alert("Legalább egy képet fel kell tölteni az albumhoz.");
        return;
    }

    try {
        const uploadedImages = await uploadGalleryImages(galleryImages.files);

        const albumItem = {
            title: title,
            date: date,
            description: description,
            images: uploadedImages
        };

        await addGalleryAlbum(albumItem);

        galleryForm.reset();
        await renderAdminGallery();

        alert("Galéria album feltöltve.");
    } catch (error) {
        alert("Nem sikerült feltölteni az albumot. Ellenőrizd, hogy fut-e a backend.");
        console.error(error);
    }
});

adminGalleryList.addEventListener("click", async function (event) {
    const deleteButton = event.target.closest("[data-delete-gallery]");

    if (!deleteButton) {
        return;
    }

    const id = Number(deleteButton.dataset.deleteGallery);

    const sure = confirm("Biztosan törlöd ezt az albumot? A feltöltött képek is törlődnek.");

    if (!sure) {
        return;
    }

    try {
        await deleteGalleryAlbum(id);
        await renderAdminGallery();
    } catch (error) {
        alert("Nem sikerült törölni az albumot.");
        console.error(error);
    }
});

if (resetGalleryAlbums) {
    resetGalleryAlbums.addEventListener("click", async function () {
        const sure = confirm("Biztosan törlöd az összes galéria albumot?");

        if (!sure) {
            return;
        }

        try {
            const albums = await getGalleryAlbums();

            for (const album of albums) {
                await deleteGalleryAlbum(album.id);
            }

            await renderAdminGallery();
        } catch (error) {
            alert("Nem sikerült törölni az albumokat.");
            console.error(error);
        }
    });
}

renderAdminGallery();