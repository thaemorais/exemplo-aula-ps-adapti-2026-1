<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InstrumentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::get('/category', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);

Route::get('/instruments', [InstrumentController::class, 'index']);
Route::get('/instruments/{id}', [InstrumentController::class, 'show']);

Route::post('instruments/{id}/buy', [InstrumentController::class, 'buy']);

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/category', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('/instruments', InstrumentController::class)->except(['index', 'show']);
});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
