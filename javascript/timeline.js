const API_BASE_URL = "http://localhost:3000";

const timelineContainer = document.getElementById("timelineContainer");
const timelineLeft = document.getElementById("timelineLeft");
const timelineRight = document.getElementById("timelineRight");

function formatDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function sortByDate(events) {
    return events.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}

function createImage(eventItem) {
    if (!eventItem.image) {
        return "";
    }

    return `
        <img src="${eventItem.image}" alt="${eventItem.title}" class="timeline-event-image">
    `;
}

async function getTimelineEvents() {
    const response = await fetch(`${API_BASE_URL}/api/timeline`);

    if (!response.ok) {
        throw new Error("Nem sikerült lekérni a timeline eseményeket.");
    }

    return await response.json();
}

async function renderTimeline() {
    if (!timelineContainer) {
        console.error("Nincs timelineContainer a HTML-ben.");
        return;
    }

    try {
        const events = sortByDate(await getTimelineEvents());

        console.log("Timeline események:", events);

        timelineContainer.innerHTML = "";

        if (events.length === 0) {
            timelineContainer.innerHTML = `
                <div class="timeline-empty">
                    <p class="text-muted-custom">
                        Még nincs feltöltött timeline esemény.
                    </p>
                </div>
            `;
            return;
        }

        events.forEach(function (eventItem) {
            const item = document.createElement("div");
            item.className = "timeline-item";

            item.innerHTML = `
                <div class="timeline-card">
                    ${createImage(eventItem)}

                    <p class="timeline-date">
                        ${formatDate(eventItem.date)}
                    </p>

                    <p class="timeline-type">
                        ${eventItem.type || "Egyéb"}
                    </p>

                    <h2>
                        ${eventItem.title}
                    </h2>

                    <p class="text-muted-custom">
                        ${eventItem.text}
                    </p>
                </div>
            `;

            timelineContainer.appendChild(item);
        });
    } catch (error) {
        timelineContainer.innerHTML = `
            <div class="timeline-empty">
                <p class="text-muted-custom">
                    Nem sikerült betölteni a timeline eseményeket.
                </p>
            </div>
        `;

        console.error(error);
    }
}

if (timelineLeft) {
    timelineLeft.addEventListener("click", function () {
        timelineContainer.scrollBy({
            left: -420,
            behavior: "smooth"
        });
    });
}

if (timelineRight) {
    timelineRight.addEventListener("click", function () {
        timelineContainer.scrollBy({
            left: 420,
            behavior: "smooth"
        });
    });
}

renderTimeline();