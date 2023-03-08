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

    public function delete($id){
        $projet = Article::findOrFail($id);
        $projet->delete();
    }

    public function edit(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'content' => 'string',
            'mediaURL' => 'string',
            //AFTER mediaURL is OP
            //'mediaURL' => 'file',
        ]);

        if($validator->fails()) {
            return response('problem', 400)
                ->header('Content-Type', 'text/plain');
        }

        $article = Article::findOrFail($id);

        if($request->input('title') == ! NULL ){
            $article->title = $request->input('title');
        }
        if($request->input('content') == ! NULL ) {
            $article->content = $request->input('content');
        }
        if($request->input('mediaURL') == ! NULL ){
            $article->mediaURL = $request->input('mediaURL');
            $article->thumbnailURL = $request->input('mediaURL');
            //AFTER mediaURL is OP
            //$article->mediaURL = $request->file('mediaURL')->hashName();
            //$request->file('avatar')->move("upload", $f); // The file is now in public_html/uploads
        }

        $article->save();

        return $article;
    }

}
