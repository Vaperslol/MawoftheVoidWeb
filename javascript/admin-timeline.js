import {
    getTimelineEvents,
    saveTimelineEvents,
    resetTimelineEvents,
    sortTimelineByDate,
    formatTimelineDate
} from "./timeline-storage.js";

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
    saveTimelineButton.textContent = "Esemény hozzáadása";
    cancelTimelineEditButton.classList.add("d-none");
}

function fillTimelineForm(eventItem, index) {
    timelineTitle.value = eventItem.title;
    timelineDate.value = eventItem.date;
    timelineType.value = eventItem.type;
    timelineText.value = eventItem.text;

    timelineEditIndex.value = index;

    saveTimelineButton.textContent = "Esemény mentése";
    cancelTimelineEditButton.classList.remove("d-none");

    timelineForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function renderAdminTimeline() {
    const events = sortTimelineByDate(getTimelineEvents());

    if (events.length === 0) {
        adminTimelineList.innerHTML = `
            <p class="text-muted-custom">
                Még nincs timeline esemény hozzáadva.
            </p>
        `;
        return;
    }

    adminTimelineList.innerHTML = "";

    events.forEach(function (eventItem, index) {
        const item = document.createElement("div");
        item.className = "admin-concert-item";

        item.innerHTML = `
            <h4>${eventItem.title}</h4>

            <p><strong>Dátum:</strong> ${formatTimelineDate(eventItem.date)}</p>
            <p><strong>Típus:</strong> ${eventItem.type}</p>
            <p><strong>Leírás:</strong> ${eventItem.text.slice(0, 120)}...</p>

            <div class="d-flex flex-wrap gap-2 mt-3">
                <button class="btn btn-custom btn-sm" data-edit-timeline="${index}">
                    Szerkesztés
                </button>

                <button class="btn btn-custom btn-sm" data-delete-timeline="${index}">
                    Törlés
                </button>
            </div>
        `;

        adminTimelineList.appendChild(item);
    });

    const editButtons = document.querySelectorAll("[data-edit-timeline]");
    const deleteButtons = document.querySelectorAll("[data-delete-timeline]");

    editButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(button.dataset.editTimeline);
            editTimelineEvent(index);
        });
    });

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = Number(button.dataset.deleteTimeline);
            deleteTimelineEvent(index);
        });
    });
}

function editTimelineEvent(index) {
    const events = sortTimelineByDate(getTimelineEvents());
    const eventItem = events[index];

    fillTimelineForm(eventItem, index);
}

function deleteTimelineEvent(index) {
    const events = sortTimelineByDate(getTimelineEvents());

    const sure = confirm("Biztosan törlöd ezt a timeline eseményt?");

    if (!sure) {
        return;
    }

    events.splice(index, 1);
    saveTimelineEvents(events);

    resetTimelineFormMode();
    renderAdminTimeline();
}

timelineForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const events = sortTimelineByDate(getTimelineEvents());
    const editIndex = timelineEditIndex.value;

    let imageValue = "";

    if (editIndex !== "") {
        imageValue = events[Number(editIndex)].image || "";
    }

    if (timelineImage.files.length > 0) {
        imageValue = await fileToBase64(timelineImage.files[0]);
    }

    const newEvent = {
        id: crypto.randomUUID(),
        title: timelineTitle.value.trim(),
        date: timelineDate.value,
        type: timelineType.value,
        text: timelineText.value.trim(),
        image: imageValue
    };

    if (editIndex === "") {
        events.push(newEvent);
    } else {
        newEvent.id = events[Number(editIndex)].id;
        events[Number(editIndex)] = newEvent;
    }

    saveTimelineEvents(events);

    resetTimelineFormMode();
    renderAdminTimeline();
});

cancelTimelineEditButton.addEventListener("click", function () {
    resetTimelineFormMode();
});

resetTimelineButton.addEventListener("click", function () {
    const sure = confirm("Biztosan visszaállítod az alap timeline eseményeket?");

    if (sure) {
        resetTimelineEvents();
        resetTimelineFormMode();
        renderAdminTimeline();
    }
});

renderAdminTimeline();