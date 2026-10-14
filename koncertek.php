<?php
$pageTitle = 'Koncertek - N/A';
$pageDescription = 'N/A koncertek, bejelentett fellépések, privát események és helyszínek.';
$activeNav = 'koncertek';
$pathPrefix = '';
$extraCss = ['koncertek.css'];

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/db.php';

$upcomingConcerts = db_get_upcoming_concerts();
$pastConcerts = db_get_past_concerts();

function calculate_countdown(string $date, string $time = '23:59'): string {
    $target = strtotime("$date $time");
    if (!$target) return 'Nincs dátum megadva.';
    $diff = $target - time();
    if ($diff <= 0) return 'Ez a koncert már lezajlott.';
    $days = floor($diff / 86400);
    $hours = floor(($diff % 86400) / 3600);
    $minutes = floor(($diff % 3600) / 60);
    return "{$days} nap, {$hours} óra, {$minutes} perc";
}
?>

<main class="main-bg">
    <!-- HERO -->
    <section class="koncertek-hero">
        <div class="container text-center">
            <p class="text-accent fw-bold text-uppercase mb-2">
                Élő zaj, valódi hangerő
            </p>
            <h1 class="koncertek-title">
                Koncertek
            </h1>
            <p class="lead text-muted-custom mt-3 mx-auto" style="max-width: 850px;">
                Itt találod az N/A közelgő fellépéseit, bejelentett koncertjeit, privát eseményeit és minden fontos koncertinfót.
            </p>
        </div>
    </section>

    <!-- KÖZELGŐ KONCERTEK -->
    <section class="py-5">
        <div class="container py-4">
            <div class="text-center mb-5">
                <h2 class="section-title text-accent">
                    Közelgő koncertek
                </h2>
                <p class="text-muted-custom">
                    A koncertek időrendben jelennek meg, a részletek pedig segítenek követni, mikor és hol lehet minket élőben elérni.
                </p>
            </div>

            <div class="row g-4 justify-content-center" id="concertContainer">
                <?php if (empty($upcomingConcerts)): ?>
                    <div class="col-12 text-center">
                        <p class="text-muted-custom">Jelenleg nincs bejelentett közelgő koncert.</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($upcomingConcerts as $index => $concert): 
                        $mapUrl = make_map_embed_url($concert);
                    ?>
                        <div class="col-xl-5 col-lg-6 col-md-9">
                            <article class="concert-card h-100">
                                <div class="concert-card-top">
                                    <span class="concert-badge">
                                        <?= e(get_status_text($concert['status'] ?? 'open')) ?>
                                    </span>
                                </div>

                                <h3 class="concert-title">
                                    <?= e($concert['title']) ?>
                                </h3>

                                <div class="concert-divider"></div>

                                <div class="concert-info">
                                    <p><strong>Dátum:</strong> <?= format_hungarian_date($concert['date']) ?></p>
                                    <p><strong>Időpont:</strong> <?= e($concert['time'] ?: 'Nincs megadva') ?></p>
                                    <p><strong>Helyszín:</strong> <?= e($concert['place'] ?: 'Nincs megadva') ?></p>
                                    <p><strong>Pontos cím:</strong> <?= e($concert['address'] ?: 'Nincs megadva') ?></p>
                                    <p><strong>Belépés:</strong> <?= e($concert['entry'] ?: 'Nincs megadva') ?></p>
                                    <p>
                                        <strong>Jegy:</strong> 
                                        <?= e(get_ticket_text($concert['ticketOption'] ?? 'no-ticket')) ?>
                                        <?php if (!empty($concert['ticketLink'])): ?>
                                            - <a href="<?= e($concert['ticketLink']) ?>" target="_blank" rel="noopener noreferrer">Jegyvásárlás link</a>
                                        <?php endif; ?>
                                    </p>
                                    <p>
                                        <strong>Élő adás:</strong> 
                                        <?= e(get_stream_text($concert['streamOption'] ?? 'no-stream')) ?>
                                        <?php if (!empty($concert['streamLink'])): ?>
                                            - <a href="<?= e($concert['streamLink']) ?>" target="_blank" rel="noopener noreferrer">Stream link</a>
                                        <?php endif; ?>
                                    </p>
                                    <p>
                                        <strong>Felvétel:</strong> 
                                        <?= e(get_recording_text($concert['recordingOption'] ?? 'no-recording')) ?>
                                        <?php if (!empty($concert['recordingLink'])): ?>
                                            - <a href="<?= e($concert['recordingLink']) ?>" target="_blank" rel="noopener noreferrer">Videó link</a>
                                        <?php endif; ?>
                                    </p>
                                </div>

                                <?php if (!empty($mapUrl)): ?>
                                    <div class="concert-map-box">
                                        <h4>Térkép:</h4>
                                        <iframe src="<?= e($mapUrl) ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                <?php endif; ?>

                                <div class="concert-countdown-box">
                                    <p>Kezdésig hátra van:</p>
                                    <strong><?= calculate_countdown($concert['date'], $concert['time'] ?? '23:59') ?></strong>
                                </div>
                            </article>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- RÉGI KONCERTEK -->
    <section class="py-5 section-bg" id="regi-koncertek">
        <div class="container py-4">
            <div class="text-center mb-5">
                <h2 class="section-title text-accent">
                    Régi koncertek
                </h2>
                <p class="text-muted-custom">
                    Itt találod azokat a koncerteket és kisebb fellépéseket, amelyek már lezajlottak.
                </p>
            </div>

            <div class="row g-4 justify-content-center" id="pastConcertContainer">
                <?php if (empty($pastConcerts)): ?>
                    <div class="col-12 text-center">
                        <p class="text-muted-custom">Még nincs régi koncert az oldalon.</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($pastConcerts as $index => $concert): 
                        $mapUrl = make_map_embed_url($concert);
                    ?>
                        <div class="col-xl-5 col-lg-6 col-md-9">
                            <article class="concert-card concert-card-past h-100">
                                <div class="concert-card-top">
                                    <span class="concert-badge">
                                        Régi koncert
                                    </span>
                                </div>

                                <h3 class="concert-title">
                                    <?= e($concert['title']) ?>
                                </h3>

                                <div class="concert-divider"></div>

                                <div class="concert-info">
                                    <p><strong>Dátum:</strong> <?= format_hungarian_date($concert['date']) ?></p>
                                    <p><strong>Időpont:</strong> <?= e($concert['time'] ?: 'Nincs megadva') ?></p>
                                    <p><strong>Helyszín:</strong> <?= e($concert['place'] ?: 'Nincs megadva') ?></p>
                                    <p><strong>Pontos cím:</strong> <?= e($concert['address'] ?: 'Nincs megadva') ?></p>
                                    <p><strong>Belépés:</strong> <?= e($concert['entry'] ?: 'Nincs megadva') ?></p>
                                    <?php if (!empty($concert['recordingLink'])): ?>
                                        <p><strong>Felvétel:</strong> <a href="<?= e($concert['recordingLink']) ?>" target="_blank" rel="noopener noreferrer">Megtekintés link</a></p>
                                    <?php endif; ?>
                                </div>

                                <?php if (!empty($mapUrl)): ?>
                                    <div class="concert-map-box">
                                        <h4>Térkép:</h4>
                                        <iframe src="<?= e($mapUrl) ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                <?php endif; ?>

                                <div class="concert-countdown-box">
                                    <p>Státusz:</p>
                                    <strong>Ez a koncert már lezajlott.</strong>
                                </div>
                            </article>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- JELZÉSEK PANEL -->
    <section class="py-5 section-bg">
        <div class="container py-4">
            <div class="row align-items-center g-5">
                <div class="col-lg-6">
                    <h2 class="section-title text-accent">
                        Mit jelentenek a jelzések?
                    </h2>
                    <p class="text-muted-custom mt-3">
                        A koncertkártyákon külön jelöljük, hogy az adott esemény nyilvános, privát vagy személyesen nem látogatható.
                    </p>
                    <p class="text-muted-custom">
                        A térképes rész segít megtalálni a helyszínt, a jegy, élő adás és felvétel mezők pedig az esemény elérhetőségét mutatják.
                    </p>
                </div>
                <div class="col-lg-6">
                    <div class="concert-panel">
                        <h3>Koncertinfók</h3>
                        <ul>
                            <li><span>Látogatható:</span> nyilvános esemény, amire bárki elmehet</li>
                            <li><span>Privát:</span> csak meghatározott kör vehet részt rajta</li>
                            <li><span>Nem látogatható:</span> személyesen nem lehet bemenni, de adás készülhet róla</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
