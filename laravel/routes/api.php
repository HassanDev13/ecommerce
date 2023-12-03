<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\ConsumerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DeliveryPersonnelController;
use App\Http\Controllers\OrderProductController;







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
Route::apiResource('artisans', ArtisanController::class);
Route::apiResource('deliveryPersonnels', DeliveryPersonnelController::class);
Route::apiResource('consumers', ConsumerController::class);
Route::apiResource('orders', OrderController::class);
Route::get('/products/index_by_artisan', [ProductController::class, 'index_by_artisan']);
Route::apiResource('products', ProductController::class);
Route::apiResource('OrderProducts', OrderProductController::class);
