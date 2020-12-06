<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['product'])->latest()->paginate(10);
    }

    public function show(Order $order)
    {
        $order->product;
        return $order;
    }

    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required'
        ]);

        Order::create([
            'product_id' => $request->product_id,
            'user_id' => auth('api')->user()->id,
            'quantity' => $request->quantity,
            'address' => $request->address
        ]);

        $product = Product::find($request->product_id);
        $remainingUnits = $product->units - $request->quantity;
        $product->update([
            'units' => $remainingUnits
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $product = Product::find($order->product_id);
        $remainingUnits = ($order->quantity <= $request->quantity) ? ($product->units - ($request->quantity - $order->quantity)) : ($product->units + ($order->quantity - $request->quantity));
        $product->update([
            'units' => $remainingUnits
        ]);

        $order->update([
            'quantity' => $request->quantity,
            'address' => $request->address
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
    }
}
