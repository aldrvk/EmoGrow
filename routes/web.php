<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

// Tambahan Route Registrasi
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/screening-anak', function () {
    return Inertia::render('ScreeningAnak');
})->name('screening');

Route::get('/screening-anak/result', function () {
    return Inertia::render('ScreeningAnakResult');
})->name('screening.result');

Route::get('/screening-anak/detail', function () {
    return Inertia::render('ScreeningAnakDetail');
})->name('screening.detail');

Route::get('/edukasi', function () {
    return Inertia::render('Edukasi');
})->name('edukasi');

Route::get('/edukasi/detail', function () {
    return Inertia::render('EdukasiDetail');
})->name('edukasi.detail');

Route::get('/aktivitas', function () {
    return Inertia::render('Aktivitas');
})->name('aktivitas');

Route::get('/aktivitas/detail', function () {
    return Inertia::render('AktivitasDetail');
})->name('aktivitas.detail');

Route::get('/monitoring', function () {
    return Inertia::render('Monitoring');
})->name('monitoring');

Route::get('/laporan-evaluasi', function () {
    return Inertia::render('LaporanEvaluasi');
})->name('laporan.evaluasi');

Route::get('/admin', function () {
    return Inertia::render('AdminPanel');
})->name('admin');

Route::get('/login', fn() => inertia('Auth/AuthPage'))->name('login');
   Route::get('/register', fn() => inertia('Auth/AuthPage'))->name('register');