const defaultConcerts = [
    {
        name: "UMSZKI évnyitó koncert",
        date: "2026-09-01",
        time: "10:30",
        place: "UMSZKI",
        address: "1041 Budapest IV. ker., Görgey Artúr utca 26.",
        status: "private",
        entry: "Diák exkluzív",
        ticketOption: "no-ticket",
        ticketLink: "",
        streamOption: "no-stream",
        streamLink: "",
        recordingOption: "recording-link",
        recordingLink: ""
    },
    {
        name: "UMSZKI 100 koncert",
        date: "2026-09-05",
        time: "12:00",
        place: "Budapest, UMSZKI",
        address: "1041 Budapest IV. ker., Görgey Artúr utca 26.",
        status: "private",
        entry: "UMSZKI-s diákoknak, volt diákoknak, tanároknak, volt tanároknak és hozzátartozóknak",
        ticketOption: "no-ticket",
        ticketLink: "",
        streamOption: "stream-link",
        streamLink: "",
        recordingOption: "recording-link",
        recordingLink: ""
    }
];

export function getConcerts() {
    const savedConcerts = localStorage.getItem("concerts");

    if (!savedConcerts) {
        localStorage.setItem("concerts", JSON.stringify(defaultConcerts));
        return defaultConcerts;
    }

    return JSON.parse(savedConcerts);
}

export function saveConcerts(concerts) {
    localStorage.setItem("concerts", JSON.stringify(concerts));
}

export function clearConcerts() {
    localStorage.removeItem("concerts");
}

export function resetConcertsToDefault() {
    localStorage.setItem("concerts", JSON.stringify(defaultConcerts));
    return defaultConcerts;
}

export function sortConcertsByDate(concerts) {
    return concerts.sort(function (a, b) {
        return new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time);
    });
}

export function getStatusText(status) {
    if (status === "open") return "Látogatható";
    if (status === "private") return "Privát";
    if (status === "not-open") return "Nem látogatható";

    return "Ismeretlen";
}

export function getTicketText(concert) {
    if (concert.ticketOption === "ticket-link") {
        return "Jegyvásárlás";
    }

    return "Nem lehet jegyet venni";
}

export function getStreamText(concert) {
    if (concert.streamOption === "stream-link") {
        return "Fog készülni róla élő adás";
    }

    return "Nem fog készülni róla élő adás";
}

export function getRecordingText(concert) {
    if (concert.recordingOption === "recording-link") {
        return "Fog készülni róla felvétel";
    }

    return "Nem fog készülni róla felvétel";
}

export function getMapLink(address) {
    if (!address) {
        return "";
    }

    const trimmedAddress = address.trim();

    if (trimmedAddress.startsWith("https://www.google.com/maps/embed")) {
        return trimmedAddress;
    }

    return "https://www.google.com/maps?q=" + encodeURIComponent(trimmedAddress) + "&output=embed";
}

export function formatDate(dateText) {
    const date = new Date(dateText);

    return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}