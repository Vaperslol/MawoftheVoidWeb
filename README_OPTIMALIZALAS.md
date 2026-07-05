# Maw of the Void – optimalizált csomag

Ez a csomag a feltöltött weboldal első körös optimalizált változata.

## Fontos változtatások

- Javítva a backend indulási hibája: a `console.log("LOGIN:", req.body);` sor kikerült a route-on kívüli helyről.
- A `X-Powered-By` Express fejléc kikapcsolva.
- Az `/uploads` statikus kiszolgálása kapott cache beállításokat.
- A frontend API-cím most helyi fejlesztésnél `http://localhost:3000`, éles oldalon pedig relatív `/api/...` útvonalat használ.
- A Bootstrap két külön JS fájlja helyett egy `bootstrap.bundle.min.js` töltődik be `defer` attribútummal.
- A képek kaptak `loading="lazy"`, `decoding="async"`, valamint ahol megállapítható volt, `width` és `height` attribútumot.
- Az oldalak kaptak `meta description` és `theme-color` tageket.
- A világos mód korábban aktiválódik, így kisebb az esély a sötét/világos villanásra oldalbetöltéskor.
- A főoldali hírrenderelés biztonságosabb lett: nem `innerHTML`-lel írja ki a backendről érkező címet és szöveget.

## Nem került bele a ZIP-be

- `.git/`
- `backend/node_modules/`
- `backend/.env`

A backend függőségeit így kell újratelepíteni:

```bash
cd backend
npm install
npm start
```

## Következő javasolt kör

- A stock képek próbaképeket érdemes saját, optimalizált WebP/AVIF képekre cserélni.
- Érdemes közös navigációs és footer komponenst használni, hogy ne kelljen minden HTML oldalon külön módosítani ugyanazt.
- Éles környezethez kell külön `SESSION_SECRET`, biztonságos CORS, HTTPS és cookie-beállítás.


## 2. körös javítások
- Az összes stock képek stock/próbakép ki lett cserélve helyi, saját placeholder grafikákra a `kepek/helyorzo/` mappában.
- További mobilos finomhangolás történt: kisebb margók, olvashatóbb címsorok, teljes szélességű gombok, kompaktabb fix kapcsoló, jobb kártya- és modal-megjelenés telefonon.
