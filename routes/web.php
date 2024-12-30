<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', [ChatController::class, 'index'])->name('dashboard')->middleware('auth', 'verified');

/** Message Routes */
Route::get('/fetch-messages', [ChatController::class, 'fetchMessages'])->name('fetch-messages')->middleware('auth');

require __DIR__.'/auth.php';
