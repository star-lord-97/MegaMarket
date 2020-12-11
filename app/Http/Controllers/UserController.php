<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return User::with(['orders'])->latest()->paginate(10);
    }

    public function show(Request $request)
    {
        return auth()->guard('api')->user();
    }

    public function update(Request $request, User $user)
    {
        $attributes = $request->validate([
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($user)],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $attributes['password'] = Hash::make($attributes['password']);

        $user->update($attributes);
    }

    public function destroy(User $user)
    {
        $user->delete();
    }
}
