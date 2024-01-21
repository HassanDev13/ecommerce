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
    // Retrieve the authenticated user with relationships
    $user = $request->user()->load(['deliveryPersonnel', 'artisan', 'consumer']);
    //
    // Return the user data along with related models
    return $user;
});
// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });
// sail php artisan make:controller RatingController --api

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('orders', OrderController::class);
    Route::post('/products/upload', [ProductController::class, 'upload']);
    Route::apiResource('OrderProducts', OrderProductController::class);
    Route::post('/orders/assignDeliveryPerson', [OrderController::class, 'assignDeliveryPerson']);
    Route::post('/orders/changeStatus/{id}', [OrderController::class, 'changeStatus']);
    Route::apiResource('deliveryPersonnels', DeliveryPersonnelController::class);
    Route::apiResource('consumers', ConsumerController::class);
    Route::apiResource('ratings', RatingController::class);
    Route::apiResource('users', UserController::class);
    
});


//assignDeliveryPerson

// Route::apiResource('orders', OrderController::class);
// Route::get('/products/index_by_artisan', [ProductController::class, 'index_by_artisan']);
Route::apiResource('artisans', ArtisanController::class);
Route::apiResource('products', ProductController::class);
