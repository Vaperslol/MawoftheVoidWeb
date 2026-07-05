import multer from "multer";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import session from "express-session";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "maw-admin-2026";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "database.json");

const UPLOADS_PATH = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOADS_PATH)) {
    fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    credentials: true
}));

app.use(express.json({ limit: "20mb" }));

app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 3
    }
}));

app.use("/uploads", express.static(UPLOADS_PATH, {
    maxAge: "7d",
    etag: true,
    immutable: true
}));

const defaultDatabase = {
    news: [],
    concerts: [],
    timeline: [],
    messages: [],
    gallery: []
};

function createDatabaseIfMissing() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(defaultDatabase, null, 4), "utf-8");
    }
}

function readDatabase() {
    createDatabaseIfMissing();

    const rawData = fs.readFileSync(DB_PATH, "utf-8");
    const database = JSON.parse(rawData);

    return {
        ...defaultDatabase,
        ...database
    };
}

function writeDatabase(database) {
    fs.writeFileSync(DB_PATH, JSON.stringify(database, null, 4), "utf-8");
}

function getNextId(items) {
    if (items.length === 0) {
        return 1;
    }

    return Math.max(...items.map(function (item) {
        return Number(item.id);
    })) + 1;
}

function checkAdmin(req, res, next) {
    if (req.session && req.session.isAdmin === true) {
        next();
        return;
    }

    return res.status(401).json({
        error: "Nincs bejelentkezett admin felhasználó."
    });
}

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, UPLOADS_PATH);
    },

    filename: function (request, file, callback) {
        const originalName = file.originalname
            .toLowerCase()
            .replace(/[^a-z0-9.\-_]/g, "-");

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${originalName}`;

        callback(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: function (request, file, callback) {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else {
            callback(new Error("Csak képfájl tölthető fel."));
        }
    }
});

function getPublicUploadUrl(request, filename) {
    return `${request.protocol}://${request.get("host")}/uploads/${filename}`;
}

function deleteUploadedFileByUrl(fileUrl) {
    try {
        const url = new URL(fileUrl);
        const filename = path.basename(url.pathname);
        const filePath = path.join(UPLOADS_PATH, filename);

        if (filePath.startsWith(UPLOADS_PATH) && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error("Nem sikerült törölni a képet:", fileUrl);
    }
}

/* ALAP */

app.get("/", function (req, res) {
    res.json({
        message: "Maw of the Void REST API működik."
    });
});

/* ADMIN AUTH */
app.post("/api/admin/login", async function (req, res) {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminPasswordHash) {
        return res.status(500).json({
            error: "Nincs beállítva admin jelszó hash a .env fájlban."
        });
    }

    if (username !== adminUsername) {
        return res.status(401).json({
            error: "Hibás felhasználónév vagy jelszó."
        });
    }

    const passwordIsValid = await bcrypt.compare(password, adminPasswordHash);

    if (!passwordIsValid) {
        return res.status(401).json({
            error: "Hibás felhasználónév vagy jelszó."
        });
    }

    req.session.isAdmin = true;
    req.session.adminUsername = username;

    res.json({
        message: "Sikeres belépés.",
        username: username
    });
});

app.post("/api/admin/logout", function (req, res) {
    req.session.destroy(function () {
        res.clearCookie("connect.sid");

        res.json({
            message: "Sikeres kijelentkezés."
        });
    });
});

app.get("/api/admin/status", function (req, res) {
    res.json({
        loggedIn: !!(req.session && req.session.isAdmin === true),
        username: req.session ? req.session.adminUsername || null : null
    });
});

/* HÍREK */

app.get("/api/news", function (req, res) {
    const database = readDatabase();

    const news = database.news.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    res.json(news);
});

app.get("/api/news/:id", function (req, res) {
    const database = readDatabase();

    const newsItem = database.news.find(function (item) {
        return Number(item.id) === Number(req.params.id);
    });

    if (!newsItem) {
        return res.status(404).json({
            error: "A hír nem található."
        });
    }

    res.json(newsItem);
});

app.post("/api/news", checkAdmin, function (req, res) {
    const database = readDatabase();

    const { title, date, type, text, image } = req.body;

    if (!title || !date || !type || !text) {
        return res.status(400).json({
            error: "Hiányzó hír adat."
        });
    }

    const newNews = {
        id: getNextId(database.news),
        title,
        date,
        type,
        text,
        image: image || ""
    };

    database.news.push(newNews);
    writeDatabase(database);

    res.status(201).json(newNews);
});

app.put("/api/news/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const index = database.news.findIndex(function (item) {
        return Number(item.id) === Number(req.params.id);
    });

    if (index === -1) {
        return res.status(404).json({
            error: "A hír nem található."
        });
    }

    database.news[index] = {
        ...database.news[index],
        ...req.body,
        id: Number(req.params.id)
    };

    writeDatabase(database);

    res.json({
        message: "Hír frissítve.",
        news: database.news[index]
    });
});

app.delete("/api/news/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const oldLength = database.news.length;

    database.news = database.news.filter(function (item) {
        return Number(item.id) !== Number(req.params.id);
    });

    if (database.news.length === oldLength) {
        return res.status(404).json({
            error: "A hír nem található."
        });
    }

    writeDatabase(database);

    res.json({
        message: "Hír törölve."
    });
});


/* KONCERTEK */

app.get("/api/concerts", function (req, res) {
    const database = readDatabase();

    const concerts = database.concerts.sort(function (a, b) {
        return new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time);
    });

    res.json(concerts);
});

app.post("/api/concerts", checkAdmin, function (req, res) {
    const database = readDatabase();

    const concert = req.body;

    if (!concert.title || !concert.date || !concert.time || !concert.place) {
        return res.status(400).json({
            error: "Hiányzó koncert adat."
        });
    }

    const newConcert = {
        id: getNextId(database.concerts),
        title: concert.title,
        date: concert.date,
        time: concert.time,
        place: concert.place,
        address: concert.address || "",
        status: concert.status || "open",
        entry: concert.entry || "",
        ticketOption: concert.ticketOption || "no-ticket",
        ticketLink: concert.ticketLink || "",
        streamOption: concert.streamOption || "no-stream",
        streamLink: concert.streamLink || "",
        recordingOption: concert.recordingOption || "no-recording",
        recordingLink: concert.recordingLink || ""
    };

    database.concerts.push(newConcert);
    writeDatabase(database);

    res.status(201).json(newConcert);
});

app.put("/api/concerts/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const index = database.concerts.findIndex(function (item) {
        return Number(item.id) === Number(req.params.id);
    });

    if (index === -1) {
        return res.status(404).json({
            error: "A koncert nem található."
        });
    }

    database.concerts[index] = {
        ...database.concerts[index],
        ...req.body,
        id: Number(req.params.id)
    };

    writeDatabase(database);

    res.json({
        message: "Koncert frissítve.",
        concert: database.concerts[index]
    });
});

app.delete("/api/concerts/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const oldLength = database.concerts.length;

    database.concerts = database.concerts.filter(function (item) {
        return Number(item.id) !== Number(req.params.id);
    });

    if (database.concerts.length === oldLength) {
        return res.status(404).json({
            error: "A koncert nem található."
        });
    }

    writeDatabase(database);

    res.json({
        message: "Koncert törölve."
    });
});


/* TIMELINE */

app.get("/api/timeline", function (req, res) {
    const database = readDatabase();

    const timeline = database.timeline.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    res.json(timeline);
});

app.post("/api/timeline", checkAdmin, function (req, res) {
    const database = readDatabase();

    const { title, date, type, text, image } = req.body;

    if (!title || !date || !type || !text) {
        return res.status(400).json({
            error: "Hiányzó timeline adat."
        });
    }

    const newTimelineEvent = {
        id: getNextId(database.timeline),
        title,
        date,
        type,
        text,
        image: image || ""
    };

    database.timeline.push(newTimelineEvent);
    writeDatabase(database);

    res.status(201).json(newTimelineEvent);
});

app.put("/api/timeline/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const index = database.timeline.findIndex(function (item) {
        return Number(item.id) === Number(req.params.id);
    });

    if (index === -1) {
        return res.status(404).json({
            error: "A timeline esemény nem található."
        });
    }

    database.timeline[index] = {
        ...database.timeline[index],
        ...req.body,
        id: Number(req.params.id)
    };

    writeDatabase(database);

    res.json({
        message: "Timeline esemény frissítve.",
        timelineEvent: database.timeline[index]
    });
});

app.delete("/api/timeline/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const oldLength = database.timeline.length;

    database.timeline = database.timeline.filter(function (item) {
        return Number(item.id) !== Number(req.params.id);
    });

    if (database.timeline.length === oldLength) {
        return res.status(404).json({
            error: "A timeline esemény nem található."
        });
    }

    writeDatabase(database);

    res.json({
        message: "Timeline esemény törölve."
    });
});


/* ÜZENETEK */

app.post("/api/messages", function (req, res) {
    const database = readDatabase();

    const { title, contact, location, text } = req.body;

    if (!title || !contact || !text) {
        return res.status(400).json({
            error: "Hiányzó üzenet adat."
        });
    }

    const newMessage = {
        id: getNextId(database.messages),
        title,
        contact,
        location: location || "",
        text,
        createdAt: new Date().toISOString(),
        opened: false
    };

    database.messages.push(newMessage);
    writeDatabase(database);

    res.status(201).json(newMessage);
});

app.get("/api/messages", checkAdmin, function (req, res) {
    const database = readDatabase();

    const messages = database.messages.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(messages);
});

app.put("/api/messages/:id/opened", checkAdmin, function (req, res) {
    const database = readDatabase();

    const message = database.messages.find(function (item) {
        return Number(item.id) === Number(req.params.id);
    });

    if (!message) {
        return res.status(404).json({
            error: "Az üzenet nem található."
        });
    }

    message.opened = true;

    writeDatabase(database);

    res.json({
        message: "Üzenet megnyitva."
    });
});

app.delete("/api/messages/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    const oldLength = database.messages.length;

    database.messages = database.messages.filter(function (item) {
        return Number(item.id) !== Number(req.params.id);
    });

    if (database.messages.length === oldLength) {
        return res.status(404).json({
            error: "Az üzenet nem található."
        });
    }

    writeDatabase(database);

    res.json({
        message: "Üzenet törölve."
    });
});

app.delete("/api/messages", checkAdmin, function (req, res) {
    const database = readDatabase();

    database.messages = [];

    writeDatabase(database);

    res.json({
        message: "Összes üzenet törölve."
    });
});

/* KÉPFELTÖLTÉS */

app.post("/api/uploads", checkAdmin, upload.array("images", 30), function (req, res) {
    const uploadedImages = req.files.map(function (file) {
        return getPublicUploadUrl(req, file.filename);
    });

    res.json({
        images: uploadedImages
    });
});


/* GALÉRIA */

app.get("/api/gallery", function (req, res) {
    const database = readDatabase();

    res.json(database.gallery || []);
});

app.get("/api/gallery/:id", function (req, res) {
    const database = readDatabase();
    const id = Number(req.params.id);

    const album = (database.gallery || []).find(function (item) {
        return Number(item.id) === id;
    });

    if (!album) {
        return res.status(404).json({
            error: "Az album nem található."
        });
    }

    res.json(album);
});

app.post("/api/gallery", checkAdmin, function (req, res) {
    const database = readDatabase();

    if (!database.gallery) {
        database.gallery = [];
    }

    const { title, date, description, images } = req.body;

    if (!title || !date || !description) {
        return res.status(400).json({
            error: "Hiányzó galéria adat."
        });
    }

    const newAlbum = {
        id: getNextId(database.gallery),
        title,
        date,
        description,
        images: images || [],
        createdAt: new Date().toISOString()
    };

    database.gallery.push(newAlbum);
    writeDatabase(database);

    res.status(201).json(newAlbum);
});

app.put("/api/gallery/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    if (!database.gallery) {
        database.gallery = [];
    }

    const id = Number(req.params.id);

    const index = database.gallery.findIndex(function (item) {
        return Number(item.id) === id;
    });

    if (index === -1) {
        return res.status(404).json({
            error: "Az album nem található."
        });
    }

    const oldAlbum = database.gallery[index];
    const newImages = req.body.images || [];

    if (Array.isArray(oldAlbum.images)) {
        oldAlbum.images.forEach(function (oldImage) {
            if (!newImages.includes(oldImage)) {
                deleteUploadedFileByUrl(oldImage);
            }
        });
    }

    database.gallery[index] = {
        ...oldAlbum,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        images: newImages,
        updatedAt: new Date().toISOString()
    };

    writeDatabase(database);

    res.json(database.gallery[index]);
});

app.delete("/api/gallery/:id", checkAdmin, function (req, res) {
    const database = readDatabase();

    if (!database.gallery) {
        database.gallery = [];
    }

    const id = Number(req.params.id);

    const album = database.gallery.find(function (item) {
        return Number(item.id) === id;
    });

    if (!album) {
        return res.status(404).json({
            error: "Az album nem található."
        });
    }

    if (Array.isArray(album.images)) {
        album.images.forEach(function (imageUrl) {
            deleteUploadedFileByUrl(imageUrl);
        });
    }

    database.gallery = database.gallery.filter(function (item) {
        return Number(item.id) !== id;
    });

    writeDatabase(database);

    res.json({
        message: "Album törölve."
    });
});

app.use(function (error, req, res, next) {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            error: "Feltöltési hiba.",
            message: error.message
        });
    }

    if (error) {
        return res.status(400).json({
            error: error.message || "Ismeretlen hiba történt."
        });
    }

    next();
});

app.listen(PORT, function () {
    console.log(`Maw of the Void API fut: http://localhost:${PORT}`);
});