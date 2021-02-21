<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function show(Request $request)
    {
        return Wishlist::where('user_id', $request->user()->id)->with('product')->get();
    }

    public function store(Request $request)
    {
        Wishlist::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user()->id,
        ]);
    }

    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();
    }
}
