<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $userRole = strtolower($request->user()?->role ?? '');
        $allowedRoles = array_map('strtolower', $roles);

        if (!$request->user() || !in_array($userRole, $allowedRoles)) {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access.');
        }

        return $next($request);
    }
}
