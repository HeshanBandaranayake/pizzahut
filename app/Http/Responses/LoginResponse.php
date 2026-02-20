<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $role = auth()->user()->role;

        if ($role === 'Customer') {
            return redirect('/');
        }

        return redirect()->intended(config('fortify.home'));
    }
}
