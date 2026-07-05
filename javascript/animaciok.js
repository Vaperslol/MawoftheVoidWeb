// Finom görgetéses animációk - Maw of the Void
// Az elemek nem hirtelen jelennek meg, hanem áttűnéssel és enyhe mozgással úsznak be.

const animatedSelectors = [
    ".main-bg > section",
    ".card-custom",
    ".member-card",
    ".profile-card",
    ".instrument-card",
    ".contact-card",
    ".news-card",
    ".timeline-item",
    ".concert-card",
    ".gallery-card",
    ".admin-card",
    ".member-navigation .btn",
    ".footer-custom"
];

function collectAnimatedElements() {
    const foundElements = new Set();

    animatedSelectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (element) {
            foundElements.add(element);
        });
    });

    return Array.from(foundElements);
}

function prepareAnimations() {
    const elements = collectAnimatedElements();

    elements.forEach(function (element, index) {
        element.classList.add("motv-reveal");

        const groupDelay = Math.min(index % 6, 5) * 70;
        element.style.setProperty("--motv-delay", `${groupDelay}ms`);
    });

    document.body.classList.add("motv-animations-ready");

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("motv-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("motv-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    });

    elements.forEach(function (element) {
        observer.observe(element);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepareAnimations);
} else {
    prepareAnimations();
}
