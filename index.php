<?php
$pageTitle = 'Főoldal - N/A';
$pageDescription = 'N/A hivatalos weboldala: pesterzsébeti metal zenekar, amely 2025-ös első fellépésből, 2026-os tagkeresésből és saját dalokból építi a hangzását.';
$activeNav = 'home';
$pathPrefix = '';
$extraCss = [];

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/db.php';

$latestNews = db_get_latest_news(3);
?>

<main class="main-bg">
    <!-- HERO -->
    <section class="hero">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <p class="text-accent fw-bold text-uppercase mb-2">
                        A próbateremtől az első saját dalokig
                    </p>

                    <h1 class="hero-title">
                        N/A
                    </h1>

                    <p class="hero-subtitle lead mt-3">
                        Az N/A egy pesterzsébeti metal banda, amely egy basszusgitáros ötletből,
                        baráti próbákból és tagkeresésből nőtte ki magát. 2026 áprilisában álltunk össze
                        teljes zenekarként, azóta pedig saját dalokon, koncerteken és egyre erősebb közös
                        hangzáson dolgozunk.
                    </p>

                    <div class="mt-4">
                        <a class="btn btn-custom btn-lg me-2" href="koncertek.php">
                            Koncertek
                        </a>

                        <a class="btn btn-custom btn-lg" href="#tortenet">
                            A történetünk
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- TÖRTÉNET -->
    <section class="py-5 section-bg" id="tortenet">
        <div class="container py-4">
            <div class="text-center mb-5">
                <p class="text-accent fw-bold text-uppercase mb-2">
                    Rövid történet
                </p>

                <h2 class="section-title text-accent">
                    Honnan indultunk?
                </h2>

                <p class="text-muted-custom mx-auto" style="max-width: 850px;">
                    Nem egyik napról a másikra lett zenekar: először csak gyakorlások,
                    ötletek és egy kisebb iskolai fellépés volt, aztán 2026 tavaszára
                    összeállt a teljes N/A.
                </p>
            </div>

            <div class="row g-4">
                <div class="col-lg-4">
                    <article class="card card-custom h-100">
                        <div class="card-body">
                            <p class="news-date mb-2">
                                2025
                            </p>

                            <h3 class="card-title text-accent">
                                Az első lépés
                            </h3>

                            <p class="card-text text-muted-custom">
                                A történet Peti basszusgitározásával és Olivérrel közös gyakorlásokkal
                                indult. Az első komolyabb próbatétel egy osztálykarácsonyi fellépés volt,
                                ahol két Tankcsapda-számot játszottak el:
                                az <strong>Egyszerű dal</strong> és az <strong>Örökké tart</strong> című számokat.
                            </p>
                        </div>
                    </article>
                </div>

                <div class="col-lg-4">
                    <article class="card card-custom h-100">
                        <div class="card-body">
                            <p class="news-date mb-2">
                                2026 eleje
                            </p>

                            <h3 class="card-title text-accent">
                                Tagkeresés és első célok
                            </h3>

                            <p class="card-text text-muted-custom">
                                Januárban elindult a tagkeresés gondolata, februárban pedig már
                                plakátokkal keresték az új tagokat. Ekkor jött az első nagyobb felkérés is:
                                a szeptemberi <strong>UMSZKI 100</strong> rendezvény, ami új célt adott a
                                próbáknak és a zenekar építésének.
                            </p>
                        </div>
                    </article>
                </div>

                <div class="col-lg-4">
                    <article class="card card-custom h-100">
                        <div class="card-body">
                            <p class="news-date mb-2">
                                2026. április 25.
                            </p>

                            <h3 class="card-title text-accent">
                                Megalakult a banda
                            </h3>

                            <p class="card-text text-muted-custom">
                                Áprilisban Instagramon keresztül jött az üzenet Opovszki Bencétől,
                                majd a találkozón összeállt a teljes brigád: dob, szólógitár, ének,
                                ritmusgitár és basszus. A közös próba után megszületett a döntés:
                                hivatalosan is elindult az <strong>N/A</strong>.
                            </p>
                        </div>
                    </article>
                </div>
            </div>

            <div class="row g-4 mt-1">
                <div class="col-lg-6">
                    <article class="card card-custom h-100">
                        <div class="card-body">
                            <h3 class="card-title text-accent">
                                Saját dalok
                            </h3>

                            <p class="card-text text-muted-custom">
                                A korai próbák és feldolgozások után egyre fontosabb lett, hogy a banda
                                ne csak mások számait játssza, hanem saját hangzást építsen. Májusban
                                elindult az első közös szám, a <strong>Gyújtsuk Fel</strong> írása is,
                                ami már a teljes zenekar közös irányát kezdte megmutatni.
                            </p>
                        </div>
                    </article>
                </div>

                <div class="col-lg-6">
                    <article class="card card-custom h-100">
                        <div class="card-body">
                            <h3 class="card-title text-accent">
                                Próbaterem és hangzás
                            </h3>

                            <p class="card-text text-muted-custom">
                                Júniusban a zenekar megtalálta a saját főhadiszállását Pesten:
                                egy olyan helyet, ahol hangosan, szabadabban és rendszeresebben tud próbálni.
                                Ez lett az alapja annak, hogy az N/A komolyabban építse saját dalait,
                                koncertprogramját és közös hangzását.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <!-- OLDALAK -->
    <section class="py-5">
        <div class="container py-4">
            <div class="text-center mb-5">
                <h2 class="section-title">
                    Fedezd fel az oldalakat
                </h2>

                <p class="text-muted-custom">
                    Nézd meg, kikből áll a zenekar, hol játszunk legközelebb, milyen képek kerültek fel,
                    és milyen friss hírek történtek a banda körül.
                </p>
            </div>

            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card card-custom page-link-card h-100">
                        <div class="card-body">
                            <h4 class="card-title text-accent">
                                Bandatagok
                            </h4>

                            <p class="card-text text-muted-custom">
                                Ismerd meg, kik állnak a hangszerek és a mikrofon mögött,
                                és milyen szerepet töltenek be a bandában.
                            </p>

                            <a class="btn btn-custom" href="bandatagok.php">
                                Megnézem
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card card-custom page-link-card h-100">
                        <div class="card-body">
                            <h4 class="card-title text-accent">
                                Koncertek
                            </h4>

                            <p class="card-text text-muted-custom">
                                Itt találod a bejelentett fellépéseket,
                                helyszíneket, időpontokat és a fontos koncertinfókat.
                            </p>

                            <a class="btn btn-custom" href="koncertek.php">
                                Koncertek
                            </a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card card-custom page-link-card h-100">
                        <div class="card-body">
                            <h4 class="card-title text-accent">
                                Galéria
                            </h4>

                            <p class="card-text text-muted-custom">
                                Képek próbákról, koncertekről és a banda fontosabb pillanatairól.
                            </p>

                            <a class="btn btn-custom" href="galeria.php">
                                Galéria
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- LEGFRISSEBB HÍREK (SZERVEROLDALI PHP RENDERELÉS) -->
    <section class="py-5 section-bg">
        <div class="container py-4">
            <div class="text-center mb-5">
                <h2 class="section-title text-accent">
                    Legfrissebb hírek
                </h2>

                <p class="text-muted-custom">
                    A legutóbbi bejelentések és frissítések az N/A életéből.
                </p>
            </div>

            <div class="row g-4" id="homeNewsContainer">
                <?php if (empty($latestNews)): ?>
                    <div class="col-12 text-center">
                        <p class="text-muted-custom">Még nincs feltöltött hír.</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($latestNews as $item): ?>
                        <div class="col-lg-4 col-md-6">
                            <article class="card card-custom h-100">
                                <?php if (!empty($item['image'])): ?>
                                    <div class="card-image-box">
                                        <img src="<?= e(normalize_image_url($item['image'])) ?>" alt="<?= e($item['title']) ?>" class="card-img-top news-card-image" loading="lazy" decoding="async" />
                                    </div>
                                <?php endif; ?>
                                <div class="card-body d-flex flex-column">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="badge bg-secondary"><?= e($item['type']) ?></span>
                                        <small class="news-date"><?= format_hungarian_date($item['date']) ?></small>
                                    </div>
                                    <h3 class="card-title text-accent h5"><?= e($item['title']) ?></h3>
                                    <p class="card-text text-muted-custom mt-2 flex-grow-1">
                                        <?= nl2br(e($item['text'])) ?>
                                    </p>
                                </div>
                            </article>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <div class="text-center mt-4">
                <a class="btn btn-custom" href="hirek.php">
                    Összes hír
                </a>
            </div>
        </div>
    </section>

    <!-- HANGULATI SZEKCIÓ -->
    <section class="py-5">
        <div class="container py-5 text-center">
            <h2 class="section-title">
                Hangos. Nyers. Saját.
            </h2>

            <p class="lead text-muted-custom mt-3 mx-auto" style="max-width: 800px;">
                A zenénk alapja a súlyos riff, a feszes ritmus és az, hogy minden próbán egy kicsit
                közelebb kerüljünk a saját hangzásunkhoz. A cél nem csak az, hogy hangosak legyünk,
                hanem hogy minden dalban benne legyen az a nyers energia, amiből a banda elindult.
            </p>

            <div class="mt-4">
                <a class="btn btn-custom btn-lg" href="kapcsolat.php">
                    Kapcsolat
                </a>
            </div>
        </div>
    </section>

    <!-- KAPCSOLAT RÖVIDEN -->
    <section class="py-5 section-bg">
        <div class="container py-4">
            <div class="row align-items-center g-4">
                <div class="col-md-8">
                    <h2 class="section-title text-accent">
                        Fellépés vagy megkeresés?
                    </h2>

                    <p class="text-muted-custom mb-0">
                        Koncert, közös fellépés, iskolai vagy klubos megkeresés miatt
                        a kapcsolat oldalon tudsz írni nekünk.
                    </p>
                </div>

                <div class="col-md-4 text-md-end">
                    <a class="btn btn-custom btn-lg" href="kapcsolat.php">
                        Írj nekünk
                    </a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
