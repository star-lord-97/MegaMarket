<?php

use App\Http\Controllers\DeliverOrderController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserOrdersController;
use Illuminate\Support\Facades\Route;

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

// login a user and return an access token or an error message
Route::post('/login', [LoginController::class, 'login']);

// submit a new user to the database and return 200 status code or an error message
Route::post('/register', RegisterController::class);

// return all the products in the database paginated by 10s
Route::get('products', [ProductController::class, 'index']);

// return a specific product's data
Route::get('/products/{product:id}', [ProductController::class, 'show']);

Route::middleware('auth:api')->group(function () {
    // logout a user and return nothing
    Route::post('/logout', [LoginController::class, 'logout']);

    // return all the users in the database paginated by 10s (-----ADMIN-----)
    Route::get('/users', [UserController::class, 'index']);

    // return a specific user's data (-----ADMIN-----) || return user's data after validating the personal access token (-----AUTHENTICATED USER-----)
    Route::get('/user', [UserController::class, 'show']);

    // return a specific user's orders (-----ADMIN----- || -----AUTHENTICATED USER-----)
    Route::get('/users/{user:id}/orders', UserOrdersController::class);

    // submit a new product row to the database and return 200 status code or an error message (-----ADMIN-----)
    Route::post('/products', [ProductController::class, 'store']);

    // update an existing product row on the database and return 200 status code or an error message (-----ADMIN-----)
    Route::patch('/products/{product:id}', [ProductController::class, 'update']);

    // destroy an existing product row and return 200 status code or an error message (-----ADMIN-----)
    Route::delete('/products/{product:id}', [ProductController::class, 'destroy']);

    // return all the orders in the database paginated by 10s (-----ADMIN-----)
    Route::get('orders', [OrderController::class, 'index']);

    // return a specific order (-----ADMIN----- || -----AUTHENTICATED USER-----)
    Route::get('/orders/{order:id}', [OrderController::class, 'show']);

    // submit a new order row to the database and return 200 status code or an error message (-----AUTHENTICATED USER-----)
    Route::post('/orders', [OrderController::class, 'store']);

    // update an existing order row on the database and return 200 status code or an error message (-----AUTHENTICATED USER-----)
    Route::patch('/orders/{order:id}', [OrderController::class, 'update']);

    // destroy an existing order row and return 200 status code or an error message (-----AUTHENTICATED USER-----)
    Route::delete('/orders/{order:id}', [OrderController::class, 'destroy']);

    // update an existing order row to mark it as delivered and return status code 200 or an error message (-----ADMIN-----)
    Route::patch('/orders/{order:id}/deliver', DeliverOrderController::class);
});
