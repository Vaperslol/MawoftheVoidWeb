const defaultTimelineEvents = [
    {
        id: crypto.randomUUID(),
        title: "A banda elindult",
        date: "2026-05-01",
        type: "Alakulás",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
        image: "https://picsum.photos/1000/700?random=2210"
    },
    {
        id: crypto.randomUUID(),
        title: "Első próba",
        date: "2026-05-08",
        type: "Próba",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
        image: "https://picsum.photos/1000/700?random=2211"
    },
    {
        id: crypto.randomUUID(),
        title: "Első bejelentett koncert",
        date: "2026-09-01",
        type: "Koncert",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lectus tortor.",
        image: "https://picsum.photos/1000/700?random=2212"
    }
];

export function getTimelineEvents() {
    const savedEvents = localStorage.getItem("timelineEvents");

    if (!savedEvents) {
        localStorage.setItem("timelineEvents", JSON.stringify(defaultTimelineEvents));
        return defaultTimelineEvents;
    }

    return JSON.parse(savedEvents);
}

export function saveTimelineEvents(events) {
    localStorage.setItem("timelineEvents", JSON.stringify(events));
}

export function resetTimelineEvents() {
    localStorage.setItem("timelineEvents", JSON.stringify(defaultTimelineEvents));
    return defaultTimelineEvents;
}

export function sortTimelineByDate(events) {
    return events.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}

export function formatTimelineDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}