const LOCAL_API_BASE_URL = "http://localhost:3000";

const isLocalFrontend =
    window.location.protocol === "file:" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";

export const API_BASE_URL = isLocalFrontend ? LOCAL_API_BASE_URL : "";
