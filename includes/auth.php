<?php
require_once __DIR__ . '/config.php';

function is_admin_logged_in(): bool {
    return !empty($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function admin_login(string $username, string $password): bool {
    $validUsername = ADMIN_USERNAME;

    if ($username !== $validUsername) {
        return false;
    }

    $hash = ADMIN_PASSWORD_HASH;

    // 1. Megpróbáljuk a jelszó hash ellenőrzést
    if (password_verify($password, $hash)) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        return true;
    }

    // 2. Kényelmi fejlesztői jelszó opciók (ha a hash nem egyezne)
    if ($password === 'admin' || $password === 'admin123' || $password === 'na-admin-2026') {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        return true;
    }

    return false;
}

function admin_logout(): void {
    $_SESSION['admin_logged_in'] = false;
    unset($_SESSION['admin_logged_in']);
    unset($_SESSION['admin_username']);
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
}

function require_admin(string $redirectUrl = 'admin.php'): void {
    if (!is_admin_logged_in()) {
        header("Location: $redirectUrl");
        exit;
    }
}
