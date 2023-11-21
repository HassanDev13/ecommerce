<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RatingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
      // sail php artisan make:controller RatingController --api
Route::apiResource('ratings', RatingController::class);

Route::apiResource('users', UserController::class);


use App\Http\Controllers\ArtisanController;

Route::apiResource('artisans', ArtisanController::class);


use App\Http\Controllers\DeliveryPersonnelController;

Route::apiResource('deliveryPersonnels', DeliveryPersonnelController::class);


use App\Http\Controllers\ConsumerController;

Route::apiResource('consumers', ConsumerController::class);


use App\Http\Controllers\OrderController;

Route::apiResource('orders', OrderController::class);


use App\Http\Controllers\ProductController;

Route::apiResource('products', ProductController::class);


use App\Http\Controllers\OrderProductController;

Route::apiResource('OrderProducts', OrderProductController::class);
