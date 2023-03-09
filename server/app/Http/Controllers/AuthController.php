<?php

namespace App\Http\Controllers;

use  App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request) {
        $validatedData = $request->validate([
                       'name' => 'required|string|max:255',
                       'email' => 'required|string|email|max:255|unique:users',
                       'password' => 'required|string|min:8',
        ]);

        $user = User::create([
                       'name' => $validatedData['name'],
                       'email' => $validatedData['email'],
                       'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
                        'name' => $user->name,
                        'access_token' => $token,
                        'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request){
        $validatedData = $request->validate([
                'email' => 'required|string|email|max:255',
                'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'name' => $user->name,
               'access_token' => $token,
               'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request) {
        Auth::user()->tokens()->delete();
        return response()->json(["message" => "Logout."]);
    }


    public function edit(Request $request, $userId){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response ("problem", 400)
            ->header('Content-Type', 'text/plain');
        }

        $user = User::findOrFail($userId);
        if($request->input('name') == ! NULL ){
            $user->name = $request->input('name');
        }
        if($request->input('password') == ! NULL ){
            $user->password = Hash::make($request->input('password'));
        }
        $user->save();

        return $user;
    }


    public function getUser($userId){
        $getUser = User::findOrFail($userId);
        return $getUser;
    }

    public function delete(Request $request, $userId){

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response ("problem", 400)
                ->header('Content-Type', 'text/plain');
        }

        $password= $request->input('password');

        $user = User::findOrFail($userId);

        if(password_verify($password, $user["password"])){
            $user->delete();
        }else{
            return "Wrong password";
        }


    }
}
