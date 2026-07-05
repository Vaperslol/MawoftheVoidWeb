import {
    getTimelineEvents,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    sortTimelineByDate,
    formatTimelineDate
} from "./timeline-api.js";

const timelineForm = document.getElementById("timelineForm");
const adminTimelineList = document.getElementById("adminTimelineList");
const resetTimelineButton = document.getElementById("resetTimelineButton");

const timelineTitle = document.getElementById("timelineTitle");
const timelineDate = document.getElementById("timelineDate");
const timelineType = document.getElementById("timelineType");
const timelineText = document.getElementById("timelineText");
const timelineImage = document.getElementById("timelineImage");

const timelineEditIndex = document.getElementById("timelineEditIndex");
const saveTimelineButton = document.getElementById("saveTimelineButton");
const cancelTimelineEditButton = document.getElementById("cancelTimelineEditButton");

let currentEditImage = "";

const defaultTimelineEvents = [
    {
        title: "A Maw of the Void elindul",
        date: "2026-05-01",
        type: "Alakulás",
        text: "A zenekar elkezdi összerakni a saját hangzását, az első ötletek és próbák alapján.",
        image: ""
    },
    {
        title: "Első komolyabb próbák",
        date: "2026-06-01",
        type: "Próba",
        text: "A banda elkezd teljes dalokon dolgozni, kialakulnak az első riffek, témák és koncertötletek.",
        image: ""
    },
    {
        title: "Első koncerttervek",
        date: "2026-09-01",
        type: "Koncert",
        text: "Megjelennek az első fellépésekhez kapcsolódó tervek és időpontok.",
        image: ""
    }
];

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            reject("Nem sikerült beolvasni a képet.");
        };

        reader.readAsDataURL(file);
    });
}

function resetTimelineFormMode() {
    timelineForm.reset();
    timelineEditIndex.value = "";
    currentEditImage = "";

    saveTimelineButton.textContent = "Esemény hozzáadása";
    cancelTimelineEditButton.classList.add("d-none");
}

function fillTimelineForm(eventItem) {
    timelineTitle.value = eventItem.title || "";
    timelineDate.value = eventItem.date || "";
    timelineType.value = eventItem.type || "Egyéb";
    timelineText.value = eventItem.text || "";

    timelineEditIndex.value = eventItem.id;
    currentEditImage = eventItem.image || "";

    saveTimelineButton.textContent = "Esemény mentése";
    cancelTimelineEditButton.classList.remove("d-none");

    timelineForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

async function renderAdminTimeline() {
    try {
        const events = sortTimelineByDate(await getTimelineEvents());

        adminTimelineList.innerHTML = "";

        if (events.length === 0) {
            adminTimelineList.innerHTML = `
                <p class="text-muted-custom">
                    Még nincs feltöltött timeline esemény.
                </p>
            `;
            return;
        }

        events.forEach(function (eventItem) {
            const item = document.createElement("div");
            item.className = "admin-concert-item";

            item.innerHTML = `
                <h4>
                    ${eventItem.title}
                </h4>

                <p>
                    <strong>Dátum:</strong>
                    ${formatTimelineDate(eventItem.date)}
                </p>

                <p>
                    <strong>Típus:</strong>
                    ${eventItem.type}
                </p>

                <p>
                    <strong>Leírás:</strong>
                    ${eventItem.text.slice(0, 120)}...
                </p>

                <div class="d-flex flex-wrap gap-2 mt-3">
                    <button class="btn btn-custom btn-sm" data-edit-timeline="${eventItem.id}">
                        Szerkesztés
                    </button>

                    <button class="btn btn-custom btn-sm" data-delete-timeline="${eventItem.id}">
                        Törlés
                    </button>
                </div>
            `;

            adminTimelineList.appendChild(item);
        });
    } catch (error) {
        adminTimelineList.innerHTML = `
            <p class="text-muted-custom">
                Nem sikerült betölteni a timeline eseményeket. Ellenőrizd, hogy fut-e a backend.
            </p>
        `;

        console.error(error);
    }
}

async function editTimelineEvent(id) {
    try {
        const events = await getTimelineEvents();

        const eventItem = events.find(function (item) {
            return Number(item.id) === Number(id);
        });

        if (!eventItem) {
            alert("Az esemény nem található.");
            return;
        }

        fillTimelineForm(eventItem);
    } catch (error) {
        alert("Nem sikerült betölteni az eseményt.");
        console.error(error);
    }
}

async function removeTimelineEvent(id) {
    const sure = confirm("Biztosan törlöd ezt a timeline eseményt?");

    if (!sure) {
        return;
    }

    try {
        await deleteTimelineEvent(id);
        resetTimelineFormMode();
        await renderAdminTimeline();
    } catch (error) {
        alert("Nem sikerült törölni az eseményt.");
        console.error(error);
    }
}

timelineForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const editId = timelineEditIndex.value;
    let imageValue = currentEditImage;

    if (timelineImage.files.length > 0) {
        imageValue = await fileToBase64(timelineImage.files[0]);
    }

    const eventItem = {
        title: timelineTitle.value.trim(),
        date: timelineDate.value,
        type: timelineType.value,
        text: timelineText.value.trim(),
        image: imageValue
    };

    if (!eventItem.title || !eventItem.date || !eventItem.text) {
        alert("A cím, dátum és leírás kötelező.");
        return;
    }

    try {
        if (editId === "") {
            await addTimelineEvent(eventItem);
        } else {
            await updateTimelineEvent(editId, eventItem);
        }

        resetTimelineFormMode();
        await renderAdminTimeline();
    } catch (error) {
        alert("Nem sikerült menteni az eseményt. Ellenőrizd, hogy fut-e a backend.");
        console.error(error);
    }
});

adminTimelineList.addEventListener("click", function (event) {
    const editButton = event.target.closest("[data-edit-timeline]");
    const deleteButton = event.target.closest("[data-delete-timeline]");

    if (editButton) {
        editTimelineEvent(Number(editButton.dataset.editTimeline));
        return;
    }

    if (deleteButton) {
        removeTimelineEvent(Number(deleteButton.dataset.deleteTimeline));
    }
});

cancelTimelineEditButton.addEventListener("click", function () {
    resetTimelineFormMode();
});

resetTimelineButton.addEventListener("click", async function () {
    const sure = confirm("Biztosan visszaállítod az alap timeline eseményeket? Ez törli a mostaniakat.");

    if (!sure) {
        return;
    }

    try {
        const events = await getTimelineEvents();

        for (const eventItem of events) {
            await deleteTimelineEvent(eventItem.id);
        }

        for (const defaultEvent of defaultTimelineEvents) {
            await addTimelineEvent(defaultEvent);
        }

        resetTimelineFormMode();
        await renderAdminTimeline();
    } catch (error) {
        alert("Nem sikerült visszaállítani az alap timeline-t.");
        console.error(error);
    }
});

renderAdminTimeline();