import {
    getConcerts,
    addConcert,
    updateConcert,
    deleteConcert,
    sortConcertsByDate,
    formatConcertDate
} from "./concert-api.js";

const concertForm = document.getElementById("concertForm");

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const placeInput = document.getElementById("place");
const addressInput = document.getElementById("address");
const statusInput = document.getElementById("status");
const entryInput = document.getElementById("entry");

const ticketOptionInput = document.getElementById("ticketOption");
const ticketLinkBox = document.getElementById("ticketLinkBox");
const ticketLinkInput = document.getElementById("ticketLink");

const streamOptionInput = document.getElementById("streamOption");
const streamLinkBox = document.getElementById("streamLinkBox");
const streamLinkInput = document.getElementById("streamLink");

const recordingOptionInput = document.getElementById("recordingOption");
const recordingLinkBox = document.getElementById("recordingLinkBox");
const recordingLinkInput = document.getElementById("recordingLink");

const editIndexInput = document.getElementById("editIndex");
const saveConcertButton = document.getElementById("saveConcertButton");
const cancelEditButton = document.getElementById("cancelEditButton");

const adminConcertList = document.getElementById("adminConcertList");
const clearConcertsButton = document.getElementById("clearConcerts");
const resetConcertsButton = document.getElementById("resetConcerts");

const defaultConcerts = [
    {
        name: "UMSZKI évnyitó koncert",
        title: "UMSZKI évnyitó koncert",
        date: "2026-09-01",
        time: "10:30",
        place: "UMSZKI",
        location: "UMSZKI",
        address: "1041 Budapest IV. ker., Görgey Artúr utca 26.",
        status: "private",
        entry: "Diák exkluzív",
        ticketOption: "no-ticket",
        ticketLink: "",
        streamOption: "no-stream",
        streamLink: "",
        recordingOption: "no-recording",
        recordingLink: "",
        description: "Diák exkluzív koncert az UMSZKI-ban."
    },
    {
        name: "UMSZKI 100 koncert",
        title: "UMSZKI 100 koncert",
        date: "2026-09-05",
        time: "11:00",
        place: "Budapest, UMSZKI",
        location: "Budapest, UMSZKI",
        address: "1041 Budapest IV. ker., Görgey Artúr utca 26.",
        status: "private",
        entry: "UMSZKI-s diákoknak, volt diákoknak, tanároknak, volt tanároknak és hozzátartozóknak",
        ticketOption: "no-ticket",
        ticketLink: "",
        streamOption: "no-stream",
        streamLink: "",
        recordingOption: "no-recording",
        recordingLink: "",
        description: "UMSZKI 100 koncert."
    }
];

function getStatusText(status) {
    const statuses = {
        open: "Látogatható",
        private: "Privát",
        "not-open": "Nem látogatható"
    };

    return statuses[status] || status || "Nincs megadva";
}

function getTicketText(option) {
    const options = {
        "no-ticket": "Nem lehet jegyet venni",
        "ticket-link": "Jegyvásárlás linkkel"
    };

    return options[option] || option || "Nincs megadva";
}

function getStreamText(option) {
    const options = {
        "no-stream": "Nem fog készülni róla élő adás",
        "stream-link": "Fog készülni róla élő adás"
    };

    return options[option] || option || "Nincs megadva";
}

function getRecordingText(option) {
    const options = {
        "no-recording": "Nem fog készülni róla felvétel",
        "recording-link": "Fog készülni róla felvétel"
    };

    return options[option] || option || "Nincs megadva";
}

function makeMapLink(address) {
    if (!address) {
        return "";
    }

    if (address.startsWith("http://") || address.startsWith("https://")) {
        return address;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function showOrHideExtraFields() {
    if (ticketOptionInput.value === "ticket-link") {
        ticketLinkBox.classList.remove("d-none");
    } else {
        ticketLinkBox.classList.add("d-none");
        ticketLinkInput.value = "";
    }

    if (streamOptionInput.value === "stream-link") {
        streamLinkBox.classList.remove("d-none");
    } else {
        streamLinkBox.classList.add("d-none");
        streamLinkInput.value = "";
    }

    if (recordingOptionInput.value === "recording-link") {
        recordingLinkBox.classList.remove("d-none");
    } else {
        recordingLinkBox.classList.add("d-none");
        recordingLinkInput.value = "";
    }
}

function resetConcertFormMode() {
    concertForm.reset();
    editIndexInput.value = "";

    saveConcertButton.textContent = "Koncert hozzáadása";
    cancelEditButton.classList.add("d-none");

    showOrHideExtraFields();
}

function buildConcertObject() {
    const name = nameInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const place = placeInput.value.trim();
    const address = addressInput.value.trim();
    const status = statusInput.value;
    const entry = entryInput.value.trim();

    const ticketOption = ticketOptionInput.value;
    const ticketLink = ticketLinkInput.value.trim();

    const streamOption = streamOptionInput.value;
    const streamLink = streamLinkInput.value.trim();

    const recordingOption = recordingOptionInput.value;
    const recordingLink = recordingLinkInput.value.trim();

    return {
        name: name,
        title: name,

        date: date,
        time: time,

        place: place,
        location: place,

        address: address,
        map: makeMapLink(address),

        status: status,
        statusText: getStatusText(status),

        entry: entry,
        description: entry,

        ticketOption: ticketOption,
        ticketText: getTicketText(ticketOption),
        ticketLink: ticketLink,
        ticket: ticketLink,

        streamOption: streamOption,
        streamText: getStreamText(streamOption),
        streamLink: streamLink,

        recordingOption: recordingOption,
        recordingText: getRecordingText(recordingOption),
        recordingLink: recordingLink,
        video: recordingLink
    };
}

function fillConcertForm(concert) {
    nameInput.value = concert.name || concert.title || "";
    dateInput.value = concert.date || "";
    timeInput.value = concert.time || "";
    placeInput.value = concert.place || concert.location || "";
    addressInput.value = concert.address || "";
    statusInput.value = concert.status || "open";
    entryInput.value = concert.entry || concert.description || "";

    ticketOptionInput.value = concert.ticketOption || "no-ticket";
    ticketLinkInput.value = concert.ticketLink || concert.ticket || "";

    streamOptionInput.value = concert.streamOption || "no-stream";
    streamLinkInput.value = concert.streamLink || "";

    recordingOptionInput.value = concert.recordingOption || "no-recording";
    recordingLinkInput.value = concert.recordingLink || concert.video || "";

    editIndexInput.value = concert.id;

    saveConcertButton.textContent = "Koncert mentése";
    cancelEditButton.classList.remove("d-none");

    showOrHideExtraFields();

    concertForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

async function renderAdminConcerts() {
    try {
        const concerts = sortConcertsByDate(await getConcerts());

        adminConcertList.innerHTML = "";

        if (concerts.length === 0) {
            adminConcertList.innerHTML = `
                <p class="text-muted-custom">
                    Még nincs feltöltött koncert.
                </p>
            `;
            return;
        }

        concerts.forEach(function (concert) {
            const item = document.createElement("div");
            item.className = "admin-concert-item";

            item.innerHTML = `
                <h4>
                    ${concert.name || concert.title || "Névtelen koncert"}
                </h4>

                <p>
                    <strong>Dátum:</strong>
                    ${formatConcertDate(concert.date)}
                    ${concert.time ? ` - ${concert.time}` : ""}
                </p>

                <p>
                    <strong>Helyszín:</strong>
                    ${concert.place || concert.location || "Nincs megadva"}
                </p>

                <p>
                    <strong>Pontos cím:</strong>
                    ${concert.address || "Nincs megadva"}
                </p>

                <p>
                    <strong>Státusz:</strong>
                    ${getStatusText(concert.status)}
                </p>

                <p>
                    <strong>Belépés:</strong>
                    ${concert.entry || concert.description || "Nincs megadva"}
                </p>

                <p>
                    <strong>Jegy:</strong>
                    ${getTicketText(concert.ticketOption)}
                </p>

                <p>
                    <strong>Élő adás:</strong>
                    ${getStreamText(concert.streamOption)}
                </p>

                <p>
                    <strong>Felvétel:</strong>
                    ${getRecordingText(concert.recordingOption)}
                </p>

                <div class="d-flex flex-wrap gap-2 mt-3">
                    <button class="btn btn-custom btn-sm" data-edit-concert="${concert.id}">
                        Szerkesztés
                    </button>

                    <button class="btn btn-custom btn-sm" data-delete-concert="${concert.id}">
                        Törlés
                    </button>
                </div>
            `;

            adminConcertList.appendChild(item);
        });
    } catch (error) {
        adminConcertList.innerHTML = `
            <p class="text-muted-custom">
                Nem sikerült betölteni a koncerteket. Ellenőrizd, hogy fut-e a backend.
            </p>
        `;

        console.error(error);
    }
}

async function editConcert(id) {
    try {
        const concerts = await getConcerts();

        const concert = concerts.find(function (item) {
            return Number(item.id) === Number(id);
        });

        if (!concert) {
            alert("A koncert nem található.");
            return;
        }

        fillConcertForm(concert);
    } catch (error) {
        alert("Nem sikerült betölteni a koncertet.");
        console.error(error);
    }
}

async function removeConcert(id) {
    const sure = confirm("Biztosan törlöd ezt a koncertet?");

    if (!sure) {
        return;
    }

    try {
        await deleteConcert(id);
        resetConcertFormMode();
        await renderAdminConcerts();
    } catch (error) {
        alert("Nem sikerült törölni a koncertet.");
        console.error(error);
    }
}

concertForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const concertItem = buildConcertObject();

    if (!concertItem.name || !concertItem.date) {
        alert("A koncert címe és dátuma kötelező.");
        return;
    }

    try {
        if (editIndexInput.value === "") {
            await addConcert(concertItem);
        } else {
            await updateConcert(editIndexInput.value, concertItem);
        }

        resetConcertFormMode();
        await renderAdminConcerts();
    } catch (error) {
        alert("Nem sikerült menteni a koncertet. Ellenőrizd, hogy fut-e a backend.");
        console.error(error);
    }
});

adminConcertList.addEventListener("click", function (event) {
    const editButton = event.target.closest("[data-edit-concert]");
    const deleteButton = event.target.closest("[data-delete-concert]");

    if (editButton) {
        editConcert(Number(editButton.dataset.editConcert));
        return;
    }

    if (deleteButton) {
        removeConcert(Number(deleteButton.dataset.deleteConcert));
    }
});

cancelEditButton.addEventListener("click", function () {
    resetConcertFormMode();
});

clearConcertsButton.addEventListener("click", async function () {
    const sure = confirm("Biztosan törlöd az összes koncertet?");

    if (!sure) {
        return;
    }

    try {
        const concerts = await getConcerts();

        for (const concert of concerts) {
            await deleteConcert(concert.id);
        }

        resetConcertFormMode();
        await renderAdminConcerts();
    } catch (error) {
        alert("Nem sikerült törölni az összes koncertet.");
        console.error(error);
    }
});

resetConcertsButton.addEventListener("click", async function () {
    const sure = confirm("Biztosan visszaállítod az alap koncerteket? Ez törli a mostaniakat.");

    if (!sure) {
        return;
    }

    try {
        const concerts = await getConcerts();

        for (const concert of concerts) {
            await deleteConcert(concert.id);
        }

        for (const defaultConcert of defaultConcerts) {
            await addConcert(defaultConcert);
        }

        resetConcertFormMode();
        await renderAdminConcerts();
    } catch (error) {
        alert("Nem sikerült visszaállítani az alap koncerteket.");
        console.error(error);
    }
});

ticketOptionInput.addEventListener("change", showOrHideExtraFields);
streamOptionInput.addEventListener("change", showOrHideExtraFields);
recordingOptionInput.addEventListener("change", showOrHideExtraFields);

showOrHideExtraFields();
renderAdminConcerts();