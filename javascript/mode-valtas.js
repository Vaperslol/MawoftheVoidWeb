let lightmode = localStorage.getItem("lightmode");
const kapcsolo = document.getElementById("kapcsolo");

const bekapcsLightmode = () => {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "bekapcsolt");
};

const kikapcsLightmode = () => {
    document.body.classList.remove("lightmode");
    localStorage.removeItem("lightmode");
};

if (lightmode === "bekapcsolt") {
    bekapcsLightmode();
}

if (kapcsolo) {
    kapcsolo.addEventListener("click", () => {
        lightmode = localStorage.getItem("lightmode");

        if (lightmode !== "bekapcsolt") {
            bekapcsLightmode();
        } else {
            kikapcsLightmode();
        }
    });
}
