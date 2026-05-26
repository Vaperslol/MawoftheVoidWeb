import {
    getConcerts,
    sortConcertsByDate,
    formatConcertDate
} from "./concert-api.js";

const concertContainer = document.getElementById("concertContainer");

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

function makeMapEmbedUrl(concert) {
    const query = concert.address || concert.place || concert.location;

    if (!query) {
        return "";
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function getCountdown(concert) {
    if (!concert.date) {
        return "Nincs dátum megadva.";
    }

    const dateText = `${concert.date}T${concert.time || "00:00"}`;
    const concertDate = new Date(dateText);
    const now = new Date();

    const difference = concertDate - now;

    if (difference <= 0) {
        return "A koncert dátuma már elmúlt.";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `${days} nap, ${hours} óra, ${minutes} perc`;
}

async function renderConcerts() {
    try {
        const concerts = sortConcertsByDate(await getConcerts());

        concertContainer.innerHTML = "";

        if (concerts.length === 0) {
            concertContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted-custom">
                        Még nincs feltöltött koncert.
                    </p>
                </div>
            `;
            return;
        }

        concerts.forEach(function (concert, index) {
            const card = document.createElement("div");

            if (concerts.length === 1) {
                card.className = "col-xl-5 col-lg-6 col-md-9 mx-auto";
            } else {
                card.className = "col-xl-5 col-lg-6 col-md-9";
            }

            const title = concert.title || concert.name || "Névtelen koncert";
            const place = concert.place || concert.location || "Nincs megadva";
            const address = concert.address || "Nincs megadva";
            const mapUrl = makeMapEmbedUrl(concert);

            const redClass = "";

            card.innerHTML = `
                <article class="concert-card ${redClass} h-100">

                    <div class="concert-card-top">
                        <span class="concert-badge">
                            ${getStatusText(concert.status)}
                        </span>

                        <span class="concert-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>
                    </div>

                    <h3 class="concert-title">
                        ${title}
                    </h3>

                    <div class="concert-divider"></div>

                    <div class="concert-info">
                        <p><strong>Dátum:</strong> ${formatConcertDate(concert.date)}</p>
                        <p><strong>Időpont:</strong> ${concert.time || "Nincs megadva"}</p>
                        <p><strong>Helyszín:</strong> ${place}</p>
                        <p><strong>Pontos cím:</strong> ${address}</p>
                        <p><strong>Belépés:</strong> ${concert.entry || "Nincs megadva"}</p>
                        <p><strong>Jegy:</strong> ${getTicketText(concert.ticketOption)}</p>
                        <p><strong>Élő adás:</strong> ${getStreamText(concert.streamOption)}</p>
                        <p><strong>Felvétel:</strong> ${getRecordingText(concert.recordingOption)}</p>
                    </div>

                    ${mapUrl
                    ? `
                            <div class="concert-map-box">
                                <h4>Térkép:</h4>

                                <iframe
                                    src="${mapUrl}"
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            `
                    : ""
                }

                    <div class="concert-countdown-box">
                        <p>Kezdésig hátra van:</p>
                        <strong>${getCountdown(concert)}</strong>
                    </div>

                </article>
            `;

            concertContainer.appendChild(card);
        });
    } catch (error) {
        concertContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted-custom">
                    Nem sikerült betölteni a koncerteket. Ellenőrizd, hogy fut-e a backend.
                </p>
            </div>
        `;

        console.error(error);
    }
}

renderConcerts();