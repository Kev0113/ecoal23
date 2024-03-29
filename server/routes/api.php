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

//***************************** Add Articles **************************************
    Route::post('/articles/add', [ArticleController::class, 'add']);

//*************************** Delete Articles **************************************
    Route::get('/articles/delete/{id}', [ArticleController::class, 'delete']);

//*************************** Edit Articles****************************************
    Route::post('/articles/edit/{id}', [ArticleController::class, 'edit']);

// Edit profile
    Route::post('/settings/{userId}', [AuthController::class, 'edit']);

// Get user by id
    Route::get('/settings/{userId}', [AuthController::class, 'getUser']);


//Validate
    Route::get('/validate', function(){
        return \App\Models\Article::all()->where('validation', 0);
    });

});

// All Articles
Route::get('/articles', function() {
    return \App\Models\Article::all()->where('validation', 1);
});

// One Articles
Route::get('/articles/{id}', function($id) {
    return \App\Models\Article::FindOrFail($id);
});

// All articles for a tag
Route::get('/tags/{tagId}', function($tagId){
    $articles = DB::table('articles')                 //get all the articles of a tag
        ->join('article_tag', 'articles.id', '=', 'article_tag.article_id')
        ->where('article_tag.tag_id', $tagId)
        ->get();

    return $articles;
});
