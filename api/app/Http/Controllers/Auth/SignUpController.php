<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SignUpController extends Controller
{
    public function signUp(Request $request, JWTAuth $JWTAuth)
    {
        $this->validate($request, [
            'name'       => 'required|min:3',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8',
          ]);

        $user = new User;
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = $request->password;
        $user->save();

        $token = $JWTAuth->fromUser($user);

        return response()->json(['data' => compact('user', 'token')]);
    }
}
