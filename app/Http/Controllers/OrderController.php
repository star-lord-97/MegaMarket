<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['product'])->paginate(10);
    }

    public function show(Order $order)
    {
        return $order;
    }

    public function store(Request $request)
    {
        Order::create([
            'product_id' => $request->product_id,
            'user_id' => auth('api')->user()->id,
            'quantity' => $request->quantity,
            'address' => $request->address
        ]);
    }

    public function update(Request $request, Order $order)
    {
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
