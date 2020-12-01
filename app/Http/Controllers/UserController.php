<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return User::with(['orders'])->paginate(10);
    }

    public function show(User $user)
    {
        return $user;
    }
}
