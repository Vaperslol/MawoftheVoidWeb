<?php
$pageTitle = 'Bandatagok & Hangszerek - N/A';
$pageDescription = 'Ismerd meg az N/A zenekar tagjait, hangszereit, gitárjait, pedáljait, effektjeit és teljes felszerelését.';
$activeNav = 'bandatagok';
$pathPrefix = '';
$extraCss = ['bandatagok.css'];

require_once __DIR__ . '/includes/header.php';
?>

<main class="main-bg">
    <!-- HERO -->
    <section class="bandatagok-hero">
        <div class="container text-center">
            <p class="text-accent fw-bold text-uppercase mb-2 tracking-wide">
                Felszerelés, hangszerek és pedálok
            </p>
            <h1 class="bandatagok-title">
                Bandatagok & Gear
            </h1>
            <p class="lead text-muted-custom mt-3 mx-auto bandatagok-leiras">
                Az <strong>N/A</strong> hangzása mögött álló tagok és teljes arzenáljuk: gitárok, basszusok, dobfelszerelés, effektek és pedálok egyetlen összefoglaló felületen.
            </p>

            <!-- Gyors ugró linkek a tagokhoz -->
            <div class="d-flex flex-wrap justify-content-center gap-2 mt-4 gear-jump-nav">
                <a class="btn btn-outline-custom btn-sm" href="#tamas"><svg class="line-icon" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg> Tamás – Ének</a>
                <a class="btn btn-outline-custom btn-sm" href="#ipolyi-bence"><svg class="line-icon" viewBox="0 0 24 24"><path d="m20.5 3.5-3 3"/><path d="m15.5 8.5 2-2"/><path d="M9 13a4.5 4.5 0 0 0-6.36 0 4.5 4.5 0 0 0 0 6.36 4.5 4.5 0 0 0 6.36 0L17 11.5l-4.5-4.5L9 13Z"/><circle cx="6" cy="18" r="1"/></svg> Bence – Szólógitár / Szinti</a>
                <a class="btn btn-outline-custom btn-sm" href="#oliver"><svg class="line-icon" viewBox="0 0 24 24"><path d="m20.5 3.5-3 3"/><path d="m15.5 8.5 2-2"/><path d="M9 13a4.5 4.5 0 0 0-6.36 0 4.5 4.5 0 0 0 0 6.36 4.5 4.5 0 0 0 6.36 0L17 11.5l-4.5-4.5L9 13Z"/><circle cx="6" cy="18" r="1"/></svg> Olivér – Ritmusgitár</a>
                <a class="btn btn-outline-custom btn-sm" href="#peter"><svg class="line-icon" viewBox="0 0 24 24"><path d="m19 2-3 3"/><path d="m14 7 2-2"/><path d="M9.5 11.5a5 5 0 0 0-7 0 5 5 0 0 0 0 7 5 5 0 0 0 7 0L17 11l-5-5-2.5 5.5Z"/><circle cx="6" cy="15" r="1.5"/></svg> Péter – Basszusgitár</a>
                <a class="btn btn-outline-custom btn-sm" href="#opovszki-bence"><svg class="line-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="7" rx="9" ry="3.5"/><path d="M3 7v10c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7"/><path d="m3 12 6-4"/><path d="m21 12-6-4"/><path d="M9 10.5v8"/><path d="M15 10.5v8"/></svg> Bence – Dobok</a>
            </div>
        </div>
    </section>

    <!-- FELSZERELÉS ÉS TAGOK BEMUTATÁSA -->
    <section class="py-5">
        <div class="container py-4">
            <div class="text-center mb-5">
                <h2 class="section-title text-accent">
                    A zenekar & a hangszerek
                </h2>
                <p class="text-muted-custom max-w-700 mx-auto">
                    Minden hangszert, torzítót, modult és kiegészítőt úgy válogattunk össze, hogy a koncerteken és a próbateremben is a lehető legnyersebb, legfeszesebb metal hangzást hozzuk létre.
                </p>
            </div>

            <div class="gear-showcase-container d-flex flex-column gap-5">

                <!-- 01. GÉMESI TAMÁS - ÉNEK -->
                <article class="gear-card site-animate" id="tamas">
                    <div class="gear-card-header">
                        <div class="gear-card-identity">
                            <span class="badge gear-badge">Vokál & Front</span>
                            <h2 class="gear-member-name">Gémesi Tamás</h2>
                            <p class="gear-role-text text-muted-custom">Ének, dalszövegek, színpadi front</p>
                        </div>
                    </div>

                    <div class="gear-grid">
                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon"><svg class="line-icon" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg></span>
                                <h3>Mikrofon & Vokál Rendszer</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Fő mikrofon</strong>
                                    <span>Shure SM58 / Beta 58A Dinamikus Színpadi Mikrofon</span>
                                </li>
                                <li>
                                    <strong>Monitorozás</strong>
                                    <span>Vezeték nélküli In-Ear fülmonitor rendszer (IEM)</span>
                                </li>
                                <li>
                                    <strong>Vokál lánc</strong>
                                    <span>Élő vokál kompresszor, de-esser és színpadi preamp</span>
                                </li>
                            </ul>
                        </div>

                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon"><svg class="line-icon" viewBox="0 0 24 24"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg></span>
                                <h3>Effektek & Dinamika</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Térmikrofon & Effektek</strong>
                                    <span>Digitális Hall / Plate Reverb & Tap-Tempo Slapback Delay</span>
                                </li>
                                <li>
                                    <strong>Kiegészítők</strong>
                                    <span>Nehéz öntvénytalpas K&M mikrofonállvány, XLR Pro árnyékolt kábelezés</span>
                                </li>
                                <li>
                                    <strong>Hangkarakter</strong>
                                    <span>Nyers és erőteljes énekhangzás, feszes artikuláció agresszív gitárok felett</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

                <!-- 02. IPOLYI BENCE - SZÓLÓGITÁR / SZINTETIZÁTOR -->
                <article class="gear-card site-animate" id="ipolyi-bence">
                    <div class="gear-card-header">
                        <div class="gear-card-identity">
                            <span class="badge gear-badge">Lead Gitár & Szintetizátor</span>
                            <h2 class="gear-member-name">Ipolyi Bence</h2>
                            <p class="gear-role-text text-muted-custom">Szólógitár, atmoszféra, szintetizátor motívumok</p>
                        </div>
                    </div>

                    <div class="gear-grid">
                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon"><svg class="line-icon" viewBox="0 0 24 24"><path d="m20.5 3.5-3 3"/><path d="m15.5 8.5 2-2"/><path d="M9 13a4.5 4.5 0 0 0-6.36 0 4.5 4.5 0 0 0 0 6.36 4.5 4.5 0 0 0 6.36 0L17 11.5l-4.5-4.5L9 13Z"/><circle cx="6" cy="18" r="1"/></svg></span>
                                <h3>Gitárok & Szintetizátor</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Fő gitár</strong>
                                    <span>Modern Metal Superstrat (24 bund, Floyd Rose tremoló rendszer)</span>
                                </li>
                                <li>
                                    <strong>Másodgitár</strong>
                                    <span>Kettős humbucker pickupos tartalék szólógitár</span>
                                </li>
                                <li>
                                    <strong>Szintetizátor & Billentyű</strong>
                                    <span>MIDI kontroller & Analóg modellező szintetizátor sötét atmoszférákhoz</span>
                                </li>
                            </ul>
                        </div>

                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon"><svg class="line-icon" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><rect width="8" height="6" x="8" y="13" rx="1"/></svg></span>
                                <h3>Pedálboard & Effektek</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Overdrive / Booster</strong>
                                    <span>Ibanez Tube Screamer / SD-1 (szólókiemelés és feszes fókusz)</span>
                                </li>
                                <li>
                                    <strong>Téreffektek & Moduláció</strong>
                                    <span>Digitális Stereo Delay, Ambient Reverb & Deep Chorus</span>
                                </li>
                                <li>
                                    <strong>Expresszió</strong>
                                    <span>Optikai Wah pedál és zajszűrő gate lánc</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

                <!-- 03. CSENDES OLIVÉR - RITMUSGITÁR -->
                <article class="gear-card site-animate" id="oliver">
                    <div class="gear-card-header">
                        <div class="gear-card-identity">
                            <span class="badge gear-badge">Ritmusgitár</span>
                            <h2 class="gear-member-name">Csendes Olivér</h2>
                            <p class="gear-role-text text-muted-custom">Feszes riffek, súlyos drop hangolások, ritmikai erő</p>
                        </div>
                    </div>

                    <div class="gear-grid">
                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon"><svg class="line-icon" viewBox="0 0 24 24"><path d="m20.5 3.5-3 3"/><path d="m15.5 8.5 2-2"/><path d="M9 13a4.5 4.5 0 0 0-6.36 0 4.5 4.5 0 0 0 0 6.36 4.5 4.5 0 0 0 6.36 0L17 11.5l-4.5-4.5L9 13Z"/><circle cx="6" cy="18" r="1"/></svg></span>
                                <h3>Gitárok</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Fő gitár</strong>
                                    <span>Jackson JS32 Dinky Arch Top Satin Black</span>
                                </li>
                                <li>
                                    <strong>Másodgitár</strong>
                                    <span>Jackson JS11 Dinky Metallic Blue</span>
                                </li>
                                <li>
                                    <strong>Hangolás & Húrozás</strong>
                                    <span>Drop hangolások, vastag alsó húrkészlet feszes mélyekkel</span>
                                </li>
                            </ul>
                        </div>

                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon"><svg class="line-icon" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><rect width="8" height="6" x="8" y="13" rx="1"/></svg></span>
                                <h3>Pedálok & Riff Hangzás</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Fő torzító / overdrive pedál</strong>
                                    <span>DigiTech DOD Looking Glass Signature Designer Distortion</span>
                                </li>
                                <li>
                                    <strong>Dinamikavezérlés</strong>
                                    <span>Zajzár (Noise Gate) a staccato lefojtásokhoz és csendekhez</span>
                                </li>
                                <li>
                                    <strong>Hangolás & Védelem</strong>
                                    <span>Gyors reakciójú színpadi hangoló pedál (True Bypass)</span>
                                </li>
                                <li>
                                    <strong>Hangzáskarakter</strong>
                                    <span>Feszes ritmusgitár, masszív alsó-közép taréj, sötét tónusú torzítás</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

                <!-- 04. KOVÁCS PÉTER - BASSZUSGITÁR -->
                <article class="gear-card site-animate" id="peter">
                    <div class="gear-card-header">
                        <div class="gear-card-identity">
                            <span class="badge gear-badge">Basszusgitár</span>
                            <h2 class="gear-member-name">Kovács Péter</h2>
                            <p class="gear-role-text text-muted-custom">Mély tartomány, groove, a dalok vastag gerince</p>
                        </div>
                    </div>

                    <div class="gear-grid">
                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon" aria-hidden="true">
                                    <svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m19 2-3 3"/>
                                        <path d="m14 7 2-2"/>
                                        <path d="M9.5 11.5a5 5 0 0 0-7 0 5 5 0 0 0 0 7 5 5 0 0 0 7 0L17 11l-5-5-2.5 5.5Z"/>
                                        <circle cx="6" cy="15" r="1.5"/>
                                    </svg>
                                </span>
                                <h3>Basszusgitárok</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Fő basszusgitár</strong>
                                    <span>Ibanez GSRQA-TKS (Transparent Black Sunburst)</span>
                                </li>
                                <li>
                                    <strong>Másodgitár</strong>
                                    <span>Harley Benton PB-50 Fiesta Red (Vintage Punk Rock Tone)</span>
                                </li>
                                <li>
                                    <strong>Elektronika & Jelszint</strong>
                                    <span>Aktív mélykiemelés és precíz passzív hangszedő-választás</span>
                                </li>
                            </ul>
                        </div>

                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon" aria-hidden="true">
                                    <svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                                        <circle cx="8" cy="8" r="1.5"/>
                                        <circle cx="16" cy="8" r="1.5"/>
                                        <rect width="8" height="6" x="8" y="13" rx="1"/>
                                    </svg>
                                </span>
                                <h3>Pedálok & Basszus Rig</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Fő modulációs pedál</strong>
                                    <span>TC Electronic 3rd Dimension Chorus (vastag, térhatású morajlás)</span>
                                </li>
                                <li>
                                    <strong>Előerősítő / DI Box</strong>
                                    <span>Bass Preamp & Overdrive lánc közvetlen PA és erősítő vonallal</span>
                                </li>
                                <li>
                                    <strong>Dinamikakezelés</strong>
                                    <span>Gyors basszus kompresszor pedál az egyenletes ütőerőhöz</span>
                                </li>
                                <li>
                                    <strong>Hangzásfókusz</strong>
                                    <span>Összeköti a lábdobot a gitárokkal, punk és metal gyökerű súlyos mélyek</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

                <!-- 05. OPOVSZKI BENCE - DOBOK -->
                <article class="gear-card site-animate" id="opovszki-bence">
                    <div class="gear-card-header">
                        <div class="gear-card-identity">
                            <span class="badge gear-badge">Dobok & Ütőhangszerek</span>
                            <h2 class="gear-member-name">Opovszki Bence</h2>
                            <p class="gear-role-text text-muted-custom">Tempó, ritmikai robbanások, dinamika és groove</p>
                        </div>
                    </div>

                    <div class="gear-grid">
                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon" aria-hidden="true">
                                    <svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <ellipse cx="12" cy="7" rx="9" ry="3.5"/>
                                        <path d="M3 7v10c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7"/>
                                        <path d="m3 12 6-4"/>
                                        <path d="m21 12-6-4"/>
                                        <path d="M9 10.5v8"/>
                                        <path d="M15 10.5v8"/>
                                    </svg>
                                </span>
                                <h3>Dobfelszerelés</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Készlet</strong>
                                    <span>Akusztikus Rock / Metal dobtestek (22" lábdob, 14" acél pergő, tamok)</span>
                                </li>
                                <li>
                                    <strong>Lábgép</strong>
                                    <span>Duplázó lábgép (Double Bass Drum Pedal) gyors és precíz duplázásokhoz</span>
                                </li>
                                <li>
                                    <strong>Pergőbőrök & Tompítás</strong>
                                    <span>Kétrétegű olajos bőrök és zselés tompítók a kontrollált lecsengésért</span>
                                </li>
                            </ul>
                        </div>

                        <div class="gear-block">
                            <div class="gear-block-title">
                                <span class="gear-icon" aria-hidden="true">
                                    <svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <ellipse cx="12" cy="12" rx="10" ry="4"/>
                                        <circle cx="12" cy="12" r="1.5"/>
                                        <line x1="12" y1="2" x2="12" y2="4"/>
                                        <line x1="12" y1="20" x2="12" y2="22"/>
                                        <line x1="2" y1="8" x2="4" y2="9"/>
                                        <line x1="20" y1="15" x2="22" y2="16"/>
                                    </svg>
                                </span>
                                <h3>Cintányérok & Hardver</h3>
                            </div>
                            <ul class="gear-item-list">
                                <li>
                                    <strong>Cintányér szett</strong>
                                    <span>14" Heavy Lábcin, 16" & 18" Robusztus Crash cinek, 20" Ping Ride</span>
                                </li>
                                <li>
                                    <strong>Effekt cinek</strong>
                                    <span>18" China és 10" Splash az éles kiállásokhoz</span>
                                </li>
                                <li>
                                    <strong>Monitorozás & Fülvédelem</strong>
                                    <span>Zárt fülmonitor (kattogó / metronóm) és nagy stabilitású K&M állványzat</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>

            </div>
        </div>
    </section>

    <!-- HANGZÁSI ÖSSZEFOGLALÓ -->
    <section class="py-5 section-bg">
        <div class="container py-4">
            <div class="row align-items-center g-5">
                <div class="col-lg-8 mx-auto text-center">
                    <h2 class="section-title text-accent">
                        Együtt szól az egész
                    </h2>
                    <p class="text-muted-custom mt-3">
                        Az <strong>N/A</strong> hangzása nem az egyes eszközök egyedi listájáról szól, hanem arról, ahogy a Jackson riffek találkoznak a DOD torzítóval, az Ibanez basszus a TC Electronic chorusszal és a dobok feszes súlyával.
                    </p>
                    <p class="text-muted-custom">
                        Minden próba célja az, hogy a mikrofontól a lábdobig minden frekvencia a helyére kerüljön a színpadon.
                    </p>

                    <div class="d-flex justify-content-center gap-3 flex-wrap mt-4">
                        <a class="btn btn-custom btn-lg" href="koncertek.php">
                            Következő koncertek
                        </a>
                        <a class="btn btn-outline-custom btn-lg" href="kapcsolat.php">
                            Lépj kapcsolatba velünk
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
