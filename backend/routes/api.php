<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\{
    AuthController,
    UserController
};
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// api/v1
Route::group([
    'prefix' => 'v1',
    'namespace' => 'App\Http\Controllers\Api\V1',
    'middleware' => 'auth:sanctum'
], function () {

    Route::withoutMiddleware('auth:sanctum')->group(function () {
        Route::post('login', [AuthController::class, 'signIn']);
        Route::post('register', [AuthController::class, 'signUp']);
    });
    Route::apiResource('/users', UserController::class);
    Route::get('/get_authenticated_user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('/logout', [AuthController::class, 'signOut']);
});
