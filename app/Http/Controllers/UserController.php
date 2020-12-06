<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
}
