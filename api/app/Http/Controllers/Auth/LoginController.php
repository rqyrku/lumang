<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class LoginController extends Controller
{

    /**
     * Authenticate user with credentials.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function login(Request $request, JWTAuth $JWTAuth)
    {
      
      $this->validate($request, [
          'email'    => 'required|email',
          'password' => 'required|min:8',
      ]);

      $credentials = $request->only(['email', 'password']);

      try {
          // verify the credentials and create a token for the user
          if (! $token = $JWTAuth->attempt($credentials)) {
              return response()->json(['error' => 'Invalid credentials'], 401);
          }
      } catch (\JWTException $e) {
          return response()->json(['error' => 'Could not create token'], 500);
      }


        $user = $JWTAuth->setToken($token)->toUser();

        return response()->json(['data' => compact('user', 'token')]);
    }

    /**
     * Authenticate a user using JWT token.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Tymon\JWTAuth\Exceptions\JWTException
     */
    public function verify(JWTAuth $JWTAuth)
    {
        if (!$user = $JWTAuth->parseToken()->authenticate()) {
            return response()->json(['error' => 'User Not Found'], 404);
        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }
}
