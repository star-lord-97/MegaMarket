<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
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

/* login/register routes */
// login a user and return an access token or an error message
Route::post('/login', [LoginController::class, 'login']);
// submit a new user to the database and return 200 status code or an error message
Route::post('/register', RegisterController::class);



/* products routes */
// return all the products in the database paginated by 10s
Route::get('products', [ProductController::class, 'index']);
// return a specific product's data
Route::get('/products/{product:id}', [ProductController::class, 'show']);



// return a specific category's products
Route::get('/categories', [CategoryController::class, 'index']);
// return a specific category's products
Route::get('/categories/{category}', [CategoryController::class, 'show']);



Route::middleware('auth:api')->group(function () {
    /* logout route */
    // logout a user and return nothing
    Route::post('/logout', [LoginController::class, 'logout']);



    // return the authenticated user's data after validating the personal access token (-----AUTHENTICATED USER-----)
    Route::get('/user', [UserController::class, 'show']);



    /* cart routes */
    // return a user's cart
    Route::get('/cart', [CartController::class, 'show']);
    // add to a user's cart
    Route::post('/cart', [CartController::class, 'store']);
    // remove from a user's cart
    Route::delete('/cart/{cart:id}', [CartController::class, 'destroy']);



    /* wishlist routes */
    // return a user's wishlist
    Route::get('/wishlist', [WishlistController::class, 'show']);
    // add to a user's wishlist
    Route::post('/wishlist', [WishlistController::class, 'store']);
    // remove from a user's cart
    Route::delete('/wishlist/{wishlist:id}', [WishlistController::class, 'destroy']);
});
