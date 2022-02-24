<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);
        $token = $user->createToken('registerToken')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }
    public function login(Request $request) {
        if( Auth::attempt([ "name" => $request->name, "password" => $request->password ])) {
 
            $authUser = Auth::user();
            $success[ "token" ] = $authUser->createToken( "loginToken" )->plainTextToken;
            $success[ "name" ] = $authUser->name;
 
            return response( $success);
 
        }else {
 
            return response( "Hiba! A bejelentkezés sikertelen", [ "error" => "Hibás adatok" ]);
        }
    }
    public function logout( Request $request ) {        
        auth( "sanctum" )->user()->currentAccessToken()->delete();
        return response()->json('Kijelentkezve');
    }    
}
