import { sendMessage } from "./messages-api.js";

const contactForm = document.getElementById("contactForm");

const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const messageContact = document.getElementById("messageContact");
const messageLocation = document.getElementById("messageLocation");

const contactFormMessage = document.getElementById("contactFormMessage");

function showFormMessage(text, type) {
    contactFormMessage.textContent = text;
    contactFormMessage.className = "";

    if (type === "success") {
        contactFormMessage.classList.add("contact-form-message", "success");
    } else {
        contactFormMessage.classList.add("contact-form-message", "error");
    }
}

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const messageItem = {
        title: messageTitle.value.trim(),
        text: messageText.value.trim(),
        contact: messageContact.value.trim(),
        location: messageLocation.value.trim()
    };

    if (!messageItem.title || !messageItem.text || !messageItem.contact) {
        showFormMessage("A cím, az üzenet és az elérhetőség kötelező.", "error");
        return;
    }

    try {
        await sendMessage(messageItem);

        contactForm.reset();

        showFormMessage(
            "Üzenet elküldve. Az admin felületen meg fog jelenni.",
            "success"
        );
    } catch (error) {
        showFormMessage(
            "Nem sikerült elküldeni az üzenetet. Ellenőrizd, hogy fut-e a backend.",
            "error"
        );

        console.error(error);
    }
});