# N/A – Teljes PHP Alapú Weboldal

A weboldal **teljes PHP alapú weboldalként** fut natív PHP és SQLite segítségével.

---

## 🚀 Hogyan indítható el?

### 1. lehetőség: Egy kattintásos indítás (Ajánlott)
Kattints duplán a gyökérkönyvtárban lévő **`start_szerver.bat`** fájlra!
- Ez elindítja a helyi PHP szervert a gépen lévő XAMPP PHP-val a `http://localhost:8000` címen, és automatikusan megnyitja a böngészőt.
- Nincs szükség Node.js-re vagy külső függőségekre!

### 2. lehetőség: XAMPP Apache alatt
1. Másold be a projekt mappát a `C:\xampp\htdocs\` könyvtárba.
2. Indítsd el az Apache-ot a XAMPP Control Panelben.
3. Nyisd meg a böngészőben a megfelelő helyi címet.

---

## 📁 Felépítés és mappa-szerkezet

```text
├── index.php                    # Főoldal (zenekar bemutatás, legfrissebb hírek)
├── bandatagok.php               # Bandatagok & Hangszerek (mind az 5 tag gitárjai, pedáljai, dobjai egy helyen)
├── koncertek.php                # Koncertek oldal (közelgő/régi koncertek, térkép, visszaszámláló)
├── hirek.php                    # Hírek oldal (szerveroldali adatbázis renderelés)
├── galeria.php                  # Galéria (albumok, képmegjelenítő)
├── timeline.php                 # Idővonal oldal (események időrendben)
├── kapcsolat.php                # Kapcsolat (natív PHP űrlapfeldolgozás POST-tal)
├── admin.php                    # Teljes körű PHP Admin vezérlőpult és színválasztó
│
├── includes/                    # Újrafelhasználható PHP komponensek
│   ├── config.php               # Alapbeállítások, munkamenet, segédfüggvények
│   ├── header.php               # Közös HTML fejléc, meta tagek és navigáció
│   ├── footer.php               # Közös lábléc és záró elemek
│   ├── db.php                   # SQLite PDO kapcsolat és CRUD adatbázis modellek
│   └── auth.php                 # Admin munkamenet és jogosultságkezelés
│
├── database/                    # Adatbázis mappa
│   ├── database.sqlite          # SQLite adatbázis (hírek, koncertek, galéria, üzenetek, timeline, témabeállítások)
│   └── database.json            # Kezdeti biztonsági mentés / magadatok
│
├── uploads/                     # Feltöltött képek (hírekhez, galériához, timeline-hoz)
├── stiluslapok/                 # CSS stíluslapok
├── kepek/                       # Logók, ikonok, grafikák
├── javascript/                  # Kliensoldali UI scriptek (sötét/világos mód, animációk)
└── start_szerver.bat            # Egy kattintásos PHP webszerver indító
```

---

## 🔐 Admin felület

- **Cím:** `http://localhost:8000/admin.php`
- **Felhasználónév:** `admin`
- **Jelszó:** `admin` vagy `admin123` vagy `na-admin-2026`

Az admin felületen keresztül elérhető funkciók:
1. **Színek és Megjelenés:** központi színválasztóval a teljes weboldal összes kiemelő színe, ragyogása, gombjai és átmenetei módosíthatók, 1-kattintásos gyors témákkal és élő valós idejű előnézettel.
2. **Koncertek:** új koncert hozzáadása, szerkesztése, törlése.
3. **Hírek:** új bejegyzések képfeltöltéssel, szerkesztés, törlés.
4. **Galéria:** új albumok létrehozása, több kép egyidejű feltöltése a szerverre.
5. **Timeline:** új események hozzáadása képfeltöltéssel.
6. **Üzenetek:** a kapcsolat oldalon beküldött látogatói megkeresések olvasása, olvasottként jelölése és törlése.
