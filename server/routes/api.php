<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;

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


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/logout',  [AuthController::class, 'logout']);

    Route::get('/user',  function (Request $request) {
                                return $request->user();
                         });

//***************************** Add Articles ***************************************
    Route::post('/articles/add', [ArticleController::class, 'add']);

//*************************** Delete Articles **************************************
    Route::get('/articles/delete/{id}', [ArticleController::class, 'delete']);

//*************************** Edit Articles****************************************
    Route::post('/articles/edit/{id}', [ArticleController::class, 'edit']);


});

// All Articles
Route::get('/articles', function() {
    return \App\Models\Article::all();
});


// One Articles
Route::get('/articles/{id}', function($id) {
    return \App\Models\Article::FindOrFail($id);
});



