<?php
namespace App\Http\Controllers\Auth;

use Mail;
use App\Models\User;
use App\Models\PasswordReset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PasswordResetController extends Controller
{

  /**
   * Send reset password email to user.
   *
   * @param Request $request
   * @return \Symfony\Component\HttpFoundation\Response
   */
    public function sendResetLinkEmail(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|exists:users,email',
        ]);
        //invalidate old tokens
        PasswordReset::whereEmail($request->email)->delete();
        $email = $request->email;
        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);

        $token = $reset->token;

        Mail::send('auth.reset_link', compact('email', 'token'), function ($mail) use ($email) {
            $mail->to($email)
            ->from('noreply@example.com')
            ->subject('Password reset link');
        });
        return response()->success(true);
    }

    /**
     * Verify the users token and email.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function verify(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
        ]);
        $check = PasswordReset::whereEmail($request->email)
        ->whereToken($request->token)
        ->first();
        if (! $check) {
            return response()->error('Email does not exist', 422);
        }
        return response()->success(true);
    }

    /**
     * Reset users password.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function reset(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'token'    => "required|exists:password_resets,token,email,{$request->email}",
            'password' => 'required|min:8|confirmed',
        ]);
        $user = User::whereEmail($request->email)->firstOrFail();
        $user->password = $request->password;
        $user->save();
        //delete pending resets
        PasswordReset::whereEmail($request->email)->delete();

        return response()->success(true);
    }
}
