import {
    getMessages,
    markMessageAsOpened,
    deleteMessage,
    deleteAllMessages,
    sortMessagesByDate,
    formatMessageDate
} from "./messages-api.js";

const adminMessagesList = document.getElementById("adminMessagesList");
const deleteAllMessagesButton = document.getElementById("deleteAllMessagesButton");

function getOpenedText(message) {
    if (message.opened) {
        return "Megnyitva";
    }

    return "Új üzenet";
}

async function renderMessages() {
    if (!adminMessagesList) {
        return;
    }

    try {
        const messages = sortMessagesByDate(await getMessages());

        adminMessagesList.innerHTML = "";

        if (messages.length === 0) {
            adminMessagesList.innerHTML = `
                <p class="text-muted-custom">
                    Még nincs beérkezett üzenet.
                </p>
            `;
            return;
        }

        messages.forEach(function (message) {
            const item = document.createElement("div");
            item.className = "admin-message-item";

            if (!message.opened) {
                item.classList.add("admin-message-new");
            }

            item.innerHTML = `
                <div class="admin-message-top">
                    <div>
                        <p class="admin-message-status">
                            ${getOpenedText(message)}
                        </p>

                        <h4>
                            ${message.title || "Cím nélküli üzenet"}
                        </h4>
                    </div>

                    <p class="admin-message-date">
                        ${formatMessageDate(message.createdAt)}
                    </p>
                </div>

                <div class="admin-message-body">
                    <p>
                        ${message.text || ""}
                    </p>
                </div>

                <div class="admin-message-info">
                    <p>
                        <strong>Elérhetőség:</strong>
                        ${message.contact || "Nincs megadva"}
                    </p>

                    <p>
                        <strong>Helyszín / város:</strong>
                        ${message.location || "Nincs megadva"}
                    </p>
                </div>

                <div class="d-flex flex-wrap gap-2 mt-3">
                    <button class="btn btn-custom btn-sm" data-open-message="${message.id}">
                        Megnyitottnak jelölés
                    </button>

                    <button class="btn btn-custom btn-sm" data-delete-message="${message.id}">
                        Törlés
                    </button>
                </div>
            `;

            adminMessagesList.appendChild(item);
        });
    } catch (error) {
        adminMessagesList.innerHTML = `
            <p class="text-muted-custom">
                Nem sikerült betölteni az üzeneteket. Ellenőrizd, hogy fut-e a backend.
            </p>
        `;

        console.error(error);
    }
}

async function openMessage(id) {
    try {
        await markMessageAsOpened(id);
        await renderMessages();
    } catch (error) {
        alert("Nem sikerült megnyitottnak jelölni az üzenetet.");
        console.error(error);
    }
}

async function removeMessage(id) {
    const sure = confirm("Biztosan törlöd ezt az üzenetet?");

    if (!sure) {
        return;
    }

    try {
        await deleteMessage(id);
        await renderMessages();
    } catch (error) {
        alert("Nem sikerült törölni az üzenetet.");
        console.error(error);
    }
}

if (adminMessagesList) {
    adminMessagesList.addEventListener("click", function (event) {
        const openButton = event.target.closest("[data-open-message]");
        const deleteButton = event.target.closest("[data-delete-message]");

        if (openButton) {
            openMessage(Number(openButton.dataset.openMessage));
            return;
        }

        if (deleteButton) {
            removeMessage(Number(deleteButton.dataset.deleteMessage));
        }
    });
}

if (deleteAllMessagesButton) {
    deleteAllMessagesButton.addEventListener("click", async function () {
        const sure = confirm("Biztosan törlöd az összes üzenetet?");

        if (!sure) {
            return;
        }

        try {
            await deleteAllMessages();
            await renderMessages();
        } catch (error) {
            alert("Nem sikerült törölni az összes üzenetet.");
            console.error(error);
        }
    });
}

renderMessages();