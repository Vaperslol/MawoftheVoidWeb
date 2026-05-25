import {
    getConcerts,
    saveConcerts,
    clearConcerts,
    resetConcertsToDefault,
    sortConcertsByDate,
    getStatusText,
    getTicketText,
    getStreamText,
    getRecordingText,
    formatDate
} from "./concert-storage.js";

const form = document.getElementById("concertForm");
const adminConcertList = document.getElementById("adminConcertList");
const clearConcertsButton = document.getElementById("clearConcerts");
const resetConcertsButton = document.getElementById("resetConcerts");

const editIndexInput = document.getElementById("editIndex");
const saveConcertButton = document.getElementById("saveConcertButton");
const cancelEditButton = document.getElementById("cancelEditButton");

const ticketOption = document.getElementById("ticketOption");
const ticketLinkBox = document.getElementById("ticketLinkBox");
const ticketLink = document.getElementById("ticketLink");

const streamOption = document.getElementById("streamOption");
const streamLinkBox = document.getElementById("streamLinkBox");
const streamLink = document.getElementById("streamLink");

const recordingOption = document.getElementById("recordingOption");
const recordingLinkBox = document.getElementById("recordingLinkBox");
const recordingLink = document.getElementById("recordingLink");

function handleOptionalFields() {
    if (ticketOption.value === "ticket-link") {
        ticketLinkBox.classList.remove("d-none");
        ticketLink.required = true;
    } else {
        ticketLinkBox.classList.add("d-none");
        ticketLink.required = false;
        ticketLink.value = "";
    }

    if (streamOption.value === "stream-link") {
        streamLinkBox.classList.remove("d-none");
        streamLink.required = false;
    } else {
        streamLinkBox.classList.add("d-none");
        streamLink.required = false;
        streamLink.value = "";
    }

    if (recordingOption.value === "recording-link") {
        recordingLinkBox.classList.remove("d-none");
        recordingLink.required = false;
    } else {
        recordingLinkBox.classList.add("d-none");
        recordingLink.required = false;
        recordingLink.value = "";
    }
}

ticketOption.addEventListener("change", handleOptionalFields);
streamOption.addEventListener("change", handleOptionalFields);
recordingOption.addEventListener("change", handleOptionalFields);

function getFormConcertData() {
    return {
        name: document.getElementById("name").value.trim(),
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        place: document.getElementById("place").value.trim(),
        address: document.getElementById("address").value.trim(),
        status: document.getElementById("status").value,
        entry: document.getElementById("entry").value.trim(),

        ticketOption: ticketOption.value,
        ticketLink: ticketLink.value.trim(),

        streamOption: streamOption.value,
        streamLink: streamLink.value.trim(),

        recordingOption: recordingOption.value,
        recordingLink: recordingLink.value.trim()
    };
}

function fillFormWithConcert(concert, index) {
    document.getElementById("name").value = concert.name;
    document.getElementById("date").value = concert.date;
    document.getElementById("time").value = concert.time;
    document.getElementById("place").value = concert.place;
    document.getElementById("address").value = concert.address;
    document.getElementById("status").value = concert.status;
    document.getElementById("entry").value = concert.entry;

    ticketOption.value = concert.ticketOption || "no-ticket";
    ticketLink.value = concert.ticketLink || "";

    streamOption.value = concert.streamOption || "no-stream";
    streamLink.value = concert.streamLink || "";

    recordingOption.value = concert.recordingOption || "no-recording";
    recordingLink.value = concert.recordingLink || "";

    editIndexInput.value = index;

    saveConcertButton.textContent = "Koncert mentése";
    cancelEditButton.classList.remove("d-none");

    handleOptionalFields();

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function resetFormMode() {
    form.reset();

    document.getElementById("address").value = "";

    ticketOption.value = "no-ticket";
    streamOption.value = "no-stream";
    recordingOption.value = "recording-link";

    editIndexInput.value = "";

    saveConcertButton.textContent = "Koncert hozzáadása";
    cancelEditButton.classList.add("d-none");

    handleOptionalFields();
}

function renderAdminConcerts() {
    const concerts = sortConcertsByDate(getConcerts());

    if (concerts.length === 0) {
        adminConcertList.innerHTML = `
            <p class="text-muted-custom">
                Még nincs koncert hozzáadva.
            </p>
        `;
        return;
    }

    adminConcertList.innerHTML = "";

    concerts.forEach(function (concert, index) {
        const item = document.createElement("div");
        item.className = "admin-concert-item";

        item.innerHTML = `
            <h4>${concert.name}</h4>

            <p><strong>Dátum:</strong> ${formatDate(concert.date)} ${concert.time}</p>
            <p><strong>Helyszín:</strong> ${concert.place}</p>
            <p><strong>Cím:</strong> ${concert.address}</p>
            <p><strong>Státusz:</strong> ${getStatusText(concert.status)}</p>
            <p><strong>Belépés:</strong> ${concert.entry}</p>
            <p><strong>Jegy:</strong> ${getTicketText(concert)}</p>
            <p><strong>Élő adás:</strong> ${getStreamText(concert)}</p>
            <p><strong>Felvétel:</strong> ${getRecordingText(concert)}</p>

            <div class="d-flex flex-wrap gap-2 mt-3">
                <button class="btn btn-custom btn-sm" data-edit-index="${index}">
                    Szerkesztés
                </button>

                <button class="btn btn-custom btn-sm" data-delete-index="${index}">
                    Törlés
                </button>
            </div>
        `;

        adminConcertList.appendChild(item);
    });

    const editButtons = document.querySelectorAll("[data-edit-index]");
    const deleteButtons = document.querySelectorAll("[data-delete-index]");

    editButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(button.dataset.editIndex);
            editConcert(index);
        });
    });

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(button.dataset.deleteIndex);
            deleteConcert(index);
        });
    });
}

function editConcert(index) {
    const concerts = sortConcertsByDate(getConcerts());
    const concert = concerts[index];

    fillFormWithConcert(concert, index);
}

function deleteConcert(index) {
    const concerts = sortConcertsByDate(getConcerts());

    const sure = confirm("Biztosan törlöd ezt a koncertet?");

    if (!sure) {
        return;
    }

    concerts.splice(index, 1);

    saveConcerts(concerts);
    resetFormMode();
    renderAdminConcerts();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const concerts = sortConcertsByDate(getConcerts());
    const newConcertData = getFormConcertData();

    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        concerts.push(newConcertData);
    } else {
        concerts[Number(editIndex)] = newConcertData;
    }

    saveConcerts(concerts);
    resetFormMode();
    renderAdminConcerts();
});

cancelEditButton.addEventListener("click", function () {
    resetFormMode();
});

clearConcertsButton.addEventListener("click", function () {
    const sure = confirm("Biztosan törlöd az összes koncertet?");

    if (sure) {
        clearConcerts();
        resetFormMode();
        renderAdminConcerts();
    }
});

if (resetConcertsButton) {
    resetConcertsButton.addEventListener("click", function () {
        const sure = confirm("Biztosan visszaállítod az alap koncerteket?");

        if (sure) {
            resetConcertsToDefault();
            resetFormMode();
            renderAdminConcerts();
        }
    });
}

handleOptionalFields();
renderAdminConcerts();