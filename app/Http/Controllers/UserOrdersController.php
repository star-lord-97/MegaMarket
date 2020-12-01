<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserOrdersController extends Controller
{
    public function __invoke(User $user)
    {
        return $user->orders()->with(['product'])->paginate(10);
    }
}
