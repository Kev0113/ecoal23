<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:255',
            'thumbnailURL' => 'required|string|max:255',
            'mediaType' => 'string|max:255',
            'mediaURL' => 'string|max:255',
            'leadStory' => 'required|integer|max:1'
        ]); 
        
        $article = Article::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'thumbnailURL' => $request->input('thumbnailURL'),
            'mediaType' => $request->input('mediaType'),
            'mediaURL' => $request->input('mediaURL'),
            'leadStory' => $request->input('leadStory'),
        ]);

        return $article;

    }
}
