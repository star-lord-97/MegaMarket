<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show(Request $request)
    {
        return Cart::where('user_id', $request->user()->id)->with('product')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'size' => 'required',
        ]);

        Cart::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user()->id,
            'quantity' => $request->quantity,
            'size' => $request->size
        ]);
    }

    public function destroy(Cart $cart)
    {
        $cart->delete();
    }
}
