import {
    getConcerts,
    sortConcertsByDate,
    getStatusText,
    getTicketText,
    getStreamText,
    getRecordingText,
    getMapLink,
    formatDate
} from "./concert-storage.js";

const concertContainer = document.getElementById("concertContainer");

function makeLink(text, link) {
    if (!link) {
        return text;
    }

    return `<a href="${link}" target="_blank" class="concert-link">${text}</a>`;
}

function renderConcerts() {
    const concerts = sortConcertsByDate(getConcerts());

    concertContainer.innerHTML = "";

    concerts.forEach(function (concert, index) {
        const concertDateTime = concert.date + "T" + concert.time;

        const ticketText = getTicketText(concert);
        const streamText = getStreamText(concert);
        const recordingText = getRecordingText(concert);

        const card = document.createElement("div");
        card.className = "col-xl-4 col-md-6";

        card.innerHTML = `
            <article class="concert-card" data-date="${concertDateTime}">
                <div class="concert-top">
                    <p class="concert-status ${concert.status}">
                        ${getStatusText(concert.status)}
                    </p>

                    <p class="concert-number">
                        ${String(index + 1).padStart(2, "0")}
                    </p>
                </div>

                <h2 class="concert-name">
                    ${concert.name}
                </h2>

                <div class="concert-info">
                    <p><span>Dátum:</span> ${formatDate(concert.date)}</p>
                    <p><span>Időpont:</span> ${concert.time}</p>
                    <p><span>Helyszín:</span> ${concert.place}</p>
                    <p><span>Pontos cím:</span> ${concert.address}</p>
                    <p><span>Belépés:</span> ${concert.entry}</p>
                    <p><span>Jegy:</span> ${makeLink(ticketText, concert.ticketLink)}</p>
                    <p><span>Élő adás:</span> ${makeLink(streamText, concert.streamLink)}</p>
                    <p><span>Felvétel:</span> ${makeLink(recordingText, concert.recordingLink)}</p>
                </div>

                <div class="map-box">
                    <p class="map-label">Térkép:</p>

                    <iframe
                        src="${getMapLink(concert.address)}"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        allowfullscreen>
                    </iframe>
                </div>

                <div class="countdown-box">
                    <p class="countdown-label">Kezdésig hátra van:</p>
                    <div class="countdown">Betöltés...</div>
                </div>
            </article>
        `;

        concertContainer.appendChild(card);
    });

    updateCountdowns();
}

function updateCountdowns() {
    const concertCards = document.querySelectorAll(".concert-card");
    const now = new Date();

    concertCards.forEach(function (card) {
        const dateValue = card.dataset.date;
        const concertDate = new Date(dateValue);
        const countdownElement = card.querySelector(".countdown");

        if (!dateValue || isNaN(concertDate)) {
            countdownElement.textContent = "Pontos időpont bejelentésre vár";
            return;
        }

        const distance = concertDate - now;

        if (distance <= 0) {
            countdownElement.textContent = "A koncert már elkezdődött vagy lezajlott.";
            card.classList.add("concert-ended");
            return;
        }

        const secondsTotal = Math.floor(distance / 1000);

        const days = Math.floor(secondsTotal / (60 * 60 * 24));
        const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
        const seconds = secondsTotal % 60;

        countdownElement.textContent =
            days + " nap, " +
            hours + " óra, " +
            minutes + " perc, " +
            seconds + " mp";
    });
}

renderConcerts();
setInterval(updateCountdowns, 1000);