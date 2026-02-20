<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class StaffController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('staff/index', [
            'members' => User::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('staff/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:Admin,Manager,Chef,Receptionist,Staff',
        ]);

        User::create($validated);

        return redirect()->route('staff.index');
    }

    public function edit(User $staff): Response
    {
        return Inertia::render('staff/edit', [
            'member' => $staff,
        ]);
    }

    public function update(Request $request, User $staff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $staff->id,
            'role' => 'required|string|in:Admin,Manager,Chef,Receptionist,Staff',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $staff->update($validated);

        return redirect()->route('staff.index');
    }

    public function destroy(User $staff)
    {
        // Don't allow self-deletion
        if ($staff->id === auth()->id()) {
            return back()->withErrors(['error' => 'You cannot delete yourself.']);
        }

        $staff->delete();
        return redirect()->route('staff.index');
    }
}
