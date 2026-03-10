<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\InstrumentoController;
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

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::get('/categorias', [CategoriaController::class, 'index']);
    Route::get('/categorias/{id}', [CategoriaController::class, 'show']);
    Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy']);
    Route::get('/instrumentos', [InstrumentoController::class, 'index']);
    Route::get('/instrumentos/{id}', [InstrumentoController::class, 'show']);
    Route::delete('/instrumentos/{id}', [InstrumentoController::class, 'destroy']);
});

Route::post('/categorias', [CategoriaController::class, 'store']);
Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
Route::post('/instrumentos', [InstrumentoController::class, 'store']);
Route::put('/instrumentos/{id}', [InstrumentoController::class, 'update']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
