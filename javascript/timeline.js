import {
    getTimelineEvents,
    sortTimelineByDate,
    formatTimelineDate
} from "./timeline-storage.js";

const timelineContainer = document.getElementById("timelineContainer");
const timelineLeft = document.getElementById("timelineLeft");
const timelineRight = document.getElementById("timelineRight");
const timelineWrapper = document.querySelector(".timeline-scroll-wrapper");

function renderTimeline() {
    const events = sortTimelineByDate(getTimelineEvents());

    timelineContainer.innerHTML = "";

    if (events.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <p class="timeline-date">Nincs esemény</p>
                <h3>Még nincs timeline esemény</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        `;
        return;
    }

    events.forEach(function (eventItem) {
        const item = document.createElement("article");
        item.className = "timeline-item";

        const imagePart = eventItem.image
            ? `<img src="${eventItem.image}" alt="${eventItem.title}" class="timeline-image">`
            : "";

        item.innerHTML = `
            <div class="timeline-dot"></div>

            ${imagePart}

            <p class="timeline-date">
                ${formatTimelineDate(eventItem.date)}
            </p>

            <p class="timeline-type">
                ${eventItem.type}
            </p>

            <h3>
                ${eventItem.title}
            </h3>

            <p>
                ${eventItem.text}
            </p>
        `;

        timelineContainer.appendChild(item);
    });
}

timelineLeft.addEventListener("click", function () {
    timelineWrapper.scrollBy({
        left: -360,
        behavior: "smooth"
    });
});

timelineRight.addEventListener("click", function () {
    timelineWrapper.scrollBy({
        left: 360,
        behavior: "smooth"
    });
});

renderTimeline();