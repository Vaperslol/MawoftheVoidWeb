<?php
// Munkamenet indítása ha még nem fut
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Hibajelzés fejlesztéshez (kikapcsolható)
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Alap útvonalak meghatározása
define('ROOT_DIR', dirname(__DIR__));
define('UPLOADS_DIR', ROOT_DIR . DIRECTORY_SEPARATOR . 'uploads');

if (!is_dir(UPLOADS_DIR)) {
    @mkdir(UPLOADS_DIR, 0777, true);
}

// .env fájl beolvasása ha létezik
$envFile = ROOT_DIR . DIRECTORY_SEPARATOR . '.env';
$envVars = [];
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        if (str_contains($line, '=')) {
            list($key, $val) = explode('=', $line, 2);
            $envVars[trim($key)] = trim($val);
        }
    }
}

// Admin beállítások
define('ADMIN_USERNAME', $envVars['ADMIN_USERNAME'] ?? 'admin');
// Alapértelmezett jelszó: admin123 vagy .env-ben lévő hash
define('ADMIN_PASSWORD_HASH', $envVars['ADMIN_PASSWORD_HASH'] ?? password_hash('admin123', PASSWORD_DEFAULT));

/**
 * Biztonságos HTML kiírás
 */
function e($value): string {
    return htmlspecialchars((string)($value ?? ''), ENT_QUOTES, 'UTF-8');
}

/**
 * Flash üzenet beállítása
 */
function set_flash(string $type, string $message): void {
    $_SESSION['flash'] = [
        'type' => $type, // 'success' vagy 'error'
        'message' => $message
    ];
}

/**
 * Flash üzenet lekérése és törlése
 */
function get_flash(): ?array {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Kép URL normalizálása (régi http://localhost:3000/uploads/... linkek javítása helyire)
 */
function normalize_image_url(?string $url, string $prefix = ''): string {
    if (empty($url)) {
        return '';
    }

    // Ha a régi Express szerver URL-je van benne
    if (preg_match('#^https?://[^/]+/uploads/(.+)$#i', $url, $matches)) {
        return $prefix . 'uploads/' . $matches[1];
    }

    // Ha simán uploads/...
    if (str_starts_with($url, 'uploads/')) {
        return $prefix . $url;
    }

    if (str_starts_with($url, '/uploads/')) {
        return $prefix . ltrim($url, '/');
    }

    if (str_starts_with($url, '../kepek/')) {
        return $prefix . substr($url, 3);
    }

    if (str_starts_with($url, 'kepek/')) {
        return $prefix . $url;
    }

    // Ha külső https:// vagy egyéb
    return $url;
}

/**
 * Magyar dátum formázása
 */
function format_hungarian_date(?string $dateStr): string {
    if (empty($dateStr)) return 'Nincs megadva';
    $time = strtotime($dateStr);
    if ($time === false) return e($dateStr);
    return date('Y. m. d.', $time);
}

/**
 * Koncert szöveges leíró segédfüggvények
 */
function get_status_text(?string $status): string {
    $statuses = [
        'open' => 'Látogatható',
        'private' => 'Privát',
        'not-open' => 'Nem látogatható'
    ];
    return $statuses[$status] ?? $status ?? 'Nincs megadva';
}

function get_ticket_text(?string $option): string {
    $options = [
        'no-ticket' => 'Nem lehet jegyet venni',
        'ticket-link' => 'Jegyvásárlás linkkel'
    ];
    return $options[$option] ?? $option ?? 'Nincs megadva';
}

function get_stream_text(?string $option): string {
    $options = [
        'no-stream' => 'Nem fog készülni róla élő adás',
        'stream-link' => 'Fog készülni róla élő adás'
    ];
    return $options[$option] ?? $option ?? 'Nincs megadva';
}

function get_recording_text(?string $option): string {
    $options = [
        'no-recording' => 'Nem fog készülni róla felvétel',
        'recording-link' => 'Fog készülni róla felvétel'
    ];
    return $options[$option] ?? $option ?? 'Nincs megadva';
}

/**
 * Google Maps beágyazási URL generálása
 */
function make_map_embed_url(array $concert): string {
    $query = $concert['address'] ?? $concert['place'] ?? '';
    if (empty(trim($query))) {
        return '';
    }
    return 'https://www.google.com/maps?q=' . urlencode($query) . '&output=embed';
}

/**
 * Színkezelő segédfüggvények a dinamikus színtémához
 */
function hex_to_rgb(string $hex): array {
    $hex = ltrim($hex, '#');
    if (strlen($hex) === 3) {
        $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
    }
    if (strlen($hex) !== 6) {
        return [255, 255, 255];
    }
    return [
        hexdec(substr($hex, 0, 2)),
        hexdec(substr($hex, 2, 2)),
        hexdec(substr($hex, 4, 2))
    ];
}

function get_contrast_color(string $hex): string {
    [$r, $g, $b] = hex_to_rgb($hex);
    $luminance = (0.299 * $r + 0.587 * $g + 0.114 * $b) / 255;
    return $luminance > 0.55 ? '#060607' : '#ffffff';
}

function adjust_hex_brightness(string $hex, int $percent): string {
    [$r, $g, $b] = hex_to_rgb($hex);
    $r = max(0, min(255, (int)($r + ($percent / 100 * 255))));
    $g = max(0, min(255, (int)($g + ($percent / 100 * 255))));
    $b = max(0, min(255, (int)($b + ($percent / 100 * 255))));
    return sprintf('#%02x%02x%02x', $r, $g, $b);
}
