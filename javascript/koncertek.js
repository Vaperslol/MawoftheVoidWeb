import {
    getConcerts,
    sortConcertsByDate,
    formatConcertDate
} from "./concert-api.js";

const concertContainer = document.getElementById("concertContainer");
const pastConcertContainer = document.getElementById("pastConcertContainer");

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

<<<<<<< HEAD
function getConcertDate(concert) {
    if (!concert.date) {
        return null;
    }

    return new Date(`${concert.date}T${concert.time || "23:59"}`);
}

function isPastConcert(concert) {
    const concertDate = getConcertDate(concert);

    if (!concertDate) {
        return false;
    }

    return concertDate < new Date();
}

function getCountdown(concert) {
    const concertDate = getConcertDate(concert);

    if (!concertDate) {
        return "Nincs dátum megadva.";
    }

=======
function getCountdown(concert) {
    if (!concert.date) {
        return "Nincs dátum megadva.";
    }

    const dateText = `${concert.date}T${concert.time || "00:00"}`;
    const concertDate = new Date(dateText);
>>>>>>> 01e64e4067739a61cf25e3a16f8427dff9af2f7b
    const now = new Date();
    const difference = concertDate - now;

<<<<<<< HEAD
    if (difference <= 0) {
        return "Ez a koncert már lezajlott.";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `${days} nap, ${hours} óra, ${minutes} perc`;
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderConcertCard(concert, index, isPast) {
    const card = document.createElement("div");
    card.className = "col-xl-5 col-lg-6 col-md-9";

    const title = concert.title || concert.name || "Névtelen koncert";
    const place = concert.place || concert.location || "Nincs megadva";
    const address = concert.address || "Nincs megadva";
    const mapUrl = makeMapEmbedUrl(concert);

    const pastClass = isPast ? "concert-card-past" : "";
    const badgeText = isPast ? "Régi koncert" : getStatusText(concert.status);

    card.innerHTML = `
        <article class="concert-card ${pastClass} h-100">

            <div class="concert-card-top">
                <span class="concert-badge">
                    ${escapeHtml(badgeText)}
                </span>

                <span class="concert-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <h3 class="concert-title">
                ${escapeHtml(title)}
            </h3>

            <div class="concert-divider"></div>

            <div class="concert-info">
                <p><strong>Dátum:</strong> ${concert.date ? formatConcertDate(concert.date) : "Nincs megadva"}</p>
                <p><strong>Időpont:</strong> ${escapeHtml(concert.time || "Nincs megadva")}</p>
                <p><strong>Helyszín:</strong> ${escapeHtml(place)}</p>
                <p><strong>Pontos cím:</strong> ${escapeHtml(address)}</p>
                <p><strong>Belépés:</strong> ${escapeHtml(concert.entry || "Nincs megadva")}</p>
                <p><strong>Jegy:</strong> ${escapeHtml(getTicketText(concert.ticketOption))}</p>
                <p><strong>Élő adás:</strong> ${escapeHtml(getStreamText(concert.streamOption))}</p>
                <p><strong>Felvétel:</strong> ${escapeHtml(getRecordingText(concert.recordingOption))}</p>
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
                <p>${isPast ? "Státusz:" : "Kezdésig hátra van:"}</p>
                <strong>${escapeHtml(getCountdown(concert))}</strong>
            </div>

        </article>
    `;

    return card;
}

function showEmptyMessage(container, text) {
    container.innerHTML = `
        <div class="col-12 text-center">
            <p class="text-muted-custom">
                ${text}
            </p>
        </div>
    `;
}

async function renderConcerts() {
    try {
        const concerts = await getConcerts();

        const upcomingConcerts = sortConcertsByDate(
            concerts.filter(function (concert) {
                return !isPastConcert(concert);
            })
        );

        const pastConcerts = sortConcertsByDate(
            concerts.filter(function (concert) {
                return isPastConcert(concert);
            })
        ).reverse();

        concertContainer.innerHTML = "";

        if (pastConcertContainer) {
            pastConcertContainer.innerHTML = "";
        }

        if (upcomingConcerts.length === 0) {
            showEmptyMessage(concertContainer, "Jelenleg nincs bejelentett közelgő koncert.");
        } else {
            upcomingConcerts.forEach(function (concert, index) {
                concertContainer.appendChild(renderConcertCard(concert, index, false));
            });
        }

        if (pastConcertContainer) {
            if (pastConcerts.length === 0) {
                showEmptyMessage(pastConcertContainer, "Még nincs régi koncert az oldalon.");
            } else {
                pastConcerts.forEach(function (concert, index) {
                    pastConcertContainer.appendChild(renderConcertCard(concert, index, true));
                });
            }
        }

    } catch (error) {
        showEmptyMessage(concertContainer, "Nem sikerült betölteni a koncerteket. Ellenőrizd, hogy fut-e a backend.");

        if (pastConcertContainer) {
            showEmptyMessage(pastConcertContainer, "A régi koncerteket sem sikerült betölteni.");
        }
=======
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
>>>>>>> 01e64e4067739a61cf25e3a16f8427dff9af2f7b

        console.error(error);
    }
}

renderConcerts();